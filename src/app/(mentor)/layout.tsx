"use client"

import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { FolderKanban, Trophy, Users, User } from "lucide-react"

/**
 * Mentor Dashboard Layout
 * Isolated from student and business dashboards
 */
export default function MentorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // TODO: Get actual user from session
    const user = {
        name: "Асхат Жумабаев",
        email: "mentor@nextseed.dev",
        role: "mentor",
    }

    const navigation = [
        {
            name: "Проекты",
            href: "/mentor/projects",
            icon: <FolderKanban className="h-5 w-5" />,
        },
        {
            name: "Конкурсы",
            href: "/mentor/competitions",
            icon: <Trophy className="h-5 w-5" />,
        },
        {
            name: "Команды",
            href: "/mentor/teams",
            icon: <Users className="h-5 w-5" />,
        },
        {
            name: "Профиль",
            href: "/mentor/profile",
            icon: <User className="h-5 w-5" />,
        },
    ]

    return (
        <DashboardLayout navigation={navigation} user={user}>
            {children}
        </DashboardLayout>
    )
}
