import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function POST(req: Request) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        })
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { role: true },
        })

        if (!user || user.role !== "business") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }

        const data = await req.json()
        const { name, accountType, companyName, interests, bio } = data

        const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data: {
                name,
                businessProfile: {
                    upsert: {
                        create: {
                            type: accountType === "organization" ? "organization" : "individual",
                            companyName: accountType === "organization" ? companyName || null : companyName || name,
                            interests: interests || null,
                            bio: bio || null,
                        },
                        update: {
                            type: accountType === "organization" ? "organization" : "individual",
                            companyName: accountType === "organization" ? companyName || null : companyName || name,
                            interests: interests || null,
                            bio: bio || null,
                        },
                    },
                },
            },
            include: {
                businessProfile: true,
            },
        })

        return NextResponse.json({ user: updatedUser })
    } catch (error) {
        console.error("Update business profile error:", error)
        return NextResponse.json({ error: "Server error" }, { status: 500 })
    }
}
