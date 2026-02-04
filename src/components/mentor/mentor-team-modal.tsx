"use client"

import { useEffect, useState } from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface MentorTeamModalProps {
    isOpen: boolean
    onClose: () => void
    team: any
    onSend: (data: { message: string }) => Promise<void>
}

export const MentorTeamModal: React.FC<MentorTeamModalProps> = ({
    isOpen,
    onClose,
    team,
    onSend,
}) => {
    const [message, setMessage] = useState("")
    const [success, setSuccess] = useState("")

    useEffect(() => {
        if (isOpen) {
            setMessage("")
            setSuccess("")
        }
    }, [isOpen, team])

    if (!team) return null

    const handleSend = async () => {
        await onSend({ message })
        setSuccess("Сообщение отправлено. Команда ответит вам на почту.")
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Контакт с командой ${team.name}`}>
            <div className="space-y-4">
                <div className="p-4 rounded-xl bg-surface-50 border border-surface-100">
                    <p className="text-sm text-surface-600">Проект</p>
                    <p className="font-semibold text-surface-900">{team.project}</p>
                    <p className="text-sm text-surface-600 mt-2">Контакт: {team.contactEmail}</p>
                </div>

                <Textarea
                    label="Сообщение"
                    placeholder="Напишите, как вы можете помочь команде..."
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                {success && (
                    <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 text-sm border border-emerald-100">
                        {success}
                    </div>
                )}

                <div className="flex justify-end gap-2">
                    <Button variant="ghost" onClick={onClose}>
                        Отмена
                    </Button>
                    <Button onClick={handleSend}>Отправить</Button>
                </div>
            </div>
        </Modal>
    )
}
