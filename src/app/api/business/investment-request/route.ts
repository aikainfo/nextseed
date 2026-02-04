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
            include: { businessProfile: true },
        })

        if (!user || user.role !== "business" || !user.businessProfile) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }

        const { projectId, email, phone, amount, message } = await req.json()
        if (!projectId || !email || !phone) {
            return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
        }

        const contactMessage = `Контакт: ${email}, ${phone}${message ? ` | Сообщение: ${message}` : ""}`

        const investment = await prisma.investment.create({
            data: {
                projectId,
                investorId: user.businessProfile.id,
                amount: typeof amount === "number" ? amount : null,
                status: "interested",
                message: contactMessage,
            },
        })

        return NextResponse.json({ investment })
    } catch (error) {
        console.error("Investment request error:", error)
        return NextResponse.json({ error: "Server error" }, { status: 500 })
    }
}
