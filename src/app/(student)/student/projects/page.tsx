"use client"

import { useState } from "react"
import { ProjectCard, type Project } from "@/components/student/ProjectCard"
import { ProjectModal, type Review } from "@/components/student/ProjectModal"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Search } from "lucide-react"

// Temporary mock data - will be replaced with API calls
const MOCK_PROJECTS: Project[] = [
    {
        id: "1",
        title: "EduTech Platform",
        shortDesc: "Платформа для онлайн обучения с AI-ассистентом",
        description: "Инновационная образовательная платформа, которая использует искусственный интеллект для персонализации обучения. Студенты получают индивидуальные рекомендации и адаптивные курсы.",
        stage: "MVP",
        hasMentor: true,
        mentorName: "Алексей Иванов",
        hasInvestors: true,
        investment: 50000,
        githubUrl: "https://github.com/example/edutech",
        pitchDeckUrl: "https://example.com/pitch.pdf",
        participations: "TechCrunch Disrupt 2025, Startup Weekend Almaty",
        victories: "1 место на Startup Weekend, грант $10k от Astana Hub",
        owner: {
            name: "Айнур Касымова",
            type: "team",
            teamName: "EduTech Innovators",
        },
        averageRating: 4.5,
        reviewCount: 8,
    },
    {
        id: "2",
        title: "GreenCity App",
        shortDesc: "Мобильное приложение для экологичного образа жизни",
        description: "Приложение помогает пользователям отслеживать свой углеродный след, находить экологичные места и участвовать в зеленых инициативах.",
        stage: "Идея",
        hasMentor: false,
        hasInvestors: false,
        investment: 0,
        pitchVideoUrl: "https://youtube.com/watch?v=example",
        owner: {
            name: "Дмитрий Петров",
            type: "individual",
        },
        averageRating: 4.0,
        reviewCount: 3,
    },
    {
        id: "3",
        title: "FinTrack",
        shortDesc: "Умный финансовый трекер для студентов",
        description: "Приложение для управления личными финансами с фокусом на студентов. Помогает планировать бюджет, отслеживать расходы и копить на цели.",
        stage: "Масштабирование",
        hasMentor: true,
        mentorName: "Мария Сидорова",
        hasInvestors: true,
        investment: 100000,
        githubUrl: "https://github.com/example/fintrack",
        pitchDeckUrl: "https://example.com/fintrack-pitch.pdf",
        participations: "FinTech Hackathon 2025",
        victories: "2 место на FinTech Hackathon, инвестиции от Angel Investors",
        owner: {
            name: "Команда FinTrack",
            type: "team",
            teamName: "FinTrack Team",
        },
        averageRating: 4.8,
        reviewCount: 12,
    },
]

const MOCK_REVIEWS: Record<string, Review[]> = {
    "1": [
        {
            id: "r1",
            author: {
                name: "Алексей Иванов",
                role: "mentor",
            },
            rating: 5,
            content: "Отличный проект с большим потенциалом! Команда показывает высокий уровень профессионализма и готовности к развитию.",
            createdAt: "2025-01-15T10:00:00Z",
        },
        {
            id: "r2",
            author: {
                name: "Tech Ventures",
                role: "business",
                companyName: "Tech Ventures LLC",
            },
            rating: 4,
            content: "Интересная идея с хорошей реализацией. Рекомендуем доработать монетизацию.",
            createdAt: "2025-01-20T14:30:00Z",
        },
    ],
}

type SortOption = "newest" | "popular" | "rating"

/**
 * Student Projects Page
 * Browse all student projects with search and filters
 */
export default function StudentProjectsPage() {
    const [projects] = useState<Project[]>(MOCK_PROJECTS)
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState<SortOption>("newest")

    // Filter and sort projects
    const filteredProjects = projects
        .filter((project) => {
            const query = searchQuery.toLowerCase()
            return (
                project.title.toLowerCase().includes(query) ||
                project.description.toLowerCase().includes(query) ||
                project.stage.toLowerCase().includes(query)
            )
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "popular":
                    return (b.reviewCount || 0) - (a.reviewCount || 0)
                case "rating":
                    return (b.averageRating || 0) - (a.averageRating || 0)
                case "newest":
                default:
                    return 0 // In real app, would sort by createdAt
            }
        })

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setTimeout(() => setSelectedProject(null), 300)
    }

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-surface-900 mb-2">Проекты студентов</h1>
                <p className="text-surface-600">
                    Исследуйте инновационные проекты от студентов и команд
                </p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-surface-400" />
                    <Input
                        type="text"
                        placeholder="Поиск проектов..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>

                {/* Sort */}
                <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="sm:w-48"
                >
                    <option value="newest">Новизна</option>
                    <option value="popular">Популярность</option>
                    <option value="rating">Рейтинг</option>
                </Select>
            </div>

            {/* Results Count */}
            <div className="text-sm text-surface-600">
                Найдено проектов: <span className="font-semibold">{filteredProjects.length}</span>
            </div>

            {/* Projects Grid */}
            {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onClick={() => handleProjectClick(project)}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-surface-900 mb-2">
                        Проекты не найдены
                    </h3>
                    <p className="text-surface-600">
                        Попробуйте изменить параметры поиска
                    </p>
                </div>
            )}

            {/* Project Modal */}
            <ProjectModal
                project={selectedProject}
                reviews={selectedProject ? MOCK_REVIEWS[selectedProject.id] || [] : []}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    )
}
