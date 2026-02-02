"use client"

import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, FolderKanban, Trophy, DollarSign, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"

/**
 * Business Dashboard Home
 * Overview and investment tracking
 */
export default function BusinessDashboardPage() {
    const stats = {
        totalInvestments: 750000,
        activeInvestments: 2,
        projectsReviewed: 15,
        competitionsCreated: 1,
    }

    const recentInvestments = [
        {
            id: "1",
            project: "EduAI - Персональный помощник",
            amount: 500000,
            status: "committed",
            date: "2026-01-15",
        },
        {
            id: "2",
            project: "GreenPath - Экологический трекер",
            amount: 250000,
            status: "pending",
            date: "2026-01-20",
        },
    ]

    const topProjects = [
        {
            id: "1",
            title: "SmartLearn - AI платформа",
            owner: "Асель Жумабаева",
            stage: "MVP",
            potential: "Высокий",
        },
        {
            id: "2",
            title: "HealthTrack - Медицинский ассистент",
            owner: "Команда MedTech",
            stage: "Прототип",
            potential: "Средний",
        },
    ]

    return (
        <div className="space-y-8">
            {/* Welcome */}
            <div>
                <h1 className="text-3xl font-bold text-surface-900">Панель инвестора</h1>
                <p className="mt-2 text-surface-600">
                    Находите перспективные проекты и развивайте стартапы
                </p>
            </div>

            {/* Stats */}
            <div className="grid gap-6 md:grid-cols-4">
                <Card variant="bento" className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-brand-100 flex items-center justify-center">
                            <DollarSign className="h-6 w-6 text-brand-600" />
                        </div>
                        <div>
                            <p className="text-sm text-surface-600">Инвестиции</p>
                            <p className="text-2xl font-bold text-surface-900">
                                {(stats.totalInvestments / 1000).toFixed(0)}K ₸
                            </p>
                        </div>
                    </div>
                </Card>

                <Card variant="bento" className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-surface-600">Активные</p>
                            <p className="text-3xl font-bold text-surface-900">{stats.activeInvestments}</p>
                        </div>
                    </div>
                </Card>

                <Card variant="bento" className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center">
                            <FolderKanban className="h-6 w-6 text-amber-600" />
                        </div>
                        <div>
                            <p className="text-sm text-surface-600">Проверено</p>
                            <p className="text-3xl font-bold text-surface-900">{stats.projectsReviewed}</p>
                        </div>
                    </div>
                </Card>

                <Card variant="bento" className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center">
                            <Trophy className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-surface-600">Конкурсы</p>
                            <p className="text-3xl font-bold text-surface-900">{stats.competitionsCreated}</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Recent Investments */}
                <Card variant="bento">
                    <CardContent>
                        <div className="flex items-center justify-between mb-6">
                            <CardTitle>Недавние инвестиции</CardTitle>
                            <Link href="/business/investments">
                                <Button variant="ghost" size="sm">Все инвестиции</Button>
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {recentInvestments.map((investment) => (
                                <div key={investment.id} className="p-4 bg-surface-50 rounded-xl">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="font-semibold text-surface-900">{investment.project}</h3>
                                            <p className="text-lg font-bold text-brand-600">
                                                {(investment.amount / 1000).toFixed(0)}K ₸
                                            </p>
                                        </div>
                                        <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${investment.status === "committed"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-amber-100 text-amber-700"
                                            }`}>
                                            {investment.status === "committed" ? (
                                                <>
                                                    <CheckCircle className="h-3 w-3" />
                                                    Подтверждено
                                                </>
                                            ) : (
                                                <>
                                                    <Clock className="h-3 w-3" />
                                                    Ожидание
                                                </>
                                            )}
                                        </span>
                                    </div>
                                    <p className="text-xs text-surface-600">
                                        {new Date(investment.date).toLocaleDateString('ru-RU')}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <Link href="/business/investments">
                            <Button className="w-full mt-4">Управление инвестициями</Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* Top Projects */}
                <Card variant="bento">
                    <CardContent>
                        <div className="flex items-center justify-between mb-6">
                            <CardTitle>Перспективные проекты</CardTitle>
                            <Link href="/business/projects">
                                <Button variant="ghost" size="sm">Все проекты</Button>
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {topProjects.map((project) => (
                                <div key={project.id} className="p-4 bg-surface-50 rounded-xl">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="font-semibold text-surface-900">{project.title}</h3>
                                            <p className="text-sm text-surface-600">{project.owner}</p>
                                        </div>
                                        <span className={`text-xs font-semibold ${project.potential === "Высокий"
                                                ? "text-green-600"
                                                : "text-amber-600"
                                            }`}>
                                            {project.potential}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs bg-brand-100 text-brand-700 px-2 py-1 rounded-full">
                                            {project.stage}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Link href="/business/projects">
                            <Button variant="outline" className="w-full mt-4">Найти проекты</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Links */}
            <div className="grid gap-4 md:grid-cols-3">
                <Link href="/business/projects">
                    <Card hover variant="bento" className="p-6 cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-brand-100 flex items-center justify-center">
                                <FolderKanban className="h-5 w-5 text-brand-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-surface-900">Проекты</h3>
                                <p className="text-sm text-surface-600">Найдите стартапы</p>
                            </div>
                        </div>
                    </Card>
                </Link>

                <Link href="/business/investments">
                    <Card hover variant="bento" className="p-6 cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-green-100 flex items-center justify-center">
                                <TrendingUp className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-surface-900">Инвестиции</h3>
                                <p className="text-sm text-surface-600">Управляйте портфелем</p>
                            </div>
                        </div>
                    </Card>
                </Link>

                <Link href="/business/projects">
                    <Card hover variant="bento" className="p-6 cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center">
                                <Trophy className="h-5 w-5 text-amber-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-surface-900">Конкурсы</h3>
                                <p className="text-sm text-surface-600">Создайте мероприятие</p>
                            </div>
                        </div>
                    </Card>
                </Link>
            </div>
        </div>
    )
}
