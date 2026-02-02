"use client"

import { useState } from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Mail, Phone } from "lucide-react"
import type { Mentor, Investor } from "./OutreachCards"
import type { Project } from "./ProjectCard"

export interface OutreachModalProps {
    type: "mentor" | "investor"
    target: Mentor | Investor | null
    userProjects?: Project[]
    isOpen: boolean
    onClose: () => void
    onSubmit?: (data: OutreachData) => void
}

export interface OutreachData {
    type: "mentor" | "investor"
    targetEmail: string
    targetPhone?: string
    projectId: string
    message?: string
}

/**
 * Outreach Contact Modal
 * Form to contact mentors or investors
 */
export function OutreachModal({
    type,
    target,
    userProjects = [],
    isOpen,
    onClose,
    onSubmit,
}: OutreachModalProps) {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [formData, setFormData] = useState<Partial<OutreachData>>({})

    if (!target) return null

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (onSubmit && formData.projectId) {
            onSubmit({
                type,
                targetEmail: target.email,
                targetPhone: target.phone,
                projectId: formData.projectId,
                message: formData.message,
            })
            setIsSubmitted(true)
            setTimeout(() => {
                setIsSubmitted(false)
                setFormData({})
                onClose()
            }, 2000)
        }
    }

    const resetAndClose = () => {
        setIsSubmitted(false)
        setFormData({})
        onClose()
    }

    const isMentor = type === "mentor"
    const targetName = target.name
    const targetCompany = "companyName" in target ? target.companyName : undefined

    return (
        <Modal isOpen={isOpen} onClose={resetAndClose} size="md">
            {isSubmitted ? (
                /* Success Message */
                <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                        <CheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-surface-900 mb-2">Запрос отправлен!</h3>
                    <p className="text-surface-600">
                        {isMentor ? "Ментор" : "Инвестор"} получит ваше сообщение на email
                        {target.phone && " и телефон"}
                    </p>
                    <p className="text-sm text-surface-500 mt-2">Статус: Отправлено</p>
                </div>
            ) : (
                /* Contact Form */
                <div className="space-y-6">
                    {/* Header */}
                    <div>
                        <h2 className="text-2xl font-bold text-surface-900 mb-2">
                            Связаться с {isMentor ? "ментором" : "инвестором"}
                        </h2>
                        <div className="flex items-center gap-2">
                            <span className="text-surface-700 font-medium">{targetName}</span>
                            {targetCompany && (
                                <>
                                    <span className="text-surface-400">•</span>
                                    <span className="text-surface-600">{targetCompany}</span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="p-4 bg-surface-50 rounded-xl space-y-2">
                        <div className="flex items-center gap-2 text-sm text-surface-700">
                            <Mail className="h-4 w-4 text-surface-500" />
                            <span>{target.email}</span>
                        </div>
                        {target.phone && (
                            <div className="flex items-center gap-2 text-sm text-surface-700">
                                <Phone className="h-4 w-4 text-surface-500" />
                                <span>{target.phone}</span>
                            </div>
                        )}
                    </div>

                    {/* Info Badge */}
                    <div className="p-4 bg-brand-50 border border-brand-200 rounded-xl">
                        <p className="text-sm text-brand-900">
                            {isMentor ? (
                                <>
                                    <strong>Менторство:</strong> Выберите проект, для которого вы
                                    хотите получить менторскую поддержку. Ментор свяжется с вами
                                    для обсуждения деталей.
                                </>
                            ) : (
                                <>
                                    <strong>Инвестиции:</strong> Выберите проект, который вы хотите
                                    представить инвестору. Инвестор рассмотрит ваше предложение и
                                    свяжется с вами.
                                </>
                            )}
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Project Selection */}
                        <div>
                            <label className="block text-sm font-semibold text-surface-900 mb-2">
                                Выберите проект <span className="text-red-500">*</span>
                            </label>
                            {userProjects.length > 0 ? (
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
                            ) : (
                                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                                    <p className="text-sm text-amber-900">
                                        У вас пока нет проектов. Создайте проект, чтобы связаться с{" "}
                                        {isMentor ? "ментором" : "инвестором"}.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Message */}
                        <Textarea
                            label={`Сообщение ${isMentor ? "ментору" : "инвестору"} (опционально)`}
                            placeholder={
                                isMentor
                                    ? "Расскажите, в чем вам нужна помощь..."
                                    : "Расскажите о своем проекте и почему он интересен для инвестиций..."
                            }
                            rows={5}
                            value={formData.message || ""}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />

                        {/* Status Info */}
                        <div className="p-3 bg-surface-50 rounded-xl">
                            <p className="text-xs text-surface-600">
                                После отправки вы сможете отслеживать статус запроса в разделе
                                "Мои запросы"
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={resetAndClose}
                                className="flex-1"
                            >
                                Отмена
                            </Button>
                            <Button
                                type="submit"
                                className="flex-1"
                                disabled={userProjects.length === 0}
                            >
                                Отправить запрос
                            </Button>
                        </div>
                    </form>
                </div>
            )}
        </Modal>
    )
}
