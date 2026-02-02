import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, email, password, role, bio, accountType, teamName, teamMembers } = body

        console.log("🔵 [REGISTER] Starting registration for:", email, "Role:", role)

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return NextResponse.json(
                { success: false, error: "Пользователь с таким email уже существует" },
                { status: 400 }
            )
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create user with profile based on role
        const user = await prisma.user.create({
            data: {
                name,
                email,
                role: role as "student" | "mentor" | "business",
                accounts: {
                    create: {
                        accountId: email,
                        providerId: "credential",
                        password: hashedPassword,
                    },
                },
                ...(role === "student" && {
                    studentProfile: {
                        create: {
                            type: accountType || "individual",
                            bio: bio || "",
                            teamName: teamName || null,
                            teamMembers: teamMembers || null,
                        },
                    },
                }),
                ...(role === "mentor" && {
                    mentorProfile: {
                        create: {},
                    },
                }),
                ...(role === "business" && {
                    businessProfile: {
                        create: {
                            type: accountType || "individual",
                            companyName: name,
                        },
                    },
                }),
            },
        })

        console.log("✅ [REGISTER] User created:", user.id)

        // Set cookies for middleware
        const response = NextResponse.json({
            success: true,
            redirectUrl: `/${role}`,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        })

        response.cookies.set("user_role", role, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 7 days
        })

        response.cookies.set("user_id", user.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
        })

        console.log("✅ [REGISTER] Cookies set. Role:", role)
        console.log("✅ [REGISTER] Redirect URL:", `/${role}`)

        return response
    } catch (error) {
        console.error("❌ [REGISTER] Error:", error)
        return NextResponse.json(
            { success: false, error: "Ошибка при регистрации" },
            { status: 500 }
        )
    }
}
