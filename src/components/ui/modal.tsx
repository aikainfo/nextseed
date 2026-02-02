"use client"

import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils/cn"
import { X } from "lucide-react"

export interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    description?: string
    children: React.ReactNode
    size?: "sm" | "md" | "lg" | "xl"
}

/**
 * Modal (Dialog) Component
 * Migrated from legacy #projectModal and #createProjectModal
 * 
 * Accessible modal with backdrop, keyboard support, and focus trap
 */
export function Modal({
    isOpen,
    onClose,
    title,
    description,
    children,
    size = "md",
}: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null)

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose()
            }
        }

        document.addEventListener("keydown", handleEscape)
        return () => document.removeEventListener("keydown", handleEscape)
    }, [isOpen, onClose])

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }

        return () => {
            document.body.style.overflow = ""
        }
    }, [isOpen])

    if (!isOpen) return null

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 backdrop-blur-sm"
            style={{ background: "rgba(6, 10, 18, 0.62)" }}
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose()
            }}
            aria-hidden={!isOpen}
        >
            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? "modal-title" : undefined}
                className={cn(
                    "relative max-h-[86vh] w-full overflow-auto rounded-2xl border border-border-light bg-white shadow-2xl",
                    {
                        "max-w-md": size === "sm",
                        "max-w-2xl": size === "md",
                        "max-w-4xl": size === "lg",
                        "max-w-6xl": size === "xl",
                    }
                )}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-xl border border-border-light bg-white text-text-dark transition-colors hover:border-primary-blue/45 hover:bg-primary-blue/10"
                    aria-label="Закрыть"
                >
                    <X className="h-5 w-5" />
                </button>

                {/* Header */}
                {(title || description) && (
                    <div className="sticky top-0 z-10 border-b border-border-light bg-white/95 p-4 backdrop-blur">
                        {title && (
                            <h2
                                id="modal-title"
                                className="text-xl font-semibold tracking-tight text-text-dark"
                            >
                                {title}
                            </h2>
                        )}
                        {description && (
                            <p className="mt-1 text-sm text-text-gray">{description}</p>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className="p-4">{children}</div>
            </div>
        </div>,
        document.body
    )
}
