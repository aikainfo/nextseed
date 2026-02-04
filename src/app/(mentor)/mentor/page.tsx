"use client"

import React, { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MentorProjectList } from "@/components/mentor/mentor-project-list"
import { MentorReviewModal } from "@/components/mentor/mentor-review-modal"
import { MentorCompetitionCard } from "@/components/mentor/mentor-competition-card"
import { MentorCompetitionModal } from "@/components/mentor/mentor-competition-modal"
import { MentorCompetitionCreateModal } from "@/components/mentor/mentor-competition-create-modal"
import { MentorTeamCard } from "@/components/mentor/mentor-team-card"
import { MentorTeamModal } from "@/components/mentor/mentor-team-modal"
import { ProjectDetailsModal } from "@/components/projects/project-modal"
import { MOCK_COMPETITIONS, MOCK_PROJECTS } from "@/lib/mock-data"
import { MOCK_TEAMS_NEED_MENTOR } from "@/lib/mentor-mock"
import { Bell, FolderKanban, Trophy, Users } from "lucide-react"

type DashboardTab = "projects" | "competitions" | "teams"

const computeRating = (reviews: any[] = []) => {
    if (reviews.length === 0) return 0
    const total = reviews.reduce((sum, r) => sum + (r.rating || 0), 0)
    return total / reviews.length
}

export default function MentorDashboardPage() {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<DashboardTab>("projects")
    const [user, setUser] = useState<any>(null)
    const [projects, setProjects] = useState<any[]>([])
    const [competitions, setCompetitions] = useState<any[]>([])
    const [teams] = useState<any[]>(MOCK_TEAMS_NEED_MENTOR)
    const [registeredCompetitions, setRegisteredCompetitions] = useState<string[]>([])
    const [contactedTeams, setContactedTeams] = useState<string[]>([])

    const [selectedProject, setSelectedProject] = useState<any>(null)
    const [selectedCompetition, setSelectedCompetition] = useState<any>(null)
    const [selectedTeam, setSelectedTeam] = useState<any>(null)

    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
    const [isCompetitionModalOpen, setIsCompetitionModalOpen] = useState(false)
    const [isCreateCompetitionOpen, setIsCreateCompetitionOpen] = useState(false)
    const [isTeamModalOpen, setIsTeamModalOpen] = useState(false)

    const [submittingReview, setSubmittingReview] = useState(false)

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch("/api/user/profile")
                if (res.status === 401) {
                    router.push("/login")
                    return
                }
                if (res.ok) {
                    const data = await res.json()
                    if (data.user?.role !== "mentor") {
                        router.push("/login")
                        return
                    }
                    setUser(data.user)
                }
            } catch (error) {
                console.error("Failed to load user:", error)
            }
        }
        fetchUser()
    }, [router])

    useEffect(() => {
        async function fetchProjects() {
            try {
                const res = await fetch("/api/mentor/projects")
                if (res.ok) {
                    const data = await res.json()
                    if (data.projects?.length) {
                        const enriched = data.projects.map((p: any) => ({
                            ...p,
                            isMock: false,
                            rating: p.rating ?? computeRating(p.reviews || []),
                            reviewCount: p.reviewCount ?? (p.reviews?.length || 0),
                        }))
                        setProjects(enriched)
                        return
                    }
                }
            } catch (error) {
                console.error("Failed to load projects:", error)
            }

            const fallback = MOCK_PROJECTS.map((p) => ({
                ...p,
                isMock: true,
                rating: p.rating ?? computeRating(p.reviews || []),
                reviewCount: p.reviewCount ?? (p.reviews?.length || 0),
            }))
            setProjects(fallback)
        }

        fetchProjects()
        setCompetitions(MOCK_COMPETITIONS.map((c) => ({ ...c, isOwner: false })))
    }, [])

    const openProjectDetails = (projectId: string) => {
        const project = projects.find((p) => p.id === projectId)
        setSelectedProject(project)
        setIsProjectModalOpen(true)
    }

    const openReviewModal = (projectId: string) => {
        const project = projects.find((p) => p.id === projectId)
        setSelectedProject(project)
        setIsReviewModalOpen(true)
    }

    const handleSubmitReview = async (data: { rating: number; content: string }) => {
        if (!selectedProject) return
        setSubmittingReview(true)
        try {
            if (selectedProject.isMock) {
                const newReview = {
                    id: `local-${Date.now()}`,
                    author: { name: user?.name || "Ментор", role: "mentor" },
                    rating: data.rating,
                    content: data.content,
                    createdAt: new Date().toISOString(),
                }

                setProjects((prev) =>
                    prev.map((p) => {
                        if (p.id !== selectedProject.id) return p
                        const reviews = [...(p.reviews || []), newReview]
                        const rating = computeRating(reviews)
                        return {
                            ...p,
                            reviews,
                            rating,
                            reviewCount: reviews.length,
                        }
                    })
                )
                return
            }

            const res = await fetch("/api/mentor/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    projectId: selectedProject.id,
                    rating: data.rating,
                    content: data.content,
                }),
            })

            if (res.ok) {
                const { review } = await res.json()
                setProjects((prev) =>
                    prev.map((p) => {
                        if (p.id !== selectedProject.id) return p
                        const reviews = [...(p.reviews || []), review]
                        const rating = computeRating(reviews)
                        return {
                            ...p,
                            reviews,
                            rating,
                            reviewCount: reviews.length,
                        }
                    })
                )
            } else {
                console.error("Review submit failed")
            }
        } catch (error) {
            console.error("Review submit failed:", error)
        } finally {
            setSubmittingReview(false)
        }
    }

    const handleOpenCompetition = (competitionId: string) => {
        const competition = competitions.find((c) => c.id === competitionId)
        setSelectedCompetition(competition)
        setIsCompetitionModalOpen(true)
    }

    const handleRegisterCompetition = async (formData: any) => {
        if (!selectedCompetition) return
        setRegisteredCompetitions((prev) => [...new Set([...prev, selectedCompetition.id])])
    }

    const handleCreateCompetition = (data: any) => {
        const created = {
            id: `mc-${Date.now()}`,
            ...data,
            deadline: data.deadline || new Date().toISOString(),
            creator: { user: { name: user?.name || "Вы" } },
            isOwner: true,
        }
        setCompetitions((prev) => [created, ...prev])
    }

    const handleContactTeam = (teamId: string) => {
        const team = teams.find((t) => t.id === teamId)
        setSelectedTeam(team)
        setIsTeamModalOpen(true)
    }

    const handleSendTeamMessage = async () => {
        if (!selectedTeam) return
        setContactedTeams((prev) => [...new Set([...prev, selectedTeam.id])])
    }

    const activeTabLabel = useMemo(() => {
        if (activeTab === "projects") return "Проекты"
        if (activeTab === "competitions") return "Конкурсы"
        return "Команды"
    }, [activeTab])

    return (
        <div className="min-h-screen bg-surface-50/50 pb-20">
            <div className="bg-white border-b border-surface-100 mb-8 sticky top-0 z-20">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-black text-surface-900 flex items-center gap-3">
                                <span className="bg-gradient-to-r from-brand-500 to-sky-500 bg-clip-text text-transparent">
                                    NextSeed
                                </span>{" "}
                                Mentor Hub
                            </h1>
                            <p className="text-surface-500 mt-1 font-medium">
                                Оценивайте проекты, управляйте конкурсами и находите команды
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="relative h-12 w-12 rounded-xl bg-surface-50 text-surface-600 hover:bg-surface-100"
                            >
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                            </Button>
                            <div className="h-10 w-[1px] bg-surface-100 mx-2 hidden md:block"></div>
                            <Link href="/mentor" className="flex items-center gap-3 pl-2">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-bold text-surface-900">
                                        {user?.name || "Ментор"}
                                    </p>
                                    <p className="text-[10px] text-brand-600 font-black uppercase tracking-tighter">
                                        {user?.email || "mentor@nextseed.local"}
                                    </p>
                                </div>
                                <div className="h-12 w-12 rounded-xl bg-brand-100 flex items-center justify-center text-brand-700 font-black border-2 border-white shadow-sm">
                                    {user?.name?.charAt(0) || "M"}
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4">
                    <div className="flex overflow-x-auto no-scrollbar gap-8">
                        {[
                            { id: "projects", label: "Проекты", icon: FolderKanban },
                            { id: "competitions", label: "Конкурсы", icon: Trophy },
                            { id: "teams", label: "Команды", icon: Users },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as DashboardTab)}
                                className={`flex items-center gap-2 py-4 px-1 border-b-2 transition-all font-bold text-sm whitespace-nowrap ${activeTab === tab.id
                                        ? "border-brand-500 text-brand-600"
                                        : "border-transparent text-surface-400 hover:text-surface-600"
                                    }`}
                            >
                                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? "text-brand-500" : ""}`} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black text-surface-900">{activeTabLabel}</h2>
                    {activeTab === "competitions" && (
                        <Button onClick={() => setIsCreateCompetitionOpen(true)}>
                            Создать конкурс
                        </Button>
                    )}
                </div>

                {activeTab === "projects" && (
                    <MentorProjectList projects={projects} onView={openProjectDetails} onReview={openReviewModal} />
                )}

                {activeTab === "competitions" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {competitions.map((competition) => (
                            <MentorCompetitionCard
                                key={competition.id}
                                competition={competition}
                                onView={handleOpenCompetition}
                                onRegister={handleOpenCompetition}
                                isRegistered={registeredCompetitions.includes(competition.id)}
                            />
                        ))}
                    </div>
                )}

                {activeTab === "teams" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {teams.map((team) => (
                            <MentorTeamCard
                                key={team.id}
                                team={team}
                                onContact={handleContactTeam}
                                contacted={contactedTeams.includes(team.id)}
                            />
                        ))}
                    </div>
                )}
            </div>

            <ProjectDetailsModal
                isOpen={isProjectModalOpen}
                onClose={() => setIsProjectModalOpen(false)}
                project={selectedProject}
            />

            <MentorReviewModal
                isOpen={isReviewModalOpen}
                onClose={() => setIsReviewModalOpen(false)}
                project={selectedProject}
                onSubmit={handleSubmitReview}
                isSubmitting={submittingReview}
            />

            <MentorCompetitionModal
                isOpen={isCompetitionModalOpen}
                onClose={() => setIsCompetitionModalOpen(false)}
                competition={selectedCompetition}
                onRegister={handleRegisterCompetition}
                isRegistered={selectedCompetition ? registeredCompetitions.includes(selectedCompetition.id) : false}
            />

            <MentorCompetitionCreateModal
                isOpen={isCreateCompetitionOpen}
                onClose={() => setIsCreateCompetitionOpen(false)}
                onCreate={handleCreateCompetition}
            />

            <MentorTeamModal
                isOpen={isTeamModalOpen}
                onClose={() => setIsTeamModalOpen(false)}
                team={selectedTeam}
                onSend={handleSendTeamMessage}
            />
        </div>
    )
}
