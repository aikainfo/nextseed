"use client"

import { useEffect, useState } from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"

interface BusinessCompetitionCreateModalProps {
    isOpen: boolean
    onClose: () => void
    onCreate: (data: any) => void
}

export const BusinessCompetitionCreateModal: React.FC<BusinessCompetitionCreateModalProps> = ({
    isOpen,
    onClose,
    onCreate,
}) => {
    const [formData, setFormData] = useState({
        title: "",
        type: "startup",
        description: "",
        rules: "",
        awards: "",
        deadline: "",
        registrationEnd: "",
        eventDate: "",
        location: "",
        files: "",
    })

    useEffect(() => {
        if (isOpen) {
            setFormData({
                title: "",
                type: "startup",
                description: "",
                rules: "",
                awards: "",
                deadline: "",
                registrationEnd: "",
                eventDate: "",
                location: "",
                files: "",
            })
        }
    }, [isOpen])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onCreate({
            ...formData,
            deadline: formData.deadline || new Date().toISOString(),
            registrationEnd: formData.registrationEnd || null,
            eventDate: formData.type === "olympiad" ? formData.eventDate || null : null,
        })
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Создать конкурс" className="max-w-3xl">
            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    label="Название конкурса"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                />

                <Select
                    label="Тип конкурса"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    options={[
                        { value: "startup", label: "Стартап" },
                        { value: "olympiad", label: "Олимпиада" },
                    ]}
                />

                <Textarea
                    label="Описание"
                    placeholder="Кратко опишите конкурс и требования..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                />

                <Textarea
                    label="Правила участия"
                    placeholder="Условия, критерии, формат..."
                    rows={3}
                    value={formData.rules}
                    onChange={(e) => setFormData({ ...formData, rules: e.target.value })}
                />

                <Input
                    label="Призы"
                    placeholder="Например: $5000 + экспертиза"
                    value={formData.awards}
                    onChange={(e) => setFormData({ ...formData, awards: e.target.value })}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Дедлайн заявок"
                        type="date"
                        value={formData.deadline}
                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                        required
                    />
                    <Input
                        label="Регистрация до"
                        type="date"
                        value={formData.registrationEnd}
                        onChange={(e) => setFormData({ ...formData, registrationEnd: e.target.value })}
                    />
                </div>

                {formData.type === "olympiad" && (
                    <Input
                        label="Дата проведения"
                        type="date"
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    />
                )}

                <Input
                    label="Локация"
                    placeholder="Город или формат (онлайн)"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />

                <Input
                    label="Ссылка на файл / документ"
                    placeholder="https://..."
                    value={formData.files}
                    onChange={(e) => setFormData({ ...formData, files: e.target.value })}
                />

                <div className="flex justify-end gap-2">
                    <Button type="button" variant="ghost" onClick={onClose}>
                        Отмена
                    </Button>
                    <Button type="submit">Создать</Button>
                </div>
            </form>
        </Modal>
    )
}
