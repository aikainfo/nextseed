"use client"

import { useState } from "react"
import { Tabs } from "@/components/ui/tabs"
import {
    MentorCard,
    InvestorCard,
    type Mentor,
    type Investor,
} from "@/components/student/OutreachCards"
import { OutreachModal, type OutreachData } from "@/components/student/OutreachModal"
import type { Project } from "@/components/student/ProjectCard"

// Mock data - will be replaced with API calls
const MOCK_MENTORS: Mentor[] = [
    {
        id: "m1",
        name: "Алексей Иванов",
        email: "alexey.ivanov@example.com",
        phone: "+7 (777) 123-45-67",
        specialization: "Tech Startups",
        bio: "15+ лет опыта в IT индустрии. Помог запустить более 20 стартапов. Специализируюсь на технологических проектах и масштабировании.",
        hasTeams: true,
        managedTeams: "EduTech Innovators, FinTrack Team",
    },
    {
        id: "m2",
        name: "Мария Сидорова",
        email: "maria.sidorova@example.com",
        phone: "+7 (777) 234-56-78",
        specialization: "Marketing & Growth",
        bio: "Эксперт по маркетингу и развитию стартапов. Работала с компаниями из Y Combinator. Помогу с go-to-market стратегией.",
        hasTeams: false,
    },
    {
        id: "m3",
        name: "Дмитрий Петров",
        email: "dmitry.petrov@example.com",
        specialization: "Product Management",
        bio: "Product Manager с опытом в крупных tech компаниях. Помогу создать продукт, который нужен пользователям.",
        hasTeams: true,
        managedTeams: "GreenCity Team",
    },
]

const MOCK_INVESTORS: Investor[] = [
    {
        id: "i1",
        name: "Tech Ventures",
        email: "invest@techventures.com",
        phone: "+7 (777) 345-67-89",
        type: "organization",
        companyName: "Tech Ventures LLC",
        bio: "Венчурный фонд, специализирующийся на ранних стадиях технологических стартапов. Инвестировали в более 50 компаний.",
        focusAreas: "EdTech, FinTech, HealthTech",
        investmentRange: "$50k - $500k",
    },
    {
        id: "i2",
        name: "Green Ventures",
        email: "contact@greenventures.com",
        type: "organization",
        companyName: "Green Ventures Fund",
        bio: "Фонд, инвестирующий в экологические и устойчивые проекты. Помогаем стартапам, которые делают мир лучше.",
        focusAreas: "CleanTech, GreenTech, Sustainability",
        investmentRange: "$25k - $250k",
    },
    {
        id: "i3",
        name: "Анна Козлова",
        email: "anna.kozlova@example.com",
        phone: "+7 (777) 456-78-90",
        type: "individual",
        bio: "Angel investor с фокусом на женские стартапы и социальные проекты. Инвестирую не только деньги, но и опыт.",
        focusAreas: "Social Impact, Women-led Startups",
        investmentRange: "$10k - $100k",
    },
]

const MOCK_USER_PROJECTS: Project[] = [
    {
        id: "p1",
        title: "EduTech Platform",
        shortDesc: "Платформа для онлайн обучения",
        description: "Образовательная платформа с AI",
        stage: "MVP",
        hasMentor: false,
        hasInvestors: false,
        investment: 0,
        owner: {
            name: "Моя команда",
            type: "team",
            teamName: "EduTech Team",
        },
    },
]

/**
 * Student Outreach Page
 * Connect with mentors and investors
 */
export default function StudentOutreachPage() {
    const [mentors] = useState<Mentor[]>(MOCK_MENTORS)
    const [investors] = useState<Investor[]>(MOCK_INVESTORS)
    const [selectedTarget, setSelectedTarget] = useState<Mentor | Investor | null>(null)
    const [outreachType, setOutreachType] = useState<"mentor" | "investor">("mentor")
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleContactMentor = (mentor: Mentor) => {
        setSelectedTarget(mentor)
        setOutreachType("mentor")
        setIsModalOpen(true)
    }

    const handleContactInvestor = (investor: Investor) => {
        setSelectedTarget(investor)
        setOutreachType("investor")
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setTimeout(() => setSelectedTarget(null), 300)
    }

    const handleSubmitOutreach = (data: OutreachData) => {
        console.log("Outreach request:", data)
        // TODO: Send to API
    }

    const tabs = [
        {
            id: "mentors",
            label: `Менторы (${mentors.length})`,
            content: (
                <div>
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-surface-900 mb-2">
                            Найдите ментора
                        </h2>
                        <p className="text-surface-600">
                            Свяжитесь с опытными менторами, которые помогут развить ваш проект
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mentors.map((mentor) => (
                            <MentorCard
                                key={mentor.id}
                                mentor={mentor}
                                onContact={handleContactMentor}
                            />
                        ))}
                    </div>
                </div>
            ),
        },
        {
            id: "investors",
            label: `Инвесторы (${investors.length})`,
            content: (
                <div>
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-surface-900 mb-2">
                            Найдите инвестора
                        </h2>
                        <p className="text-surface-600">
                            Представьте свой проект инвесторам и организациям для получения
                            финансирования
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {investors.map((investor) => (
                            <InvestorCard
                                key={investor.id}
                                investor={investor}
                                onContact={handleContactInvestor}
                            />
                        ))}
                    </div>
                </div>
            ),
        },
    ]

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-surface-900 mb-2">Связи и партнерства</h1>
                <p className="text-surface-600">
                    Найдите менторов для развития проекта или инвесторов для финансирования
                </p>
            </div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-brand-50 to-accent-sky/10 rounded-xl border border-brand-100">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">🎓</span>
                        <h3 className="font-semibold text-surface-900">Менторство</h3>
                    </div>
                    <p className="text-sm text-surface-700">
                        Получите советы и поддержку от опытных профессионалов в вашей области
                    </p>
                </div>

                <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">💰</span>
                        <h3 className="font-semibold text-surface-900">Инвестиции</h3>
                    </div>
                    <p className="text-sm text-surface-700">
                        Привлеките финансирование для масштабирования вашего стартапа
                    </p>
                </div>
            </div>

            {/* Tabs */}
            <Tabs tabs={tabs} defaultTab="mentors" />

            {/* Outreach Modal */}
            <OutreachModal
                type={outreachType}
                target={selectedTarget}
                userProjects={MOCK_USER_PROJECTS}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmitOutreach}
            />
        </div>
    )
}
