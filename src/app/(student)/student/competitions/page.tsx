"use client"

import { useState } from "react"
import { CompetitionCard, type Competition } from "@/components/student/CompetitionCard"
import { CompetitionModal, type ApplicationData } from "@/components/student/CompetitionModal"
import type { Project } from "@/components/student/ProjectCard"

// Mock data - will be replaced with API calls
const MOCK_COMPETITIONS: Competition[] = [
    {
        id: "c1",
        title: "Startup Battle 2026",
        description:
            "Крупнейший конкурс стартапов в Центральной Азии. Представьте свой проект инвесторам и менторам. Призовой фонд $100,000!",
        category: "startup",
        deadline: "2026-03-15T00:00:00Z",
        registrationDeadline: "2026-02-28T23:59:59Z",
        isClosed: false,
        prizes: "1 место: $50,000\n2 место: $30,000\n3 место: $20,000\nПлюс менторство от ведущих экспертов",
        rulesDocument: "https://example.com/startup-battle-rules.pdf",
        creator: {
            name: "Astana Hub",
            role: "business",
        },
    },
    {
        id: "c2",
        title: "Math Olympiad 2026",
        description:
            "Международная математическая олимпиада для студентов. Проверьте свои знания и получите шанс на стипендию!",
        category: "olympiad",
        deadline: "2026-04-20T00:00:00Z",
        registrationDeadline: "2026-04-01T23:59:59Z",
        isClosed: false,
        prizes: "Золотая медаль + стипендия $5,000\nСеребряная медаль + стипендия $3,000\nБронзовая медаль + стипендия $1,000",
        creator: {
            name: "Международная Ассоциация Математиков",
            role: "mentor",
        },
    },
    {
        id: "c3",
        title: "AI Hackathon",
        description:
            "48-часовой хакатон по искусственному интеллекту. Создайте инновационное AI-решение и выиграйте призы!",
        category: "hackathon",
        deadline: "2026-02-10T00:00:00Z",
        registrationDeadline: "2026-02-05T23:59:59Z",
        isClosed: false,
        prizes: "1 место: MacBook Pro M3\n2 место: iPad Pro\n3 место: AirPods Pro\nВсе участники получат сертификаты",
        rulesDocument: "https://example.com/ai-hackathon-rules.pdf",
        creator: {
            name: "Tech Innovators",
            role: "business",
        },
    },
    {
        id: "c4",
        title: "Green Tech Challenge",
        description:
            "Конкурс экологических стартапов. Представьте решение для устойчивого развития и получите инвестиции.",
        category: "startup",
        deadline: "2026-01-20T00:00:00Z",
        registrationDeadline: "2026-01-15T23:59:59Z",
        isClosed: true,
        prizes: "Инвестиции до $75,000 + менторство",
        creator: {
            name: "Green Ventures",
            role: "business",
        },
    },
]

const MOCK_USER_PROJECTS: Project[] = [
    {
        id: "p1",
        title: "EduTech Platform",
        shortDesc: "Платформа для онлайн обучения",
        description: "Образовательная платформа с AI",
        stage: "MVP",
        hasMentor: true,
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
 * Student Competitions Page
 * Browse and apply to competitions
 */
export default function StudentCompetitionsPage() {
    const [competitions] = useState<Competition[]>(MOCK_COMPETITIONS)
    const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleCompetitionClick = (competition: Competition) => {
        setSelectedCompetition(competition)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setTimeout(() => setSelectedCompetition(null), 300)
    }

    const handleSubmitApplication = (data: ApplicationData) => {
        console.log("Application submitted:", data)
        // TODO: Send to API
    }

    // Separate active and closed competitions
    const activeCompetitions = competitions.filter((c) => !c.isClosed)
    const closedCompetitions = competitions.filter((c) => c.isClosed)

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-surface-900 mb-2">Конкурсы</h1>
                <p className="text-surface-600">
                    Участвуйте в конкурсах и олимпиадах, развивайте свои навыки и получайте призы
                </p>
            </div>

            {/* Active Competitions */}
            <div>
                <h2 className="text-2xl font-bold text-surface-900 mb-4">
                    Активные конкурсы
                    <span className="ml-2 text-lg font-normal text-surface-600">
                        ({activeCompetitions.length})
                    </span>
                </h2>

                {activeCompetitions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {activeCompetitions.map((competition) => (
                            <CompetitionCard
                                key={competition.id}
                                competition={competition}
                                onClick={() => handleCompetitionClick(competition)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-surface-50 rounded-2xl border border-surface-200">
                        <div className="text-6xl mb-4">📅</div>
                        <h3 className="text-xl font-semibold text-surface-900 mb-2">
                            Нет активных конкурсов
                        </h3>
                        <p className="text-surface-600">
                            Следите за обновлениями, скоро появятся новые конкурсы!
                        </p>
                    </div>
                )}
            </div>

            {/* Closed Competitions */}
            {closedCompetitions.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold text-surface-900 mb-4">
                        Завершенные конкурсы
                        <span className="ml-2 text-lg font-normal text-surface-600">
                            ({closedCompetitions.length})
                        </span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {closedCompetitions.map((competition) => (
                            <CompetitionCard
                                key={competition.id}
                                competition={competition}
                                onClick={() => handleCompetitionClick(competition)}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Competition Modal */}
            <CompetitionModal
                competition={selectedCompetition}
                userProjects={MOCK_USER_PROJECTS}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmitApplication}
            />
        </div>
    )
}
