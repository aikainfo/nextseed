"use client"

import { ReactNode, useState } from "react"
import { Button } from "./button"
import { cn } from "@/lib/utils/cn"
import { Check } from "lucide-react"

export interface StepFormProps {
    steps: {
        title: string
        description?: string
        content: ReactNode
    }[]
    onComplete: () => void | Promise<void>
    onStepChange?: (step: number) => void
}

/**
 * StepForm - Multi-step form component
 * Perfect for registration flows
 */
export function StepForm({ steps, onComplete, onStepChange }: StepFormProps) {
    const [currentStep, setCurrentStep] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const isFirstStep = currentStep === 0
    const isLastStep = currentStep === steps.length - 1

    const handleNext = async () => {
        if (isLastStep) {
            setIsSubmitting(true)
            try {
                await onComplete()
            } finally {
                setIsSubmitting(false)
            }
        } else {
            const nextStep = currentStep + 1
            setCurrentStep(nextStep)
            onStepChange?.(nextStep)
        }
    }

    const handleBack = () => {
        const prevStep = currentStep - 1
        setCurrentStep(prevStep)
        onStepChange?.(prevStep)
    }

    return (
        <div className="w-full max-w-3xl mx-auto">
            {/* Step Indicator */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    {steps.map((step, index) => {
                        const isActive = index === currentStep
                        const isCompleted = index < currentStep

                        return (
                            <div key={index} className="flex items-center flex-1">
                                <div className="flex flex-col items-center flex-1">
                                    {/* Circle */}
                                    <div
                                        className={cn(
                                            "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-200",
                                            isCompleted
                                                ? "border-brand-500 bg-brand-500 text-white"
                                                : isActive
                                                    ? "border-brand-500 bg-white text-brand-500"
                                                    : "border-surface-300 bg-white text-surface-400"
                                        )}
                                    >
                                        {isCompleted ? (
                                            <Check className="h-5 w-5" />
                                        ) : (
                                            <span className="text-sm font-semibold">{index + 1}</span>
                                        )}
                                    </div>
                                    {/* Label */}
                                    <span
                                        className={cn(
                                            "mt-2 text-xs font-medium text-center",
                                            isActive ? "text-brand-600" : "text-surface-500"
                                        )}
                                    >
                                        {step.title}
                                    </span>
                                </div>
                                {/* Line */}
                                {index < steps.length - 1 && (
                                    <div
                                        className={cn(
                                            "h-0.5 flex-1 transition-all duration-200 -mt-8",
                                            isCompleted ? "bg-brand-500" : "bg-surface-200"
                                        )}
                                    />
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Step Content */}
            <div className="bg-white rounded-2xl border border-surface-200 p-8 shadow-card">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-surface-900 mb-2">
                        {steps[currentStep].title}
                    </h2>
                    {steps[currentStep].description && (
                        <p className="text-surface-600">{steps[currentStep].description}</p>
                    )}
                </div>

                <div className="mb-8">{steps[currentStep].content}</div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between gap-4">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={handleBack}
                        disabled={isFirstStep || isSubmitting}
                        className={isFirstStep ? "invisible" : ""}
                    >
                        ← Назад
                    </Button>
                    <Button
                        type="button"
                        onClick={handleNext}
                        disabled={isSubmitting}
                        className="min-w-32"
                    >
                        {isSubmitting ? "Загрузка..." : isLastStep ? "Завершить" : "Далее →"}
                    </Button>
                </div>
            </div>
        </div>
    )
}
