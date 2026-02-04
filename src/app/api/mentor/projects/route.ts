import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function GET() {
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

        if (!user || user.role !== "mentor") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }

        const projects = await prisma.project.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                owner: {
                    include: {
                        user: true,
                    },
                },
                reviews: {
                    include: {
                        author: true,
                    },
                    orderBy: { createdAt: "desc" },
                },
            },
        })

        return NextResponse.json({ projects })
    } catch (error) {
        console.error("Mentor projects error:", error)
        return NextResponse.json({ error: "Server error" }, { status: 500 })
    }
}
