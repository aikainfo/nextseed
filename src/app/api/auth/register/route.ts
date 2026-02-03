import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

const applyAuthCookies = (response: NextResponse, authHeaders?: Headers) => {
    if (!authHeaders) return

    // getSetCookie is available in Node/Next.js Headers
    // @ts-expect-error - runtime provides getSetCookie
    const getSetCookie = typeof authHeaders.getSetCookie === "function" ? authHeaders.getSetCookie.bind(authHeaders) : null
    const setCookies = getSetCookie
        ? getSetCookie()
        : authHeaders.get("set-cookie")
            ? [authHeaders.get("set-cookie") as string]
            : []

    setCookies.forEach((cookie) => {
        if (cookie) response.headers.append("set-cookie", cookie)
    })
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const {
            name,
            email,
            password,
            role,
            accountType,
            hasMentor,
            mentorName,
            mentorEmail,
            bio,
            teamName,
            teamMembers,
            competitions,
            participatedWhere,
            expertise,
            companyName,
            interests,
        } = body

        const allowedRoles = ["student", "mentor", "business"]

        if (!name || !email || !password || !role) {
            return NextResponse.json({ success: false, error: "Заполните имя, email, пароль и роль" }, { status: 400 })
        }
        if (!allowedRoles.includes(role)) {
            return NextResponse.json({ success: false, error: "Некорректная роль" }, { status: 400 })
        }

        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (existingUser) {
            return NextResponse.json({ success: false, error: "Пользователь с таким email уже существует" }, { status: 400 })
        }

        const { response: signUpResult, headers: authHeaders } = await auth.api.signUpEmail({
            headers: await headers(),
            body: {
                name,
                email,
                password,
                role,
            },
            returnHeaders: true,
        } as any)

        const createdUser = signUpResult?.user
        if (!createdUser?.id) {
            return NextResponse.json({ success: false, error: "Не удалось создать пользователя" }, { status: 500 })
        }

        await prisma.user.update({
            where: { id: createdUser.id },
            data: { role },
        })

        if (role === "student") {
            await prisma.studentProfile.create({
                data: {
                    userId: createdUser.id,
                    type: accountType === "team" ? "team" : "individual",
                    bio: bio || "",
                    mentorName: hasMentor === "yes" ? mentorName : null,
                    mentorEmail: hasMentor === "yes" ? mentorEmail : null,
                    teamName: accountType === "team" ? teamName : null,
                    teamMembers: accountType === "team" ? teamMembers : null,
                    participatedWhere: participatedWhere || competitions || null,
                },
            })
        }

        if (role === "mentor") {
            await prisma.mentorProfile.create({
                data: {
                    userId: createdUser.id,
                    bio: bio || null,
                    expertise: expertise || null,
                    hasTeams: !!teamName,
                    managedTeams: teamName || null,
                },
            })
        }

        if (role === "business") {
            await prisma.businessProfile.create({
                data: {
                    userId: createdUser.id,
                    type: accountType === "team" ? "organization" : "individual",
                    companyName: accountType === "team" ? companyName || null : companyName || name,
                    bio: bio || null,
                    interests: interests || null,
                },
            })
        }

        const response = NextResponse.json({
            success: true,
            redirectUrl: `/${role}`,
            user: {
                id: createdUser.id,
                name: createdUser.name,
                email: createdUser.email,
                role,
            },
        })

        response.cookies.set("user_role", role, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
        })

        response.cookies.set("user_id", createdUser.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
        })

        applyAuthCookies(response, authHeaders)

        return response
    } catch (error: any) {
        console.error("❌ [REGISTER] Error:", error)
        return NextResponse.json(
            { success: false, error: error?.message || "Ошибка при регистрации" },
            { status: error?.statusCode || 500 }
        )
    }
}
