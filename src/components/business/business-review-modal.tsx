"use client"

import { useEffect, useState } from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"

interface BusinessReviewModalProps {
    isOpen: boolean
    onClose: () => void
    project: any
    onSubmit: (data: { rating: number; content: string }) => Promise<void>
    isSubmitting?: boolean
}

export const BusinessReviewModal: React.FC<BusinessReviewModalProps> = ({
    isOpen,
    onClose,
    project,
    onSubmit,
    isSubmitting,
}) => {
    const [rating, setRating] = useState(0)
    const [content, setContent] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    useEffect(() => {
        if (isOpen) {
            setRating(0)
            setContent("")
            setError("")
            setSuccess("")
        }
    }, [isOpen, project])

    if (!project) return null

    const handleSubmit = async () => {
        setError("")
        setSuccess("")
        if (rating < 1) {
            setError("Пожалуйста, выберите оценку.")
            return
        }
        if (content.trim().length < 10) {
            setError("Добавьте короткий отзыв (минимум 10 символов).")
            return
        }

        await onSubmit({ rating, content })
        setSuccess("Отзыв отправлен. Спасибо за вклад!")
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Оценка проекта" className="max-w-2xl">
            <div className="space-y-6">
                <div>
                    <p className="text-sm text-surface-500">Проект</p>
                    <h3 className="text-lg font-bold text-surface-900">{project.title}</h3>
                </div>

                <div>
                    <p className="text-sm font-semibold text-surface-900 mb-2">Оценка</p>
                    <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                className={`h-10 w-10 rounded-xl border transition ${rating >= star
                                    ? "border-amber-400 bg-amber-50"
                                    : "border-surface-200 bg-white"
                                    }`}
                                aria-label={`Оценка ${star}`}
                            >
                                <Star
                                    className={`mx-auto h-5 w-5 ${rating >= star ? "text-amber-500 fill-amber-500" : "text-surface-300"
                                        }`}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <Textarea
                        label="Фидбек"
                        placeholder="Коротко опишите сильные стороны и возможные риски..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={5}
                    />
                </div>

                {error && (
                    <div className="p-3 rounded-xl bg-red-50 text-red-600 text-sm border border-red-100">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 text-sm border border-emerald-100">
                        {success}
                    </div>
                )}

                <div className="flex justify-end gap-2">
                    <Button variant="ghost" onClick={onClose}>
                        Отмена
                    </Button>
                    <Button onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? "Отправка..." : "Отправить отзыв"}
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
