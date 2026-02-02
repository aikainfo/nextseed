import { cn } from "@/lib/utils/cn"
import { getInitials } from "@/lib/utils/format"

export interface AvatarProps {
    name: string
    size?: "sm" | "md" | "lg"
    className?: string
}

/**
 * Avatar component with initials
 * Migrated from legacy .ns-avatar styles
 */
export function Avatar({ name, size = "md", className }: AvatarProps) {
    const initials = getInitials(name)

    return (
        <div
            className={cn(
                // Base styles
                "flex items-center justify-center rounded-full bg-gradient-to-br from-primary-blue to-primary-blue-dark text-white font-semibold",

                // Size variants
                {
                    "h-8 w-8 text-sm": size === "sm",
                    "h-12 w-12 text-base": size === "md",
                    "h-16 w-16 text-xl": size === "lg",
                },

                className
            )}
        >
            {initials}
        </div>
    )
}
