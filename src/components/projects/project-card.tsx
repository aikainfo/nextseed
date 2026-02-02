import { cn } from "@/lib/utils/cn"
import { PROJECT_CATEGORIES } from "@/lib/utils/constants"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/types"
import { Sprout, Gamepad2, Wrench, Brain } from "lucide-react"

export interface ProjectCardProps {
    project: Project
    onClick?: () => void
}

/**
 * Project Card Component
 * Migrated from legacy .project-card HTML structure
 * 
 * Displays project with category icon, title, description, and status badge
 */
export function ProjectCard({ project, onClick }: ProjectCardProps) {
    // Category icon mapping
    const categoryIcons = {
        ecology: Sprout,
        games: Gamepad2,
        services: Wrench,
        ai: Brain,
    }

    const CategoryIcon = categoryIcons[project.category]

    // Category background colors (from legacy CSS)
    const categoryBg = {
        ecology: "bg-gradient-to-br from-green-400 to-green-600",
        games: "bg-gradient-to-br from-purple-400 to-purple-600",
        services: "bg-gradient-to-br from-orange-400 to-orange-600",
        ai: "bg-gradient-to-br from-blue-400 to-blue-600",
    }

    return (
        <div
            onClick={onClick}
            className={cn(
                "group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300",
                "hover:-translate-y-2 hover:shadow-card-hover",
                "border border-border-light"
            )}
        >
            {/* Category Icon Header */}
            <div className={cn("flex h-32 items-center justify-center", categoryBg[project.category])}>
                <CategoryIcon className="h-16 w-16 text-white" />
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Author */}
                <p className="mb-2 text-sm font-medium text-text-gray">
                    {project.userId}
                </p>

                {/* Title */}
                <h3 className="mb-3 text-xl font-semibold text-text-dark line-clamp-2">
                    {project.title}
                </h3>

                {/* Description */}
                <p className="mb-4 text-sm leading-relaxed text-text-gray line-clamp-3">
                    {project.description}
                </p>

                {/* Status Badge */}
                <div className="flex items-center justify-between">
                    <Badge status={project.status} />
                    <span className="text-xs text-text-gray">
                        {PROJECT_CATEGORIES[project.category].label}
                    </span>
                </div>
            </div>
        </div>
    )
}
