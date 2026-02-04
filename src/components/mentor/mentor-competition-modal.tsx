"use client"

import { useEffect, useState } from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, FileText, Gift, Info } from "lucide-react"

interface MentorCompetitionModalProps {
    isOpen: boolean
    onClose: () => void
    competition: any
    onRegister: (data: any) => Promise<void>
    isRegistered?: boolean
}

export const MentorCompetitionModal: React.FC<MentorCompetitionModalProps> = ({
    isOpen,
    onClose,
    competition,
    onRegister,
    isRegistered,
}) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        expertise: "",
        message: "",
    })
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        if (isOpen) {
            setFormData({ name: "", email: "", phone: "", expertise: "", message: "" })
            setSuccess("")
            setError("")
        }
    }, [isOpen, competition])

    if (!competition) return null

    const handleSubmit = async () => {
        setError("")
        setSuccess("")
        if (!formData.name || !formData.email) {
            setError("Имя и email обязательны.")
            return
        }
        await onRegister(formData)
        setSuccess("Заявка отправлена. Организаторы свяжутся с вами.")
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={competition.title} className="max-w-3xl">
            <div className="space-y-6">
                <section className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-brand-600 font-semibold">
                        <Info className="h-4 w-4" />
                        {competition.type === "olympiad" ? "Олимпиада" : "Стартап-конкурс"}
                    </div>
                    <p className="text-surface-700">{competition.description}</p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-surface-50 border border-surface-100">
                        <p className="text-sm font-semibold text-surface-900 mb-1 flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-brand-500" />
                            Дедлайн
                        </p>
                        <p className="text-sm text-surface-700">
                            {new Date(competition.deadline).toLocaleDateString("ru-RU")}
                        </p>
                        {competition.registrationEnd && (
                            <p className="text-xs text-surface-500 mt-1">
                                Регистрация до {new Date(competition.registrationEnd).toLocaleDateString("ru-RU")}
                            </p>
                        )}
                    </div>
                    <div className="p-4 rounded-xl bg-surface-50 border border-surface-100">
                        <p className="text-sm font-semibold text-surface-900 mb-1 flex items-center gap-2">
                            <Gift className="h-4 w-4 text-amber-500" />
                            Призы
                        </p>
                        <p className="text-sm text-surface-700">{competition.awards || "Детали по запросу"}</p>
                    </div>
                </div>

                {competition.rules && (
                    <div className="p-4 rounded-xl bg-white border border-surface-200">
                        <p className="text-sm font-semibold text-surface-900 mb-2 flex items-center gap-2">
                            <FileText className="h-4 w-4 text-brand-500" />
                            Правила участия
                        </p>
                        <p className="text-sm text-surface-700 whitespace-pre-wrap">{competition.rules}</p>
                    </div>
                )}

                <div className="border-t border-surface-100 pt-6 space-y-4">
                    <h3 className="text-lg font-bold text-surface-900">Регистрация ментора</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Имя и фамилия"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <Input
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <Input
                            label="Телефон"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                        <Input
                            label="Экспертиза"
                            value={formData.expertise}
                            onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                        />
                    </div>
                    <Textarea
                        label="Комментарий"
                        placeholder="Чем вы можете помочь участникам?"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />

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
                        <Button onClick={handleSubmit} disabled={isRegistered}>
                            {isRegistered ? "Вы уже зарегистрированы" : "Отправить заявку"}
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
