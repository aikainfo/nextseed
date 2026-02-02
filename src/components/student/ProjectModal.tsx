"use client"

import { Modal } from "@/components/ui/modal"
import { Tabs } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Rating, RatingDisplay } from "@/components/ui/rating"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Video, FileText, Users, TrendingUp, Award } from "lucide-react"
import type { Project } from "./ProjectCard"

export interface Review {
    id: string
    author: {
        name: string
        role: "mentor" | "business"
        companyName?: string
    }
    rating: number
    content: string
    createdAt: string
}

export interface ProjectModalProps {
    project: Project | null
    reviews?: Review[]
    isOpen: boolean
    onClose: () => void
}

/**
 * Project Details Modal
 * Shows full project information with tabs for details and reviews
 */
export function ProjectModal({ project, reviews = [], isOpen, onClose }: ProjectModalProps) {
    if (!project) return null

    const tabs = [
        {
            id: "details",
            label: "О проекте",
            content: <ProjectDetailsTab project={project} />,
        },
        {
            id: "reviews",
            label: "Отзывы и оценки",
            content: <ProjectReviewsTab reviews={reviews} project={project} />,
        },
    ]

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <Tabs tabs={tabs} defaultTab="details" />
        </Modal>
    )
}

/**
 * Project Details Tab
 */
function ProjectDetailsTab({ project }: { project: Project }) {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                    <h2 className="text-2xl font-bold text-surface-900">{project.title}</h2>
                    <Badge variant="outline" className="shrink-0">
                        {project.stage}
                    </Badge>
                </div>

                {/* Owner */}
                <div className="flex items-center gap-2 text-surface-600">
                    {project.owner.type === "team" ? (
                        <>
                            <Users className="h-4 w-4" />
                            <span className="font-medium">{project.owner.teamName || "Команда"}</span>
                        </>
                    ) : (
                        <span className="font-medium">{project.owner.name}</span>
                    )}
                </div>
            </div>

            {/* Description */}
            <div>
                <h3 className="text-lg font-semibold text-surface-900 mb-2">Описание</h3>
                <p className="text-surface-700 leading-relaxed whitespace-pre-wrap">
                    {project.description}
                </p>
            </div>

            {/* Links */}
            {(project.pitchDeckUrl || project.pitchVideoUrl || project.githubUrl) && (
                <div>
                    <h3 className="text-lg font-semibold text-surface-900 mb-3">Ссылки</h3>
                    <div className="flex flex-wrap gap-3">
                        {project.pitchDeckUrl && (
                            <a
                                href={project.pitchDeckUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-700 rounded-xl hover:bg-brand-100 transition-colors"
                            >
                                <FileText className="h-4 w-4" />
                                Pitch Deck
                                <ExternalLink className="h-3 w-3" />
                            </a>
                        )}
                        {project.pitchVideoUrl && (
                            <a
                                href={project.pitchVideoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-700 rounded-xl hover:bg-brand-100 transition-colors"
                            >
                                <Video className="h-4 w-4" />
                                Pitch Video
                                <ExternalLink className="h-3 w-3" />
                            </a>
                        )}
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-surface-100 text-surface-700 rounded-xl hover:bg-surface-200 transition-colors"
                            >
                                <Github className="h-4 w-4" />
                                GitHub
                                <ExternalLink className="h-3 w-3" />
                            </a>
                        )}
                    </div>
                </div>
            )}

            {/* Development Info */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Mentor */}
                {project.hasMentor && (
                    <div className="p-4 bg-gradient-to-br from-brand-50 to-accent-sky/10 rounded-xl border border-brand-100">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-8 w-8 rounded-lg bg-brand-500 flex items-center justify-center">
                                <span className="text-white text-lg">🎓</span>
                            </div>
                            <h4 className="font-semibold text-surface-900">Ментор</h4>
                        </div>
                        <p className="text-surface-700">{project.mentorName || "Есть ментор"}</p>
                    </div>
                )}

                {/* Investors */}
                {project.hasInvestors && (
                    <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-8 w-8 rounded-lg bg-amber-500 flex items-center justify-center">
                                <TrendingUp className="h-4 w-4 text-white" />
                            </div>
                            <h4 className="font-semibold text-surface-900">Инвестиции</h4>
                        </div>
                        <p className="text-surface-700">
                            {project.investment > 0
                                ? `$${project.investment.toLocaleString()}`
                                : "Есть инвесторы"}
                        </p>
                    </div>
                )}
            </div>

            {/* Participations */}
            {project.participations && (
                <div>
                    <h3 className="text-lg font-semibold text-surface-900 mb-2 flex items-center gap-2">
                        <Award className="h-5 w-5 text-brand-600" />
                        Участие в мероприятиях
                    </h3>
                    <p className="text-surface-700 whitespace-pre-wrap">{project.participations}</p>
                </div>
            )}

            {/* Victories */}
            {project.victories && (
                <div>
                    <h3 className="text-lg font-semibold text-surface-900 mb-2 flex items-center gap-2">
                        <span className="text-xl">🏆</span>
                        Достижения и призы
                    </h3>
                    <p className="text-surface-700 whitespace-pre-wrap">{project.victories}</p>
                </div>
            )}
        </div>
    )
}

/**
 * Project Reviews Tab
 */
function ProjectReviewsTab({ reviews, project }: { reviews: Review[]; project: Project }) {
    const averageRating = project.averageRating || 0
    const reviewCount = project.reviewCount || reviews.length

    return (
        <div className="space-y-6">
            {/* Rating Summary */}
            <div className="p-6 bg-gradient-to-br from-brand-50 to-accent-sky/10 rounded-2xl border border-brand-100">
                <div className="text-center">
                    <div className="text-5xl font-bold text-surface-900 mb-2">
                        {averageRating.toFixed(1)}
                    </div>
                    <Rating value={averageRating} size="lg" className="justify-center mb-2" />
                    <p className="text-surface-600">
                        На основе {reviewCount} {reviewCount === 1 ? "отзыва" : "отзывов"}
                    </p>
                </div>
            </div>

            {/* Reviews List */}
            {reviews.length > 0 ? (
                <div className="space-y-4">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="p-4 bg-white border border-surface-200 rounded-xl hover:border-brand-200 transition-colors"
                        >
                            {/* Review Header */}
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <div className="font-semibold text-surface-900">
                                        {review.author.name}
                                    </div>
                                    <div className="text-sm text-surface-600">
                                        {review.author.role === "mentor" ? "Ментор" : "Бизнес"}
                                        {review.author.companyName && ` • ${review.author.companyName}`}
                                    </div>
                                </div>
                                <Rating value={review.rating} size="sm" />
                            </div>

                            {/* Review Content */}
                            <p className="text-surface-700 leading-relaxed">{review.content}</p>

                            {/* Review Date */}
                            <div className="mt-3 text-xs text-surface-500">
                                {new Date(review.createdAt).toLocaleDateString("ru-RU", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="text-4xl mb-3">💬</div>
                    <p className="text-surface-600">Пока нет отзывов</p>
                    <p className="text-sm text-surface-500 mt-1">
                        Менторы и бизнес-аккаунты могут оставить первый отзыв
                    </p>
                </div>
            )}
        </div>
    )
}
