import { cn } from "@/lib/utils/cn"
import { SelectHTMLAttributes, forwardRef, ReactNode } from "react"
import { ChevronDown } from "lucide-react"

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string
    error?: string
    helperText?: string
    options?: { value: string; label: string }[]
    children?: ReactNode
}

/**
 * Select component - Modern dropdown
 */
const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, label, error, helperText, options, children, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="mb-2 block text-sm font-semibold text-surface-900">
                        {label}
                        {props.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}
                <div className="relative">
                    <select
                        ref={ref}
                        className={cn(
                            // Base styles
                            "w-full appearance-none rounded-xl border bg-white px-4 py-3 pr-10",
                            "text-surface-900",
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
                    >
                        {options
                            ? options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))
                            : children}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-surface-400 pointer-events-none" />
                </div>
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

Select.displayName = "Select"

export { Select }
