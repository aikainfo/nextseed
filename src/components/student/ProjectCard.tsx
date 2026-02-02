"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RatingDisplay } from "@/components/ui/rating"
import { ExternalLink, Github, Users } from "lucide-react"
import { cn } from "@/lib/utils/cn"

export interface Project {
    id: string
    title: string
    shortDesc?: string
    description: string
    stage: string
    hasMentor: boolean
    mentorName?: string
    hasInvestors: boolean
    investment: number
    pitchDeckUrl?: string
    pitchVideoUrl?: string
    githubUrl?: string
    participations?: string
    victories?: string
    owner: {
        name: string
        type: "individual" | "team"
        teamName?: string
    }
    averageRating?: number
    reviewCount?: number
}

export interface ProjectCardProps {
    project: Project
    onClick?: () => void
    className?: string
}

/**
 * Project Card Component
 * Displays project summary in a card format
 */
export function ProjectCard({ project, onClick, className }: ProjectCardProps) {
    return (
        <Card
            variant="bento"
            className={cn(
                "group cursor-pointer transition-all duration-300 hover:shadow-premium hover:-translate-y-1",
                className
            )}
            onClick={onClick}
        >
            {/* Header */}
            <div className="mb-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-lg font-bold text-surface-900 group-hover:text-brand-600 transition-colors line-clamp-2">
                        {project.title}
                    </h3>
                    <Badge variant="outline" className="shrink-0">
                        {project.stage}
                    </Badge>
                </div>

                {/* Owner Info */}
                <div className="flex items-center gap-2 text-sm text-surface-600">
                    {project.owner.type === "team" ? (
                        <>
                            <Users className="h-4 w-4" />
                            <span>{project.owner.teamName || "Команда"}</span>
                        </>
                    ) : (
                        <span>{project.owner.name}</span>
                    )}
                </div>
            </div>

            {/* Description */}
            <p className="text-sm text-surface-700 line-clamp-3 mb-4">
                {project.shortDesc || project.description}
            </p>

            {/* Metadata */}
            <div className="flex flex-wrap gap-2 mb-4">
                {project.hasMentor && (
                    <Badge variant="secondary" className="text-xs">
                        🎓 Ментор
                    </Badge>
                )}
                {project.hasInvestors && (
                    <Badge variant="secondary" className="text-xs">
                        💰 Инвестиции
                    </Badge>
                )}
                {project.githubUrl && (
                    <Badge variant="secondary" className="text-xs">
                        <Github className="h-3 w-3 mr-1" />
                        GitHub
                    </Badge>
                )}
                {project.participations && (
                    <Badge variant="secondary" className="text-xs">
                        🏆 Участвовал в конкурсах
                    </Badge>
                )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-surface-200">
                {project.averageRating !== undefined && project.reviewCount !== undefined ? (
                    <RatingDisplay
                        rating={project.averageRating}
                        count={project.reviewCount}
                        size="sm"
                    />
                ) : (
                    <span className="text-xs text-surface-500">Нет оценок</span>
                )}

                <button className="flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors">
                    Подробнее
                    <ExternalLink className="h-4 w-4" />
                </button>
            </div>
        </Card>
    )
}
