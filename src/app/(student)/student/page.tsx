"use client"

import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FolderKanban, Trophy, Users, TrendingUp, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

/**
 * Student Dashboard Home
 * Overview and quick actions
 */
export default function StudentDashboardPage() {
    // Mock data
    const stats = {
        projects: 3,
        competitions: 2,
        activeApplications: 1,
    }

    const recentProjects = [
        {
            id: "1",
            title: "EduAI - Персональный помощник для учебы",
            status: "В разработке",
            progress: 65,
        },
        {
            id: "2",
            title: "GreenPath - Экологический трекер",
            status: "Завершен",
            progress: 100,
        },
    ]

    const upcomingDeadlines = [
        {
            id: "1",
            title: "FIRST Robotics Kazakhstan",
            date: "2026-06-15",
            daysLeft: 137,
        },
        {
            id: "2",
            title: "Technovation Girls",
            date: "2026-05-20",
            daysLeft: 111,
        },
    ]

    return (
        <div className="space-y-8">
            {/* Welcome */}
            <div>
                <h1 className="text-3xl font-bold text-surface-900">Добро пожаловать!</h1>
                <p className="mt-2 text-surface-600">
                    Вот обзор вашей активности на платформе
                </p>
            </div>

            {/* Stats */}
            <div className="grid gap-6 md:grid-cols-3">
                <Card variant="bento" className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-brand-100 flex items-center justify-center">
                            <FolderKanban className="h-6 w-6 text-brand-600" />
                        </div>
                        <div>
                            <p className="text-sm text-surface-600">Мои проекты</p>
                            <p className="text-3xl font-bold text-surface-900">{stats.projects}</p>
                        </div>
                    </div>
                </Card>

                <Card variant="bento" className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center">
                            <Trophy className="h-6 w-6 text-amber-600" />
                        </div>
                        <div>
                            <p className="text-sm text-surface-600">Конкурсы</p>
                            <p className="text-3xl font-bold text-surface-900">{stats.competitions}</p>
                        </div>
                    </div>
                </Card>

                <Card variant="bento" className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-surface-600">Активные заявки</p>
                            <p className="text-3xl font-bold text-surface-900">{stats.activeApplications}</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Recent Projects */}
                <Card variant="bento">
                    <CardContent>
                        <div className="flex items-center justify-between mb-6">
                            <CardTitle>Недавние проекты</CardTitle>
                            <Link href="/student/projects">
                                <Button variant="ghost" size="sm">Все проекты</Button>
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {recentProjects.map((project) => (
                                <div key={project.id} className="p-4 bg-surface-50 rounded-xl">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-semibold text-surface-900">{project.title}</h3>
                                        <span className="text-xs text-surface-600">{project.status}</span>
                                    </div>
                                    <div className="w-full bg-surface-200 rounded-full h-2">
                                        <div
                                            className="bg-brand-500 h-2 rounded-full transition-all"
                                            style={{ width: `${project.progress}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-surface-600 mt-1">{project.progress}% завершено</p>
                                </div>
                            ))}
                        </div>

                        <Link href="/student/projects/create">
                            <Button className="w-full mt-4">Создать новый проект</Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* Upcoming Deadlines */}
                <Card variant="bento">
                    <CardContent>
                        <div className="flex items-center justify-between mb-6">
                            <CardTitle>Ближайшие дедлайны</CardTitle>
                            <Link href="/student/competitions">
                                <Button variant="ghost" size="sm">Все конкурсы</Button>
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {upcomingDeadlines.map((deadline) => (
                                <div key={deadline.id} className="p-4 bg-surface-50 rounded-xl">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-semibold text-surface-900">{deadline.title}</h3>
                                        <div className="flex items-center gap-1 text-amber-600">
                                            <Clock className="h-4 w-4" />
                                            <span className="text-xs font-semibold">{deadline.daysLeft} дней</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-surface-600">
                                        Дедлайн: {new Date(deadline.date).toLocaleDateString('ru-RU')}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <Link href="/student/competitions">
                            <Button variant="outline" className="w-full mt-4">Найти конкурсы</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Links */}
            <div className="grid gap-4 md:grid-cols-3">
                <Link href="/student/outreach">
                    <Card hover variant="bento" className="p-6 cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-brand-100 flex items-center justify-center">
                                <Users className="h-5 w-5 text-brand-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-surface-900">Менторы и инвесторы</h3>
                                <p className="text-sm text-surface-600">Найдите поддержку</p>
                            </div>
                        </div>
                    </Card>
                </Link>

                <Link href="/student/profile">
                    <Card hover variant="bento" className="p-6 cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-brand-100 flex items-center justify-center">
                                <TrendingUp className="h-5 w-5 text-brand-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-surface-900">Профиль</h3>
                                <p className="text-sm text-surface-600">Обновите информацию</p>
                            </div>
                        </div>
                    </Card>
                </Link>

                <Link href="/student/settings">
                    <Card hover variant="bento" className="p-6 cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-surface-100 flex items-center justify-center">
                                <CheckCircle className="h-5 w-5 text-surface-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-surface-900">Настройки</h3>
                                <p className="text-sm text-surface-600">Управление аккаунтом</p>
                            </div>
                        </div>
                    </Card>
                </Link>
            </div>
        </div>
    )
}
