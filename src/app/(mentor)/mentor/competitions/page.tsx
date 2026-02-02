"use client"

import { useState } from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Calendar, MapPin, Users, FileText } from "lucide-react"
import Link from "next/link"

/**
 * Mentor Competitions Page
 * View and create competitions
 */
export default function MentorCompetitionsPage() {
    const [searchQuery, setSearchQuery] = useState("")

    // Mock data
    const competitions = [
        {
            id: "1",
            title: "FIRST Robotics Kazakhstan 2026",
            description: "Международный конкурс по робототехнике",
            deadline: "2026-06-15",
            location: "Астана",
            participants: 150,
            creator: "Асхат Жумабаев",
            isOwner: true,
        },
    ]

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-surface-900">Конкурсы</h1>
                    <p className="mt-1 text-surface-600">Создавайте и управляйте конкурсами</p>
                </div>
                <Link href="/mentor/competitions/create">
                    <Button className="gap-2">
                        <Plus className="h-5 w-5" />
                        Создать конкурс
                    </Button>
                </Link>
            </div>

            {/* Search */}
            <Card variant="bento" className="p-6">
                <Input
                    placeholder="Поиск конкурсов..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Card>

            {/* Competitions Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
                {competitions.map((comp) => (
                    <Card key={comp.id} hover variant="bento">
                        <CardContent>
                            {comp.isOwner && (
                                <div className="mb-4">
                                    <span className="inline-flex items-center rounded-full bg-brand-100 text-brand-700 px-3 py-1 text-xs font-semibold">
                                        Ваш конкурс
                                    </span>
                                </div>
                            )}

                            <CardTitle className="mb-2">{comp.title}</CardTitle>
                            <p className="text-sm text-surface-600 mb-4">{comp.description}</p>

                            <div className="mb-4 space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-surface-600">
                                    <Calendar className="h-4 w-4" />
                                    <span>Дедлайн: {new Date(comp.deadline).toLocaleDateString('ru-RU')}</span>
                                </div>
                                <div className="flex items-center gap-2 text-surface-600">
                                    <MapPin className="h-4 w-4" />
                                    <span>{comp.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-surface-600">
                                    <Users className="h-4 w-4" />
                                    <span>{comp.participants} участников</span>
                                </div>
                            </div>

                            <Button className="w-full gap-2">
                                <FileText className="h-4 w-4" />
                                Управление
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
