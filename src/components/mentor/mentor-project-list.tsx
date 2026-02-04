import React, { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Clock, TrendingUp, Star } from "lucide-react"
import { MentorProjectCard } from "./mentor-project-card"

interface MentorProjectListProps {
    projects: any[]
    onView: (projectId: string) => void
    onReview: (projectId: string) => void
}

export const MentorProjectList: React.FC<MentorProjectListProps> = ({
    projects,
    onView,
    onReview,
}) => {
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState<"newest" | "popular" | "rating">("newest")

    const filteredProjects = useMemo(() => {
        return projects
            .filter((p) =>
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .sort((a, b) => {
                if (sortBy === "newest") {
                    return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
                }
                if (sortBy === "popular") return (b.reviewCount || 0) - (a.reviewCount || 0)
                if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0)
                return 0
            })
    }, [projects, searchQuery, sortBy])

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-surface-100">
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                    <Input
                        placeholder="Поиск проектов..."
                        className="pl-10 border-surface-200 focus:border-brand-500 rounded-xl"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    <Button
                        variant={sortBy === "newest" ? "primary" : "ghost"}
                        size="sm"
                        onClick={() => setSortBy("newest")}
                        className="flex items-center gap-2 rounded-xl"
                    >
                        <Clock className="w-4 h-4" />
                        Новинки
                    </Button>
                    <Button
                        variant={sortBy === "popular" ? "primary" : "ghost"}
                        size="sm"
                        onClick={() => setSortBy("popular")}
                        className="flex items-center gap-2 rounded-xl"
                    >
                        <TrendingUp className="w-4 h-4" />
                        Популярные
                    </Button>
                    <Button
                        variant={sortBy === "rating" ? "primary" : "ghost"}
                        size="sm"
                        onClick={() => setSortBy("rating")}
                        className="flex items-center gap-2 rounded-xl"
                    >
                        <Star className="w-4 h-4" />
                        Рейтинг
                    </Button>
                </div>
            </div>

            {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <MentorProjectCard
                            key={project.id}
                            project={project}
                            onView={onView}
                            onReview={onReview}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-surface-50 rounded-3xl border-2 border-dashed border-surface-200">
                    <Search className="w-12 h-12 text-surface-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-surface-900">Проекты не найдены</h3>
                    <p className="text-surface-500">Попробуйте изменить параметры поиска</p>
                </div>
            )}
        </div>
    )
}
