import { cn } from "@/lib/utils/cn"
import { PROJECT_STATUSES } from "@/lib/utils/constants"
import type { ProjectStatus } from "@/types"
import { ReactNode } from "react"

export interface BadgeProps {
    status?: ProjectStatus
    variant?: "default" | "secondary" | "outline" | "success" | "warning" | "error"
    className?: string
    children?: ReactNode
}

/**
 * Badge component for project status and general use
 * Migrated from legacy .badge, .badge--idea, .badge--mvp, .badge--active styles
 */
export function Badge({ status, variant = "default", className, children }: BadgeProps) {
    // If status is provided, use it for label and styling
    const label = status ? PROJECT_STATUSES[status].label : children

    return (
        <span
            className={cn(
                // Base styles
                "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium border",

                // Status-specific colors (legacy support)
                status && {
                    "bg-blue-100 text-blue-700 border-blue-200": status === "idea",
                    "bg-yellow-100 text-yellow-700 border-yellow-200": status === "mvp",
                    "bg-green-100 text-green-700 border-green-200": status === "active",
                },

                // Variant-based colors (new)
                !status && {
                    "bg-surface-100 text-surface-700 border-surface-200": variant === "default",
                    "bg-surface-50 text-surface-600 border-surface-200": variant === "secondary",
                    "bg-transparent text-surface-700 border-surface-300": variant === "outline",
                    "bg-green-100 text-green-700 border-green-200": variant === "success",
                    "bg-amber-100 text-amber-700 border-amber-200": variant === "warning",
                    "bg-red-100 text-red-700 border-red-200": variant === "error",
                },

                className
            )}
        >
            {label}
        </span>
    )
}
