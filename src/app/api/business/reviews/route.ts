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

        const { projectId, rating, content } = await req.json()
        if (!projectId || !content || typeof rating !== "number") {
            return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
        }
        if (rating < 1 || rating > 5) {
            return NextResponse.json({ error: "Rating must be 1-5" }, { status: 400 })
        }

        const review = await prisma.review.create({
            data: {
                projectId,
                authorId: session.user.id,
                rating,
                content,
            },
            include: {
                author: true,
            },
        })

        return NextResponse.json({ review })
    } catch (error) {
        console.error("Business review error:", error)
        return NextResponse.json({ error: "Server error" }, { status: 500 })
    }
}
