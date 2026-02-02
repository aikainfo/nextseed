"use client"

import { useState } from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TrendingUp, Mail, Calendar, CheckCircle, Clock, XCircle } from "lucide-react"

export default function BusinessInvestmentsPage() {
    const [searchQuery, setSearchQuery] = useState("")

    // Mock data
    const investments = [
        {
            id: "1",
            project: "EduAI - Персональный помощник для учебы",
            owner: "Алия Нурланова",
            amount: 500000,
            status: "committed" as const,
            date: "2026-01-15",
        },
        {
            id: "2",
            project: "GreenPath - Экологический трекер",
            owner: "Команда InnoTech",
            amount: 250000,
            status: "pending" as const,
            date: "2026-01-20",
        },
    ]

    const getStatusBadge = (status: string) => {
        const styles = {
            committed: "bg-green-100 text-green-700",
            pending: "bg-amber-100 text-amber-700",
            rejected: "bg-red-100 text-red-700",
        }
        const icons = {
            committed: <CheckCircle className="h-3 w-3" />,
            pending: <Clock className="h-3 w-3" />,
            rejected: <XCircle className="h-3 w-3" />,
        }
        const labels = {
            committed: "Подтверждено",
            pending: "Ожидание",
            rejected: "Отклонено",
        }

        return (
            <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${styles[status as keyof typeof styles]}`}>
                {icons[status as keyof typeof icons]}
                {labels[status as keyof typeof labels]}
            </span>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-surface-900">Инвестиции</h1>
                <p className="mt-1 text-surface-600">Управляйте своими инвестициями</p>
            </div>

            {/* Stats */}
            <div className="grid gap-6 md:grid-cols-3">
                <Card variant="bento" className="p-6">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl bg-brand-100 flex items-center justify-center">
                            <TrendingUp className="h-6 w-6 text-brand-600" />
                        </div>
                        <div>
                            <p className="text-sm text-surface-600">Всего инвестиций</p>
                            <p className="text-2xl font-bold text-surface-900">750K ₸</p>
                        </div>
                    </div>
                </Card>
                <Card variant="bento" className="p-6">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-surface-600">Подтверждено</p>
                            <p className="text-2xl font-bold text-surface-900">1</p>
                        </div>
                    </div>
                </Card>
                <Card variant="bento" className="p-6">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center">
                            <Clock className="h-6 w-6 text-amber-600" />
                        </div>
                        <div>
                            <p className="text-sm text-surface-600">Ожидание</p>
                            <p className="text-2xl font-bold text-surface-900">1</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Search */}
            <Card variant="bento" className="p-6">
                <Input
                    placeholder="Поиск инвестиций..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Card>

            {/* Investments List */}
            <div className="space-y-4">
                {investments.map((investment) => (
                    <Card key={investment.id} hover variant="bento">
                        <CardContent className="flex items-center justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <CardTitle className="text-lg">{investment.project}</CardTitle>
                                    {getStatusBadge(investment.status)}
                                </div>

                                <div className="flex items-center gap-4 text-sm text-surface-600">
                                    <div className="flex items-center gap-1">
                                        <Mail className="h-4 w-4" />
                                        <span>{investment.owner}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        <span>{new Date(investment.date).toLocaleDateString('ru-RU')}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="text-2xl font-bold text-brand-600">
                                    {(investment.amount / 1000).toFixed(0)}K ₸
                                </p>
                                <Button variant="outline" className="mt-2">
                                    Подробнее
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
