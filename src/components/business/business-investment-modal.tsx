"use client"

import { useEffect, useState } from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface BusinessInvestmentModalProps {
    isOpen: boolean
    onClose: () => void
    project: any
    onSubmit: (data: { email: string; phone: string; amount?: number; message?: string }) => Promise<void>
}

export const BusinessInvestmentModal: React.FC<BusinessInvestmentModalProps> = ({
    isOpen,
    onClose,
    project,
    onSubmit,
}) => {
    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        amount: "",
        message: "",
    })
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        if (isOpen) {
            setFormData({ email: "", phone: "", amount: "", message: "" })
            setSuccess("")
            setError("")
        }
    }, [isOpen, project])

    if (!project) return null

    const handleSubmit = async () => {
        setError("")
        setSuccess("")
        if (!formData.email || !formData.phone) {
            setError("Укажите email и телефон для связи.")
            return
        }
        const amountValue = formData.amount ? Number(formData.amount) : undefined
        await onSubmit({
            email: formData.email,
            phone: formData.phone,
            amount: amountValue,
            message: formData.message,
        })
        setSuccess("Заявка отправлена. Команда получит ваши контакты.")
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Заявка на инвестицию" className="max-w-2xl">
            <div className="space-y-4">
                <div className="p-4 rounded-xl bg-surface-50 border border-surface-100">
                    <p className="text-sm text-surface-600">Проект</p>
                    <p className="font-semibold text-surface-900">{project.title}</p>
                    <p className="text-xs text-surface-500 mt-1">
                        Команда: {project.owner?.teamName || project.owner?.user?.name}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        label="Сумма (опционально)"
                        type="number"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    />
                </div>

                <Textarea
                    label="Комментарий"
                    placeholder="Кратко опишите интерес и условия..."
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
                    <Button onClick={handleSubmit}>Отправить заявку</Button>
                </div>
            </div>
        </Modal>
    )
}
