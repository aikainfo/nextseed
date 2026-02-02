"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Trophy, Users, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils/cn"

export interface Competition {
    id: string
    title: string
    description: string
    category: "startup" | "olympiad" | "hackathon" | "other"
    deadline: string
    registrationDeadline: string
    isClosed: boolean
    prizes?: string
    rulesDocument?: string
    creator: {
        name: string
        role: "mentor" | "business"
    }
}

export interface CompetitionCardProps {
    competition: Competition
    onClick?: () => void
    className?: string
}

const categoryLabels = {
    startup: "Стартапы",
    olympiad: "Олимпиада",
    hackathon: "Хакатон",
    other: "Другое",
}

const categoryColors = {
    startup: "bg-brand-100 text-brand-700 border-brand-200",
    olympiad: "bg-purple-100 text-purple-700 border-purple-200",
    hackathon: "bg-orange-100 text-orange-700 border-orange-200",
    other: "bg-surface-100 text-surface-700 border-surface-200",
}

/**
 * Competition Card Component
 * Displays competition summary in a card format
 */
export function CompetitionCard({ competition, onClick, className }: CompetitionCardProps) {
    const isExpiringSoon = !competition.isClosed &&
        new Date(competition.registrationDeadline).getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000

    const daysUntilDeadline = Math.ceil(
        (new Date(competition.registrationDeadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    )

    return (
        <Card
            variant="bento"
            className={cn(
                "group cursor-pointer transition-all duration-300 hover:shadow-premium hover:-translate-y-1",
                competition.isClosed && "opacity-60",
                className
            )}
            onClick={onClick}
        >
            {/* Header */}
            <div className="mb-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-lg font-bold text-surface-900 group-hover:text-brand-600 transition-colors line-clamp-2">
                        {competition.title}
                    </h3>
                    <Badge
                        variant="outline"
                        className={cn("shrink-0", categoryColors[competition.category])}
                    >
                        {categoryLabels[competition.category]}
                    </Badge>
                </div>

                {/* Status Badge */}
                {competition.isClosed ? (
                    <Badge variant="secondary" className="bg-red-100 text-red-700 border-red-200">
                        Регистрация закрыта
                    </Badge>
                ) : isExpiringSoon ? (
                    <Badge variant="secondary" className="bg-amber-100 text-amber-700 border-amber-200">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Осталось {daysUntilDeadline} {daysUntilDeadline === 1 ? "день" : "дней"}
                    </Badge>
                ) : (
                    <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                        Регистрация открыта
                    </Badge>
                )}
            </div>

            {/* Description */}
            <p className="text-sm text-surface-700 line-clamp-3 mb-4">
                {competition.description}
            </p>

            {/* Metadata */}
            <div className="space-y-2 mb-4">
                {/* Registration Deadline */}
                <div className="flex items-center gap-2 text-sm text-surface-600">
                    <Calendar className="h-4 w-4" />
                    <span>
                        Регистрация до:{" "}
                        {new Date(competition.registrationDeadline).toLocaleDateString("ru-RU", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </span>
                </div>

                {/* Event Date */}
                <div className="flex items-center gap-2 text-sm text-surface-600">
                    <Trophy className="h-4 w-4" />
                    <span>
                        Проведение:{" "}
                        {new Date(competition.deadline).toLocaleDateString("ru-RU", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </span>
                </div>

                {/* Organizer */}
                <div className="flex items-center gap-2 text-sm text-surface-600">
                    <Users className="h-4 w-4" />
                    <span>Организатор: {competition.creator.name}</span>
                </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-surface-200">
                <button
                    disabled={competition.isClosed}
                    className={cn(
                        "w-full py-2 px-4 rounded-xl font-semibold transition-all",
                        competition.isClosed
                            ? "bg-surface-100 text-surface-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-brand-500 to-accent-sky text-white hover:shadow-lg hover:scale-[1.02] active:scale-95"
                    )}
                >
                    {competition.isClosed ? "Регистрация закрыта" : "Участвовать"}
                </button>
            </div>
        </Card>
    )
}
