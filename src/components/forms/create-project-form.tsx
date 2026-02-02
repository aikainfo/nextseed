"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { projectSchema, type ProjectFormData } from "@/lib/validations/project"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PROJECT_CATEGORIES, PROJECT_STATUSES } from "@/lib/utils/constants"

export interface CreateProjectFormProps {
    onSubmit: (data: ProjectFormData) => void
    onCancel: () => void
}

/**
 * Create Project Form Component
 * Migrated from #createProjectFormDash
 * 
 * Form for creating new projects with validation
 */
export function CreateProjectForm({ onSubmit, onCancel }: CreateProjectFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            category: "ecology",
            status: "idea",
        },
    })

    const handleFormSubmit = async (data: ProjectFormData) => {
        setIsSubmitting(true)
        try {
            await onSubmit(data)
            reset()
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            {/* Title */}
            <div>
                <label htmlFor="title" className="mb-2 block text-sm font-bold text-text-dark">
                    Название
                </label>
                <Input
                    id="title"
                    type="text"
                    placeholder="Введите название проекта"
                    {...register("title")}
                />
                {errors.title && (
                    <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
                )}
            </div>

            {/* Description */}
            <div>
                <label htmlFor="description" className="mb-2 block text-sm font-bold text-text-dark">
                    Описание
                </label>
                <Textarea
                    id="description"
                    placeholder="Опишите ваш проект"
                    rows={4}
                    {...register("description")}
                />
                {errors.description && (
                    <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
                )}
            </div>

            {/* Category */}
            <div>
                <label htmlFor="category" className="mb-2 block text-sm font-bold text-text-dark">
                    Категория
                </label>
                <select
                    id="category"
                    className="w-full rounded-xl border border-surface-300 bg-white px-4 py-3 text-surface-900 focus:outline-none focus:ring-2 focus:border-brand-500 focus:ring-brand-500/20 transition-all"
                    {...register("category")}
                >
                    {Object.entries(PROJECT_CATEGORIES).map(([value, { label }]) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>
                {errors.category && (
                    <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>
                )}
            </div>

            {/* Status */}
            <div>
                <label htmlFor="status" className="mb-2 block text-sm font-bold text-text-dark">
                    Статус
                </label>
                <select
                    id="status"
                    className="w-full rounded-xl border border-surface-300 bg-white px-4 py-3 text-surface-900 focus:outline-none focus:ring-2 focus:border-brand-500 focus:ring-brand-500/20 transition-all"
                    {...register("status")}
                >
                    {Object.entries(PROJECT_STATUSES).map(([value, { label }]) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>
                {errors.status && (
                    <p className="mt-1 text-sm text-red-500">{errors.status.message}</p>
                )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                    disabled={isSubmitting}
                >
                    Отмена
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Создание..." : "Создать"}
                </Button>
            </div>
        </form>
    )
}
