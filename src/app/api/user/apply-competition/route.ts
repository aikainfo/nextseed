import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

const SYSTEM_MENTOR_EMAIL = "system-mentor@nextseed.local"

async function ensureSystemMentorProfile() {
    const existing = await prisma.user.findUnique({
        where: { email: SYSTEM_MENTOR_EMAIL },
        include: { mentorProfile: true },
    })

    if (existing?.mentorProfile) return existing.mentorProfile

    const created = await prisma.user.create({
        data: {
            name: "NextSeed Mentors",
            email: SYSTEM_MENTOR_EMAIL,
            role: "mentor",
            mentorProfile: {
                create: {
                    hasTeams: false,
                    bio: "System profile for template competitions",
                },
            },
        },
        include: { mentorProfile: true },
    })

    return created.mentorProfile!
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
        const {
            competitionId,
            competition,
            projectId,
            phone,
            email,
            name,
            category,
            githubUrl,
            docsUrl,
            subject,
        } = body

        if (!phone || !email) {
            return NextResponse.json({ error: "Укажите телефон и email" }, { status: 400 })
        }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            include: { studentProfile: true },
        })

        if (!user?.studentProfile) {
            return NextResponse.json({ error: "Student profile not found" }, { status: 404 })
        }

        let competitionRecord = null
        if (competitionId) {
            competitionRecord = await prisma.competition.findUnique({
                where: { id: competitionId },
            })

            if (!competitionRecord && competition) {
                const mentorProfile = await ensureSystemMentorProfile()
                competitionRecord = await prisma.competition.create({
                    data: {
                        id: competitionId,
                        title: competition.title || `Competition ${competitionId}`,
                        description: competition.description || "",
                        rules: competition.rules || null,
                        awards: competition.awards || null,
                        deadline: competition.deadline ? new Date(competition.deadline) : new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
                        registrationEnd: competition.registrationEnd ? new Date(competition.registrationEnd) : null,
                        eventDate: competition.eventDate ? new Date(competition.eventDate) : null,
                        type: competition.type || "startup",
                        files: competition.files || null,
                        creatorId: mentorProfile.id,
                    },
                })
            }
        }

        const application = await prisma.application.create({
            data: {
                projectId: projectId || null,
                competitionId: competitionRecord?.id || competitionId || null,
                type: competition?.type || competitionRecord?.type || "startup",
                category: category || null,
                phone,
                email,
                name: name || null,
                githubUrl: githubUrl || null,
                docsUrl: docsUrl || null,
                subject: subject || null,
                studentId: user.studentProfile.id,
            },
        })

        return NextResponse.json({ application })
    } catch (error: any) {
        console.error("Apply competition error:", error)
        return NextResponse.json({ error: error?.message || "Server error" }, { status: 500 })
    }
}
