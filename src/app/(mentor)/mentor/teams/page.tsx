"use client"

import { useState } from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Users, Search } from "lucide-react"

export default function MentorTeamsPage() {
    const [searchQuery, setSearchQuery] = useState("")

    // Mock data - команды без ментора
    const teams = [
        {
            id: "1",
            name: "GreenTech",
            members: "Ерлан, Айгерим, Дана",
            project: "EcoTracker - Приложение для экологии",
            email: "greentech@example.com",
        },
        {
            id: "2",
            name: "AI Innovators",
            members: "Асель, Нурлан",
            project: "SmartLearn - AI платформа для обучения",
            email: "aiinnovators@example.com",
        },
    ]

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-surface-900">Команды</h1>
                <p className="mt-1 text-surface-600">Найдите команды, которым нужен ментор</p>
            </div>

            <Card variant="bento" className="p-6">
                <Input
                    placeholder="Поиск команд..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
                {teams.map((team) => (
                    <Card key={team.id} hover variant="bento">
                        <CardContent>
                            <CardTitle className="mb-2">{team.name}</CardTitle>

                            <div className="mb-4 space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-surface-600">
                                    <Users className="h-4 w-4" />
                                    <span>{team.members}</span>
                                </div>
                                <div className="flex items-center gap-2 text-surface-600">
                                    <Mail className="h-4 w-4" />
                                    <span>{team.email}</span>
                                </div>
                            </div>

                            <div className="mb-4 p-3 bg-surface-50 rounded-lg">
                                <p className="text-sm font-medium text-surface-900 mb-1">Проект:</p>
                                <p className="text-sm text-surface-600">{team.project}</p>
                            </div>

                            <Button className="w-full gap-2">
                                <Mail className="h-4 w-4" />
                                Связаться
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
