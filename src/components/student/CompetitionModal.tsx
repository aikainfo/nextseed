"use client"

import { useState } from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FileText, Calendar, Trophy, ExternalLink, CheckCircle2 } from "lucide-react"
import type { Competition } from "./CompetitionCard"
import type { Project } from "./ProjectCard"

export interface CompetitionModalProps {
    competition: Competition | null
    userProjects?: Project[]
    isOpen: boolean
    onClose: () => void
    onSubmit?: (data: ApplicationData) => void
}

export interface ApplicationData {
    competitionId: string
    name: string
    email: string
    phone: string
    projectId?: string
    category?: string
    message?: string
}

/**
 * Competition Application Modal
 * Shows competition details and registration form
 */
export function CompetitionModal({
    competition,
    userProjects = [],
    isOpen,
    onClose,
    onSubmit,
}: CompetitionModalProps) {
    const [showForm, setShowForm] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [formData, setFormData] = useState<Partial<ApplicationData>>({})

    if (!competition) return null

    const isStartupCompetition = competition.category === "startup"
    const isOlympiad = competition.category === "olympiad"

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (onSubmit && formData.name && formData.email && formData.phone) {
            onSubmit({
                competitionId: competition.id,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                projectId: formData.projectId,
                category: formData.category,
                message: formData.message,
            })
            setIsSubmitted(true)
            setTimeout(() => {
                setIsSubmitted(false)
                setShowForm(false)
                setFormData({})
                onClose()
            }, 2000)
        }
    }

    const resetAndClose = () => {
        setShowForm(false)
        setIsSubmitted(false)
        setFormData({})
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={resetAndClose} size="lg">
            {!showForm ? (
                /* Competition Details */
                <div className="space-y-6">
                    {/* Header */}
                    <div>
                        <h2 className="text-2xl font-bold text-surface-900 mb-2">
                            {competition.title}
                        </h2>
                        <Badge variant="outline" className="mb-4">
                            {competition.category === "startup" && "Стартапы"}
                            {competition.category === "olympiad" && "Олимпиада"}
                            {competition.category === "hackathon" && "Хакатон"}
                            {competition.category === "other" && "Другое"}
                        </Badge>
                    </div>

                    {/* Description */}
                    <div>
                        <h3 className="text-lg font-semibold text-surface-900 mb-2">
                            О конкурсе
                        </h3>
                        <p className="text-surface-700 leading-relaxed whitespace-pre-wrap">
                            {competition.description}
                        </p>
                    </div>

                    {/* Rules Document */}
                    {competition.rulesDocument && (
                        <div>
                            <h3 className="text-lg font-semibold text-surface-900 mb-3">
                                Правила участия
                            </h3>
                            <a
                                href={competition.rulesDocument}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-3 bg-brand-50 text-brand-700 rounded-xl hover:bg-brand-100 transition-colors w-fit"
                            >
                                <FileText className="h-5 w-5" />
                                Скачать правила
                                <ExternalLink className="h-4 w-4" />
                            </a>
                        </div>
                    )}

                    {/* Prizes */}
                    {competition.prizes && (
                        <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100">
                            <div className="flex items-center gap-2 mb-2">
                                <Trophy className="h-5 w-5 text-amber-600" />
                                <h3 className="text-lg font-semibold text-surface-900">Призы</h3>
                            </div>
                            <p className="text-surface-700 whitespace-pre-wrap">
                                {competition.prizes}
                            </p>
                        </div>
                    )}

                    {/* Dates */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-surface-50 rounded-xl border border-surface-200">
                            <div className="flex items-center gap-2 mb-1">
                                <Calendar className="h-4 w-4 text-surface-600" />
                                <span className="text-sm font-semibold text-surface-900">
                                    Регистрация до
                                </span>
                            </div>
                            <p className="text-surface-700">
                                {new Date(competition.registrationDeadline).toLocaleDateString(
                                    "ru-RU",
                                    {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    }
                                )}
                            </p>
                        </div>

                        <div className="p-4 bg-surface-50 rounded-xl border border-surface-200">
                            <div className="flex items-center gap-2 mb-1">
                                <Trophy className="h-4 w-4 text-surface-600" />
                                <span className="text-sm font-semibold text-surface-900">
                                    Проведение
                                </span>
                            </div>
                            <p className="text-surface-700">
                                {new Date(competition.deadline).toLocaleDateString("ru-RU", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </p>
                        </div>
                    </div>

                    {/* Register Button */}
                    <Button
                        onClick={() => setShowForm(true)}
                        disabled={competition.isClosed}
                        className="w-full"
                    >
                        {competition.isClosed ? "Регистрация закрыта" : "Зарегистрироваться"}
                    </Button>
                </div>
            ) : isSubmitted ? (
                /* Success Message */
                <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                        <CheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-surface-900 mb-2">
                        Заявка отправлена!
                    </h3>
                    <p className="text-surface-600">
                        Организаторы свяжутся с вами в ближайшее время
                    </p>
                </div>
            ) : (
                /* Registration Form */
                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold text-surface-900 mb-2">
                            Регистрация на конкурс
                        </h2>
                        <p className="text-surface-600">{competition.title}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Basic Info */}
                        <Input
                            label="Имя и фамилия"
                            type="text"
                            required
                            placeholder="Иван Иванов"
                            value={formData.name || ""}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />

                        <Input
                            label="Email"
                            type="email"
                            required
                            placeholder="ivan@example.com"
                            value={formData.email || ""}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />

                        <Input
                            label="Телефон"
                            type="tel"
                            required
                            placeholder="+7 (777) 123-45-67"
                            value={formData.phone || ""}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />

                        {/* Startup Competition - Project Selection */}
                        {isStartupCompetition && userProjects.length > 0 && (
                            <div>
                                <label className="block text-sm font-semibold text-surface-900 mb-2">
                                    Выберите проект
                                </label>
                                <Select
                                    required
                                    value={formData.projectId || ""}
                                    onChange={(e) =>
                                        setFormData({ ...formData, projectId: e.target.value })
                                    }
                                >
                                    <option value="">Выберите проект...</option>
                                    {userProjects.map((project) => (
                                        <option key={project.id} value={project.id}>
                                            {project.title} ({project.stage})
                                        </option>
                                    ))}
                                </Select>
                            </div>
                        )}

                        {/* Olympiad - Category Selection */}
                        {isOlympiad && (
                            <div>
                                <label className="block text-sm font-semibold text-surface-900 mb-2">
                                    Категория участия
                                </label>
                                <Select
                                    required
                                    value={formData.category || ""}
                                    onChange={(e) =>
                                        setFormData({ ...formData, category: e.target.value })
                                    }
                                >
                                    <option value="">Выберите категорию...</option>
                                    <option value="math">Математика</option>
                                    <option value="physics">Физика</option>
                                    <option value="programming">Программирование</option>
                                    <option value="business">Бизнес</option>
                                </Select>
                            </div>
                        )}

                        {/* Additional Message */}
                        <Textarea
                            label="Дополнительная информация (опционально)"
                            placeholder="Расскажите о себе или своей команде..."
                            rows={4}
                            value={formData.message || ""}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />

                        {/* Actions */}
                        <div className="flex gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setShowForm(false)}
                                className="flex-1"
                            >
                                Назад
                            </Button>
                            <Button type="submit" className="flex-1">
                                Отправить заявку
                            </Button>
                        </div>
                    </form>
                </div>
            )}
        </Modal>
    )
}
