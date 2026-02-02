"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils/cn"

export interface RatingProps {
    value: number
    maxStars?: number
    size?: "sm" | "md" | "lg"
    interactive?: boolean
    onChange?: (rating: number) => void
    showValue?: boolean
    className?: string
}

/**
 * Star Rating Component
 * Display and input star ratings
 */
export function Rating({
    value,
    maxStars = 5,
    size = "md",
    interactive = false,
    onChange,
    showValue = false,
    className,
}: RatingProps) {
    const sizeClasses = {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
    }

    const handleClick = (rating: number) => {
        if (interactive && onChange) {
            onChange(rating)
        }
    }

    return (
        <div className={cn("flex items-center gap-2", className)}>
            <div className="flex items-center gap-0.5">
                {Array.from({ length: maxStars }, (_, i) => {
                    const starValue = i + 1
                    const isFilled = starValue <= value
                    const isPartial = starValue - 0.5 === value

                    return (
                        <button
                            key={i}
                            type="button"
                            onClick={() => handleClick(starValue)}
                            disabled={!interactive}
                            className={cn(
                                "transition-all duration-200",
                                interactive && "cursor-pointer hover:scale-110",
                                !interactive && "cursor-default"
                            )}
                            aria-label={`${starValue} stars`}
                        >
                            <Star
                                className={cn(
                                    sizeClasses[size],
                                    isFilled || isPartial
                                        ? "fill-amber-400 text-amber-400"
                                        : "fill-none text-surface-300"
                                )}
                            />
                        </button>
                    )
                })}
            </div>
            {showValue && (
                <span className="text-sm font-semibold text-surface-700">
                    {value.toFixed(1)}
                </span>
            )}
        </div>
    )
}

/**
 * Rating Display with Count
 * Shows average rating with review count
 */
export interface RatingDisplayProps {
    rating: number
    count: number
    size?: "sm" | "md" | "lg"
    className?: string
}

export function RatingDisplay({
    rating,
    count,
    size = "md",
    className,
}: RatingDisplayProps) {
    return (
        <div className={cn("flex items-center gap-2", className)}>
            <Rating value={rating} size={size} showValue />
            <span className="text-sm text-surface-600">({count})</span>
        </div>
    )
}
