import { cn } from "@/lib/utils/cn"
import { HTMLAttributes, forwardRef } from "react"

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    hover?: boolean
    variant?: "default" | "bento" | "glass"
}

/**
 * Card component - Bento-style for new design system
 * rounded-2xl (24px), premium shadows, smooth hover
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, hover = false, variant = "default", children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    // Base styles - Bento card
                    "rounded-2xl p-6 border transition-all duration-300",

                    // Variant styles
                    {
                        "bg-white border-surface-200 shadow-card": variant === "default",
                        "bg-white border-surface-200 shadow-premium": variant === "bento",
                        "glass": variant === "glass",
                    },

                    // Hover effect
                    {
                        "hover:-translate-y-1 hover:shadow-premium cursor-pointer group":
                            hover,
                    },

                    className
                )}
                {...props}
            >
                {children}
            </div>
        )
    }
)

Card.displayName = "Card"

/**
 * Card Header component
 */
const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn("mb-4", className)}
                {...props}
            />
        )
    }
)

CardHeader.displayName = "CardHeader"

/**
 * Card Title component
 */
const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => {
        return (
            <h3
                ref={ref}
                className={cn("text-xl font-bold text-surface-900", className)}
                {...props}
            />
        )
    }
)

CardTitle.displayName = "CardTitle"

/**
 * Card Description component
 */
const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => {
        return (
            <p
                ref={ref}
                className={cn("text-surface-600 leading-relaxed", className)}
                {...props}
            />
        )
    }
)

CardDescription.displayName = "CardDescription"

/**
 * Card Content component
 */
const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn("", className)}
                {...props}
            />
        )
    }
)

CardContent.displayName = "CardContent"

export { Card, CardHeader, CardTitle, CardDescription, CardContent }
