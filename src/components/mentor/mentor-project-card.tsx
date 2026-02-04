import React from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MessageSquare, Eye } from "lucide-react"

interface MentorProjectCardProps {
    project: {
        id: string
        title: string
        description: string
        shortDescription?: string
        stage: string
        owner: {
            user: { name: string }
            teamName?: string
        }
        rating?: number
        reviewCount?: number
    }
    onView: (projectId: string) => void
    onReview: (projectId: string) => void
}

export const MentorProjectCard: React.FC<MentorProjectCardProps> = ({
    project,
    onView,
    onReview,
}) => {
    return (
        <Card variant="bento" className="h-full flex flex-col overflow-hidden">
            <div className="h-2 w-full bg-gradient-to-r from-brand-400 to-sky-400" />

            <CardContent className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="bg-brand-50 text-brand-700 border-brand-200">
                        {project.stage}
                    </Badge>
                    <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-semibold">
                            {project.rating ? project.rating.toFixed(1) : "0.0"}
                        </span>
                        <span className="text-xs text-surface-500">
                            ({project.reviewCount || 0})
                        </span>
                    </div>
                </div>

                <CardTitle className="text-lg mb-2 line-clamp-2">{project.title}</CardTitle>
                <p className="text-surface-600 text-sm mb-4 line-clamp-3">
                    {project.shortDescription || project.description}
                </p>

                <div className="mt-auto pt-4 border-t border-surface-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 overflow-hidden">
                        <div className="w-8 h-8 rounded-full bg-surface-100 flex items-center justify-center text-surface-600 text-xs font-bold">
                            {project.owner.user.name.charAt(0)}
                        </div>
                        <p className="text-xs text-surface-700 font-medium truncate">
                            {project.owner.teamName || project.owner.user.name}
                        </p>
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="border-brand-500 text-brand-600 hover:bg-brand-50"
                        onClick={() => onView(project.id)}
                    >
                        <Eye className="w-4 h-4" />
                        Подробнее
                    </Button>
                    <Button size="sm" onClick={() => onReview(project.id)}>
                        <MessageSquare className="w-4 h-4" />
                        Оценить
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
