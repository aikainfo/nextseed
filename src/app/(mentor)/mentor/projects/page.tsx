"use client"

import { useState } from "react"
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star, MessageSquare, Eye } from "lucide-react"

/**
 * Mentor Projects Page
 * View and evaluate student projects
 */
export default function MentorProjectsPage() {
    const [searchQuery, setSearchQuery] = useState("")

    // Mock data
    const projects = [
        {
            id: "1",
            title: "EduAI - Персональный помощник для учебы",
            description: "AI-платформа для персонализированного обучения с использованием LLM",
            owner: "Алия Нурланова",
            stage: "MVP",
            myRating: 5,
            avgRating: 4.8,
            reviews: 12,
        },
        {
            id: "2",
            title: "GreenPath - Экологический трекер",
            description: "Мобильное приложение для отслеживания углеродного следа",
            owner: "Команда InnoTech",
            stage: "Idea",
            myRating: null,
            avgRating: 4.2,
            reviews: 5,
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
                    Просматривайте и оценивайте проекты учеников
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
                            {/* Stage Badge */}
                            <div className="mb-4">
                                <span className="inline-flex items-center rounded-full bg-brand-100 text-brand-700 px-3 py-1 text-xs font-semibold">
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

                            {/* Rating */}
                            <div className="mb-4 flex items-center gap-4">
                                <div className="flex items-center gap-1 text-sm">
                                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                                    <span className="font-semibold">{project.avgRating}</span>
                                    <span className="text-surface-500">({project.reviews})</span>
                                </div>
                                {project.myRating && (
                                    <div className="text-sm text-brand-600 font-medium">
                                        Ваша оценка: {project.myRating}/5
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <Button variant="outline" className="flex-1 gap-2">
                                    <Eye className="h-4 w-4" />
                                    Просмотр
                                </Button>
                                <Button className="flex-1 gap-2">
                                    <MessageSquare className="h-4 w-4" />
                                    Оценить
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
