"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { User, Building2, Mail, MessageSquare } from "lucide-react"

// Mock data
const MOCK_MENTORS = [
    {
        id: "1",
        name: "Асхат Жумабаев",
        role: "Senior Software Engineer",
        company: "Tech Corp",
        expertise: "AI, Machine Learning, Web Development",
        projects: 15,
    },
    {
        id: "2",
        name: "Мария Иванова",
        role: "Product Manager",
        company: "Startup Hub KZ",
        expertise: "Product Development, UX/UI",
        projects: 8,
    },
]

const MOCK_INVESTORS = [
    {
        id: "1",
        name: "TechInvest KZ",
        type: "Венчурный фонд",
        focus: "EdTech, AI, Green Tech",
        investments: 20,
    },
    {
        id: "2",
        name: "Astana Hub",
        type: "Технопарк",
        focus: "IT-стартапы",
        investments: 50,
    },
]

export default function StudentMentorsPage() {
    const [activeTab, setActiveTab] = useState<"mentors" | "investors">("mentors")
    const [showContactForm, setShowContactForm] = useState<any>(null)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        project: "",
        message: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Sending outreach:", formData)
        alert("Сообщение отправлено!")
        setShowContactForm(null)
        setFormData({ name: "", email: "", phone: "", project: "", message: "" })
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-surface-900">Менторы и Инвесторы</h1>
                <p className="mt-1 text-surface-600">Найдите ментора или инвестора для вашего проекта</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-surface-200">
                <button
                    onClick={() => setActiveTab("mentors")}
                    className={`px-6 py-3 font-semibold transition-colors ${activeTab === "mentors"
                            ? "text-brand-600 border-b-2 border-brand-600"
                            : "text-surface-600 hover:text-surface-900"
                        }`}
                >
                    Менторы
                </button>
                <button
                    onClick={() => setActiveTab("investors")}
                    className={`px-6 py-3 font-semibold transition-colors ${activeTab === "investors"
                            ? "text-brand-600 border-b-2 border-brand-600"
                            : "text-surface-600 hover:text-surface-900"
                        }`}
                >
                    Инвесторы
                </button>
            </div>

            {/* Content */}
            <div className="grid gap-4">
                {activeTab === "mentors" ? (
                    MOCK_MENTORS.map((mentor) => (
                        <Card key={mentor.id} variant="bento" className="hover:shadow-lg transition-all duration-200">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-semibold text-lg">
                                                {mentor.name[0]}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-surface-900">{mentor.name}</h3>
                                                <p className="text-sm text-surface-500">{mentor.role} в {mentor.company}</p>
                                            </div>
                                        </div>
                                        <p className="text-surface-600 mb-2">
                                            <span className="font-semibold">Экспертиза:</span> {mentor.expertise}
                                        </p>
                                        <p className="text-sm text-surface-500">
                                            Курирует {mentor.projects} проектов
                                        </p>
                                    </div>
                                    <Button onClick={() => setShowContactForm(mentor)}>
                                        Связаться
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    MOCK_INVESTORS.map((investor) => (
                        <Card key={investor.id} variant="bento" className="hover:shadow-lg transition-all duration-200">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white">
                                                <Building2 className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-surface-900">{investor.name}</h3>
                                                <p className="text-sm text-surface-500">{investor.type}</p>
                                            </div>
                                        </div>
                                        <p className="text-surface-600 mb-2">
                                            <span className="font-semibold">Фокус:</span> {investor.focus}
                                        </p>
                                        <p className="text-sm text-surface-500">
                                            {investor.investments} инвестиций
                                        </p>
                                    </div>
                                    <Button onClick={() => setShowContactForm(investor)}>
                                        Связаться
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            {/* Contact Form Modal */}
            {showContactForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <Card variant="bento" className="w-full max-w-2xl">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-surface-900">
                                    Связаться с {showContactForm.name}
                                </h2>
                                <button
                                    onClick={() => setShowContactForm(null)}
                                    className="text-surface-600 hover:text-surface-900"
                                >
                                    ✕
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Input
                                    label="Ваше имя"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />

                                <Input
                                    label="Email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />

                                <Input
                                    label="Телефон"
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />

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

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-surface-900">
                                        Сообщение *
                                    </label>
                                    <Textarea
                                        required
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="Расскажите о вашем проекте и почему вам нужна помощь..."
                                    />
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-4">
                                    <Button type="button" variant="outline" onClick={() => setShowContactForm(null)}>
                                        Отмена
                                    </Button>
                                    <Button type="submit">
                                        Отправить
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}
