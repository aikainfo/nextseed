"use client"

import { useState } from "react"
import { X, Star, ExternalLink, Github, FileText, Award, DollarSign, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ProjectDetailsModalProps {
    project: any
    isOpen: boolean
    onClose: () => void
}

export function ProjectDetailsModal({ project, isOpen, onClose }: ProjectDetailsModalProps) {
    const [activeTab, setActiveTab] = useState<"details" | "reviews">("details")

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <Card variant="bento" className="w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-surface-200">
                    <h2 className="text-2xl font-bold text-surface-900">{project.title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-surface-100 transition-colors"
                    >
                        <X className="h-6 w-6 text-surface-600" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-surface-200">
                    <button
                        onClick={() => setActiveTab("details")}
                        className={`flex-1 px-6 py-4 font-semibold transition-colors ${activeTab === "details"
                                ? "text-brand-600 border-b-2 border-brand-600"
                                : "text-surface-600 hover:text-surface-900"
                            }`}
                    >
                        О проекте
                    </button>
                    <button
                        onClick={() => setActiveTab("reviews")}
                        className={`flex-1 px-6 py-4 font-semibold transition-colors ${activeTab === "reviews"
                                ? "text-brand-600 border-b-2 border-brand-600"
                                : "text-surface-600 hover:text-surface-900"
                            }`}
                    >
                        Отзывы и оценки ({project.reviews?.length || 0})
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {activeTab === "details" ? (
                        <div className="space-y-6">
                            {/* Description */}
                            <div>
                                <h3 className="text-lg font-semibold text-surface-900 mb-2">Описание</h3>
                                <p className="text-surface-600">{project.description}</p>
                            </div>

                            {/* Links */}
                            {(project.pitchDeck || project.github || project.docsUrl) && (
                                <div>
                                    <h3 className="text-lg font-semibold text-surface-900 mb-3">Ссылки</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {project.pitchDeck && (
                                            <a
                                                href={project.pitchDeck}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-100 hover:bg-surface-200 text-surface-900 transition-colors"
                                            >
                                                <FileText className="h-4 w-4" />
                                                Pitch Deck
                                                <ExternalLink className="h-3 w-3" />
                                            </a>
                                        )}
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-100 hover:bg-surface-200 text-surface-900 transition-colors"
                                            >
                                                <Github className="h-4 w-4" />
                                                GitHub
                                                <ExternalLink className="h-3 w-3" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Project Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Stage */}
                                <div className="p-4 rounded-lg bg-surface-50 border border-surface-200">
                                    <div className="flex items-center gap-2 text-surface-600 mb-1">
                                        <Award className="h-4 w-4" />
                                        <span className="text-sm font-medium">Стадия развития</span>
                                    </div>
                                    <p className="text-lg font-semibold text-surface-900">{project.stage}</p>
                                </div>

                                {/* Investment */}
                                {project.investment > 0 && (
                                    <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                                        <div className="flex items-center gap-2 text-green-600 mb-1">
                                            <DollarSign className="h-4 w-4" />
                                            <span className="text-sm font-medium">Инвестиции</span>
                                        </div>
                                        <p className="text-lg font-semibold text-green-900">
                                            ${project.investment.toLocaleString()}
                                        </p>
                                    </div>
                                )}

                                {/* Mentor */}
                                {project.mentor && (
                                    <div className="p-4 rounded-lg bg-brand-50 border border-brand-200">
                                        <div className="flex items-center gap-2 text-brand-600 mb-1">
                                            <User className="h-4 w-4" />
                                            <span className="text-sm font-medium">Ментор</span>
                                        </div>
                                        <p className="text-lg font-semibold text-brand-900">{project.mentor}</p>
                                    </div>
                                )}

                                {/* Victories */}
                                {project.victories && (
                                    <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                                        <div className="flex items-center gap-2 text-yellow-600 mb-1">
                                            <Award className="h-4 w-4" />
                                            <span className="text-sm font-medium">Достижения</span>
                                        </div>
                                        <p className="text-lg font-semibold text-yellow-900">{project.victories}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {project.reviews && project.reviews.length > 0 ? (
                                project.reviews.map((review: any, index: number) => (
                                    <div key={index} className="p-4 rounded-lg bg-surface-50 border border-surface-200">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <p className="font-semibold text-surface-900">{review.author}</p>
                                                <p className="text-sm text-surface-500">
                                                    {review.role === "mentor" ? "Ментор" : "Бизнес"}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-4 w-4 ${i < review.rating
                                                                ? "fill-yellow-400 text-yellow-400"
                                                                : "text-surface-300"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-surface-600">{review.content}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-surface-500">Пока нет отзывов</p>
                                    <p className="text-sm text-surface-400 mt-1">
                                        Только менторы и бизнес-аккаунты могут оставлять отзывы
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 p-6 border-t border-surface-200">
                    <Button variant="outline" onClick={onClose}>
                        Закрыть
                    </Button>
                </div>
            </Card>
        </div>
    )
}
