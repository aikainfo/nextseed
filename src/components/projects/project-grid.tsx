"use client"

import { useState } from "react"
import { ProjectCard } from "./project-card"
import type { Project } from "@/types"

export interface ProjectGridProps {
    projects: Project[]
    onProjectClick?: (project: Project) => void
}

/**
 * Project Grid Component
 * Migrated from legacy .projects-grid
 * 
 * Displays projects in a responsive grid with animations
 */
export function ProjectGrid({ projects, onProjectClick }: ProjectGridProps) {
    if (projects.length === 0) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                    <p className="text-lg text-text-gray">Проекты не найдены</p>
                    <p className="mt-2 text-sm text-text-gray">
                        Попробуйте изменить фильтры или поисковый запрос
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
                <div
                    key={project.id}
                    style={{
                        animation: `fadeIn 0.5s ease-out ${index * 0.05}s backwards`,
                    }}
                >
                    <ProjectCard
                        project={project}
                        onClick={() => onProjectClick?.(project)}
                    />
                </div>
            ))}
        </div>
    )
}
