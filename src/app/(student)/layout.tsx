import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { LayoutDashboard, FolderKanban, Trophy, Users } from "lucide-react"

export default function StudentLayout({ children }: { children: React.ReactNode }) {
    const navigation = [
        { name: "Главная", href: "/student", icon: <LayoutDashboard className="h-5 w-5" /> },
        { name: "Проекты", href: "/student/projects", icon: <FolderKanban className="h-5 w-5" /> },
        { name: "Конкурсы", href: "/student/competitions", icon: <Trophy className="h-5 w-5" /> },
        { name: "Связи", href: "/student/outreach", icon: <Users className="h-5 w-5" /> },
    ]

    // TODO: Replace with actual user data from session
    const user = {
        name: "Студент",
        email: "student@example.com",
        role: "student",
    }

    return (
        <DashboardLayout navigation={navigation} user={user}>
            {children}
        </DashboardLayout>
    )
}
