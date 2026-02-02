"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, Users, Briefcase, ArrowLeft } from "lucide-react"

/**
 * Role Selection Page - ЯРКИЙ дизайн!
 */
export default function RoleSelectPage() {
    const router = useRouter()

    const roles = [
        {
            id: "student",
            title: "Ученик / Команда",
            description: "Создавай проекты, участвуй в конкурсах, находи менторов и получай инвестиции",
            icon: GraduationCap,
            gradient: "from-brand-400 to-brand-600",
            shadow: "shadow-brand-500/30 hover:shadow-brand-500/50",
        },
        {
            id: "mentor",
            title: "Ментор",
            description: "Помогай командам расти, оценивай проекты и создавай собственные конкурсы",
            icon: Users,
            gradient: "from-purple-400 to-purple-600",
            shadow: "shadow-purple-500/30 hover:shadow-purple-500/50",
        },
        {
            id: "business",
            title: "Бизнес / Инвестор",
            description: "Находи перспективные проекты, инвестируй и развивай молодые стартапы",
            icon: Briefcase,
            gradient: "from-rose-400 to-rose-600",
            shadow: "shadow-rose-500/30 hover:shadow-rose-500/50",
        },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-brand-50/30 to-sky-50/30 py-12 px-4">
            {/* Back Link */}
            <div className="container mx-auto mb-8">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-surface-600 hover:text-surface-900 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span className="font-medium">На главную</span>
                </Link>
            </div>

            {/* Header */}
            <div className="container mx-auto text-center mb-12">
                <div className="inline-block mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-brand-100 to-sky-100 border border-brand-200">
                    <span className="text-sm font-semibold bg-gradient-to-r from-brand-600 to-brand-700 bg-clip-text text-transparent">
                        Шаг 1 из 4
                    </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-surface-900 mb-4">
                    Выбери свою роль
                </h1>
                <p className="text-lg text-surface-600 max-w-2xl mx-auto">
                    Каждая роль открывает уникальные возможности в экосистеме NextSeed
                </p>
            </div>

            {/* Role Cards */}
            <div className="container mx-auto max-w-5xl">
                <div className="grid gap-8 md:grid-cols-3">
                    {roles.map((role) => (
                        <Card
                            key={role.id}
                            hover
                            variant="bento"
                            className="group cursor-pointer"
                            onClick={() => router.push(`/register?role=${role.id}`)}
                        >
                            <CardContent className="text-center">
                                {/* Icon */}
                                <div className={`mb-6 mx-auto h-24 w-24 rounded-2xl bg-gradient-to-br ${role.gradient} flex items-center justify-center shadow-xl ${role.shadow} transition-all group-hover:scale-110 group-hover:shadow-2xl`}>
                                    <role.icon className="h-12 w-12 text-white" />
                                </div>

                                {/* Title */}
                                <CardTitle className="mb-3 text-2xl">{role.title}</CardTitle>

                                {/* Description */}
                                <p className="text-surface-600 mb-6 leading-relaxed">
                                    {role.description}
                                </p>

                                {/* Button */}
                                <Button className="w-full gap-2">
                                    Начать
                                    <ArrowLeft className="h-4 w-4 rotate-180" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Already have account */}
            <div className="container mx-auto text-center mt-12">
                <p className="text-surface-600">
                    Уже есть аккаунт?{" "}
                    <Link href="/login" className="font-semibold text-brand-600 hover:text-brand-700 underline">
                        Войти
                    </Link>
                </p>
            </div>
        </div>
    )
}
