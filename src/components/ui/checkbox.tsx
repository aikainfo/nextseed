import { cn } from "@/lib/utils/cn"
import { InputHTMLAttributes, forwardRef } from "react"

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string
}

/**
 * Checkbox component
 */
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, label, ...props }, ref) => {
        return (
            <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                    <input
                        ref={ref}
                        type="checkbox"
                        className={cn(
                            "peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-surface-300",
                            "transition-all duration-200",
                            "checked:border-brand-500 checked:bg-brand-500",
                            "focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:ring-offset-2",
                            "disabled:cursor-not-allowed disabled:opacity-50",
                            className
                        )}
                        {...props}
                    />
                    <svg
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                {label && (
                    <span className="text-sm text-surface-700 group-hover:text-surface-900 transition-colors select-none">
                        {label}
                    </span>
                )}
            </label>
        )
    }
)

Checkbox.displayName = "Checkbox"

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string
}

/**
 * Radio component
 */
const Radio = forwardRef<HTMLInputElement, RadioProps>(
    ({ className, label, ...props }, ref) => {
        return (
            <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                    <input
                        ref={ref}
                        type="radio"
                        className={cn(
                            "peer h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-surface-300",
                            "transition-all duration-200",
                            "checked:border-brand-500",
                            "focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:ring-offset-2",
                            "disabled:cursor-not-allowed disabled:opacity-50",
                            className
                        )}
                        {...props}
                    />
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-brand-500 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                </div>
                {label && (
                    <span className="text-sm text-surface-700 group-hover:text-surface-900 transition-colors select-none">
                        {label}
                    </span>
                )}
            </label>
        )
    }
)

Radio.displayName = "Radio"

export { Checkbox, Radio }
