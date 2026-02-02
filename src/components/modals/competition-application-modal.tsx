"use client"

import { useState } from "react"
import { X, FileText, Award, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

interface CompetitionApplicationModalProps {
    competition: any
    isOpen: boolean
    onClose: () => void
}

export function CompetitionApplicationModal({ competition, isOpen, onClose }: CompetitionApplicationModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        project: "",
        subject: "",
        github: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Submitting application:", formData)
        alert("Заявка отправлена!")
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <Card variant="bento" className="w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-surface-200">
                    <h2 className="text-2xl font-bold text-surface-900">{competition.title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-surface-100 transition-colors"
                    >
                        <X className="h-6 w-6 text-surface-600" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {/* Competition Info */}
                    <div className="space-y-4 mb-6">
                        <div className="p-4 rounded-lg bg-surface-50 border border-surface-200">
                            <div className="flex items-center gap-2 text-surface-600 mb-2">
                                <FileText className="h-4 w-4" />
                                <span className="font-semibold">Правила участия</span>
                            </div>
                            <p className="text-surface-600">{competition.rules}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                                <div className="flex items-center gap-2 text-yellow-600 mb-1">
                                    <Award className="h-4 w-4" />
                                    <span className="text-sm font-medium">Призы</span>
                                </div>
                                <p className="text-sm font-semibold text-yellow-900">{competition.prizes}</p>
                            </div>

                            <div className="p-4 rounded-lg bg-brand-50 border border-brand-200">
                                <div className="flex items-center gap-2 text-brand-600 mb-1">
                                    <Calendar className="h-4 w-4" />
                                    <span className="text-sm font-medium">Регистрация до</span>
                                </div>
                                <p className="text-sm font-semibold text-brand-900">
                                    {new Date(competition.deadline).toLocaleDateString("ru-RU")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Application Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <h3 className="text-lg font-semibold text-surface-900 mb-4">Регистрация</h3>

                        <Input
                            label="Имя и фамилия"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />

                        <Input
                            label="Телефон"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />

                        <Input
                            label="Email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />

                        {/* For Olympiads - Subject Selection */}
                        {competition.type === "olympiad" && competition.subjects && (
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-surface-900">
                                    Предмет *
                                </label>
                                <select
                                    required
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full rounded-xl border border-surface-300 bg-white px-4 py-3 text-surface-900 focus:outline-none focus:ring-2 focus:border-brand-500 focus:ring-brand-500/20 transition-all"
                                >
                                    <option value="">Выберите предмет</option>
                                    {competition.subjects.map((subject: string) => (
                                        <option key={subject} value={subject}>
                                            {subject}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* For Project-based Competitions */}
                        {competition.requiresProject && (
                            <>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-surface-900">
                                        Проект *
                                    </label>
                                    <select
                                        required
                                        value={formData.project}
                                        onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                                        className="w-full rounded-xl border border-surface-300 bg-white px-4 py-3 text-surface-900 focus:outline-none focus:ring-2 focus:border-brand-500 focus:ring-brand-500/20 transition-all"
                                    >
                                        <option value="">Выберите проект</option>
                                        <option value="project1">EcoTrack - Мониторинг экологии</option>
                                        <option value="project2">AI Tutor - Персональный репетитор</option>
                                    </select>
                                </div>

                                <Input
                                    label="GitHub (если требуется)"
                                    type="url"
                                    value={formData.github}
                                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                />
                            </>
                        )}

                        {/* Submit Button */}
                        <div className="flex items-center justify-end gap-3 pt-4">
                            <Button type="button" variant="outline" onClick={onClose}>
                                Отмена
                            </Button>
                            <Button type="submit">
                                Зарегистрироваться
                            </Button>
                        </div>
                    </form>
                </div>
            </Card>
        </div>
    )
}
