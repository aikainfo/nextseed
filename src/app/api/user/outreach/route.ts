import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

function buildTemplateEmail(id: string) {
    return `template-${id}@nextseed.local`
}

export async function POST(req: Request) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        })

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await req.json()
        const { receiverId, type, projectId, message, phone, email, expert } = body

        if (!receiverId || !message) {
            return NextResponse.json({ error: "Укажите получателя и сообщение" }, { status: 400 })
        }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            include: { studentProfile: true },
        })

        if (!user?.studentProfile) {
            return NextResponse.json({ error: "Student profile not found" }, { status: 404 })
        }

        let receiver = await prisma.user.findUnique({ where: { id: receiverId } })

        if (!receiver) {
            const receiverRole = type === "mentor" ? "mentor" : "business"
            receiver = await prisma.user.create({
                data: {
                    id: receiverId,
                    name: expert?.name || "Expert",
                    email: buildTemplateEmail(receiverId),
                    role: receiverRole,
                    ...(receiverRole === "mentor" && {
                        mentorProfile: {
                            create: {
                                hasTeams: false,
                                bio: expert?.bio || null,
                                expertise: expert?.focus || null,
                            },
                        },
                    }),
                    ...(receiverRole === "business" && {
                        businessProfile: {
                            create: {
                                type: "individual",
                                companyName: expert?.company || null,
                                bio: expert?.bio || null,
                                interests: expert?.focus || null,
                            },
                        },
                    }),
                },
            })
        }

        const fullMessage = [
            message,
            "",
            "Контакты:",
            `Email: ${email || "-"}`,
            `Телефон: ${phone || "-"}`,
        ].join("\n")

        const outreach = await prisma.outreachRequest.create({
            data: {
                senderId: user.studentProfile.id,
                receiverId: receiver.id,
                projectId: projectId || null,
                message: fullMessage,
                status: "sent",
                type: type || "mentor",
            },
        })

        return NextResponse.json({ outreach })
    } catch (error: any) {
        console.error("Outreach error:", error)
        return NextResponse.json({ error: error?.message || "Server error" }, { status: 500 })
    }
}
