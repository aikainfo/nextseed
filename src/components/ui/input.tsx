import { cn } from "@/lib/utils/cn"
import { InputHTMLAttributes, forwardRef } from "react"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    helperText?: string
}

/**
 * Input component - Updated for new design system
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, type = "text", label, error, helperText, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="mb-2 block text-sm font-semibold text-surface-900">
                        {label}
                        {props.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}
                <input
                    ref={ref}
                    type={type}
                    className={cn(
                        // Base styles
                        "w-full rounded-xl border bg-white px-4 py-3",
                        "text-surface-900 placeholder:text-surface-400",
                        "transition-all duration-200",
                        "focus:outline-none focus:ring-2",
                        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-50",
                        // States
                        error
                            ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                            : "border-surface-300 focus:border-brand-500 focus:ring-brand-500/20",
                        className
                    )}
                    {...props}
                />
                {error && (
                    <p className="mt-1.5 text-sm text-red-600">{error}</p>
                )}
                {helperText && !error && (
                    <p className="mt-1.5 text-sm text-surface-500">{helperText}</p>
                )}
            </div>
        )
    }
)

Input.displayName = "Input"

export { Input }
