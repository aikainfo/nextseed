"use client"

import { useState } from "react"
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TrendingUp, Mail, Eye } from "lucide-react"

/**
 * Business Projects Page
 * View projects and make investment offers
 */
export default function BusinessProjectsPage() {
    const [searchQuery, setSearchQuery] = useState("")

    // Mock data
    const projects = [
        {
            id: "1",
            title: "EduAI - Персональный помощник для учебы",
            description: "AI-платформа для персонализированного обучения с использованием LLM",
            owner: "Алия Нурланова",
            stage: "MVP",
            investment: 500000,
            seeking: 1000000,
            rating: 4.8,
            category: "EdTech",
        },
        {
            id: "2",
            title: "GreenPath - Экологический трекер",
            description: "Мобильное приложение для отслеживания углеродного следа",
            owner: "Команда InnoTech",
            stage: "Idea",
            investment: 0,
            seeking: 750000,
            rating: 4.2,
            category: "GreenTech",
        },
    ]

    const filteredProjects = projects.filter((project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-surface-900">Проекты</h1>
                <p className="mt-1 text-surface-600">
                    Находите перспективные проекты для инвестиций
                </p>
            </div>

            {/* Search */}
            <Card variant="bento" className="p-6">
                <Input
                    placeholder="Поиск проектов..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Card>

            {/* Projects Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
                {filteredProjects.map((project) => (
                    <Card key={project.id} hover variant="bento">
                        <CardContent>
                            {/* Category Badge */}
                            <div className="mb-4 flex items-center gap-2">
                                <span className="inline-flex items-center rounded-full bg-brand-100 text-brand-700 px-3 py-1 text-xs font-semibold">
                                    {project.category}
                                </span>
                                <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-xs font-semibold">
                                    {project.stage}
                                </span>
                            </div>

                            <CardTitle className="mb-2">{project.title}</CardTitle>
                            <CardDescription className="mb-4">
                                {project.description}
                            </CardDescription>

                            {/* Owner */}
                            <div className="mb-4 flex items-center gap-2 text-sm text-surface-600">
                                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xs font-semibold">
                                    {project.owner.charAt(0)}
                                </div>
                                <span>{project.owner}</span>
                            </div>

                            {/* Investment Info */}
                            <div className="mb-4 grid grid-cols-2 gap-4 p-4 bg-surface-50 rounded-xl">
                                <div>
                                    <p className="text-xs text-surface-500 mb-1">Получено</p>
                                    <p className="text-lg font-semibold text-surface-900">
                                        {(project.investment / 1000).toFixed(0)}K ₸
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-surface-500 mb-1">Требуется</p>
                                    <p className="text-lg font-semibold text-brand-600">
                                        {(project.seeking / 1000).toFixed(0)}K ₸
                                    </p>
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="mb-4 flex items-center gap-1 text-sm">
                                <span className="text-amber-500">★</span>
                                <span className="font-semibold">{project.rating}</span>
                                <span className="text-surface-500">рейтинг</span>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <Button variant="outline" className="flex-1 gap-2">
                                    <Eye className="h-4 w-4" />
                                    Подробнее
                                </Button>
                                <Button className="flex-1 gap-2">
                                    <Mail className="h-4 w-4" />
                                    Предложить инвестицию
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
