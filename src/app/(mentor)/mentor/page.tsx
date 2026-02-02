"use client"

import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FolderKanban, Trophy, Users, TrendingUp, Star, MessageSquare } from "lucide-react"
import Link from "next/link"

/**
 * Mentor Dashboard Home
 * Overview and quick actions
 */
export default function MentorDashboardPage() {
    const stats = {
        projectsReviewed: 12,
        activeTeams: 3,
        competitionsCreated: 2,
        averageRating: 4.8,
    }

    const recentReviews = [
        {
            id: "1",
            project: "EduAI - Персональный помощник",
            student: "Алия Нурланова",
            rating: 5,
            date: "2026-01-25",
        },
        {
            id: "2",
            project: "GreenPath - Экологический трекер",
            student: "Команда InnoTech",
            rating: 4,
            date: "2026-01-20",
        },
    ]

    const pendingReviews = [
        {
            id: "1",
            project: "SmartLearn - AI платформа",
            student: "Асель Жумабаева",
            submitted: "2026-01-28",
        },
    ]

    return (
        <div className="space-y-8">
            {/* Welcome */}
            <div>
                <h1 className="text-3xl font-bold text-surface-900">Панель ментора</h1>
                <p className="mt-2 text-surface-600">
                    Помогайте командам расти и развиваться
                </p>
            </div>

            {/* Stats */}
            <div className="grid gap-6 md:grid-cols-4">
                <Card variant="bento" className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-brand-100 flex items-center justify-center">
                            <FolderKanban className="h-6 w-6 text-brand-600" />
                        </div>
                        <div>
                            <p className="text-sm text-surface-600">Проверено</p>
                            <p className="text-3xl font-bold text-surface-900">{stats.projectsReviewed}</p>
                        </div>
                    </div>
                </Card>

                <Card variant="bento" className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
                            <Users className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-surface-600">Команды</p>
                            <p className="text-3xl font-bold text-surface-900">{stats.activeTeams}</p>
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
                            <p className="text-3xl font-bold text-surface-900">{stats.competitionsCreated}</p>
                        </div>
                    </div>
                </Card>

                <Card variant="bento" className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                            <Star className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-sm text-surface-600">Рейтинг</p>
                            <p className="text-3xl font-bold text-surface-900">{stats.averageRating}</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Pending Reviews */}
                <Card variant="bento">
                    <CardContent>
                        <div className="flex items-center justify-between mb-6">
                            <CardTitle>Ожидают проверки</CardTitle>
                            <Link href="/mentor/projects">
                                <Button variant="ghost" size="sm">Все проекты</Button>
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {pendingReviews.map((review) => (
                                <div key={review.id} className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="font-semibold text-surface-900">{review.project}</h3>
                                            <p className="text-sm text-surface-600">{review.student}</p>
                                        </div>
                                        <span className="text-xs text-amber-600 font-semibold">Новое</span>
                                    </div>
                                    <p className="text-xs text-surface-600">
                                        Отправлено: {new Date(review.submitted).toLocaleDateString('ru-RU')}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <Link href="/mentor/projects">
                            <Button className="w-full mt-4">Проверить проекты</Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* Recent Reviews */}
                <Card variant="bento">
                    <CardContent>
                        <div className="flex items-center justify-between mb-6">
                            <CardTitle>Недавние отзывы</CardTitle>
                            <Link href="/mentor/projects">
                                <Button variant="ghost" size="sm">История</Button>
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {recentReviews.map((review) => (
                                <div key={review.id} className="p-4 bg-surface-50 rounded-xl">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="font-semibold text-surface-900">{review.project}</h3>
                                            <p className="text-sm text-surface-600">{review.student}</p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <span className="font-semibold text-surface-900">{review.rating}</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-surface-600">
                                        {new Date(review.date).toLocaleDateString('ru-RU')}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Links */}
            <div className="grid gap-4 md:grid-cols-3">
                <Link href="/mentor/competitions/create">
                    <Card hover variant="bento" className="p-6 cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-brand-100 flex items-center justify-center">
                                <Trophy className="h-5 w-5 text-brand-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-surface-900">Создать конкурс</h3>
                                <p className="text-sm text-surface-600">Организуйте мероприятие</p>
                            </div>
                        </div>
                    </Card>
                </Link>

                <Link href="/mentor/teams">
                    <Card hover variant="bento" className="p-6 cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-green-100 flex items-center justify-center">
                                <Users className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-surface-900">Найти команду</h3>
                                <p className="text-sm text-surface-600">Помогите стартапу</p>
                            </div>
                        </div>
                    </Card>
                </Link>

                <Link href="/mentor/projects">
                    <Card hover variant="bento" className="p-6 cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center">
                                <MessageSquare className="h-5 w-5 text-amber-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-surface-900">Оставить фидбек</h3>
                                <p className="text-sm text-surface-600">Помогите улучшить проект</p>
                            </div>
                        </div>
                    </Card>
                </Link>
            </div>
        </div>
    )
}
