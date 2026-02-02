import { cn } from "@/lib/utils/cn"
import { ButtonHTMLAttributes, forwardRef } from "react"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "outline" | "soft"
    size?: "sm" | "md" | "lg"
}

/**
 * Button component - Updated for new design system
 * Emerald primary, rounded-xl (16px), premium shadows
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    // Base styles - rounded-xl for premium feel
                    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
                    "disabled:pointer-events-none disabled:opacity-50",
                    "active:scale-95", // Micro-interaction

                    // Variant styles
                    {
                        // Primary - ЯРКИЙ градиент!
                        "bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/30 hover:shadow-xl hover:shadow-brand-500/40 hover:from-brand-600 hover:to-brand-700":
                            variant === "primary",

                        // Secondary - Яркий серый
                        "bg-surface-800 text-white hover:bg-surface-900 shadow-md":
                            variant === "secondary",

                        // Ghost - С hover эффектом
                        "bg-transparent hover:bg-brand-50 text-surface-700 hover:text-brand-700":
                            variant === "ghost",

                        // Outline - Яркая рамка
                        "border-2 border-brand-500 text-brand-600 hover:bg-brand-500 hover:text-white shadow-sm":
                            variant === "outline",

                        // Soft - Яркий фон
                        "bg-brand-100 text-brand-700 hover:bg-brand-200 shadow-sm":
                            variant === "soft",
                    },

                    // Size styles
                    {
                        "px-4 py-2 text-sm": size === "sm",
                        "px-6 py-3 text-base": size === "md",
                        "px-8 py-4 text-lg": size === "lg",
                    },

                    className
                )}
                {...props}
            >
                {children}
            </button>
        )
    }
)

Button.displayName = "Button"

export { Button }
