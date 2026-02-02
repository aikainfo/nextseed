"use client"

import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { FolderKanban, Trophy, TrendingUp, User } from "lucide-react"

/**
 * Business Dashboard Layout
 * Isolated from student and mentor dashboards
 */
export default function BusinessLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // TODO: Get actual user from session
    const user = {
        name: "Нурлан Сагындыков",
        email: "business@nextseed.dev",
        role: "business",
    }

    const navigation = [
        {
            name: "Проекты",
            href: "/business/projects",
            icon: <FolderKanban className="h-5 w-5" />,
        },
        {
            name: "Конкурсы",
            href: "/business/competitions",
            icon: <Trophy className="h-5 w-5" />,
        },
        {
            name: "Инвестиции",
            href: "/business/investments",
            icon: <TrendingUp className="h-5 w-5" />,
        },
        {
            name: "Профиль",
            href: "/business/profile",
            icon: <User className="h-5 w-5" />,
        },
    ]

    return (
        <DashboardLayout navigation={navigation} user={user}>
            {children}
        </DashboardLayout>
    )
}
