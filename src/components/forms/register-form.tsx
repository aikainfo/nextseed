"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { registerSchema, type RegisterFormData } from "@/lib/validations/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { USER_ROLES } from "@/lib/utils/constants"

/**
 * Registration Form Component
 * Migrated from student-registration.html, mentor-registration.html, business-registration.html
 * 
 * Handles registration for all user roles with validation
 */
export function RegisterForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const roleParam = searchParams.get("role") as "student" | "mentor" | "business" | null

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            role: roleParam || "student",
        },
    })

    const onSubmit = async (data: RegisterFormData) => {
        setIsSubmitting(true)
        setError(null)

        try {
            // TODO: Replace with actual Better Auth registration
            // For now, simulate registration with localStorage (backward compatibility)
            const userData = {
                id: crypto.randomUUID(),
                name: data.name,
                email: data.email,
                role: data.role,
                createdAt: new Date().toISOString(),
            }

            // Store in localStorage temporarily
            localStorage.setItem("nextseed.user", JSON.stringify(userData))

            // Redirect based on role
            if (data.role === "student") {
                router.push("/student")
            } else if (data.role === "mentor") {
                router.push("/mentor")
            } else {
                router.push("/business")
            }
        } catch (err) {
            setError("Произошла ошибка при регистрации. Попробуйте снова.")
            console.error(err)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-text-dark">
                    Имя *
                </label>
                <Input
                    id="name"
                    type="text"
                    placeholder="Введите ваше имя"
                    {...register("name")}
                />
                {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                )}
            </div>

            {/* Email Field */}
            <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-text-dark">
                    Email *
                </label>
                <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    autoComplete="email"
                    {...register("email")}
                />
                {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
            </div>

            {/* Password Field */}
            <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-text-dark">
                    Пароль *
                </label>
                <Input
                    id="password"
                    type="password"
                    placeholder="Минимум 6 символов"
                    autoComplete="new-password"
                    {...register("password")}
                />
                {errors.password && (
                    <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                )}
            </div>

            {/* Confirm Password Field */}
            <div>
                <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-text-dark">
                    Подтвердите пароль *
                </label>
                <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Повторите пароль"
                    autoComplete="new-password"
                    {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
                )}
            </div>

            {/* Role Field */}
            <div>
                <label htmlFor="role" className="mb-2 block text-sm font-medium text-text-dark">
                    Роль *
                </label>
                <select
                    id="role"
                    className="w-full rounded-xl border border-surface-300 bg-white px-4 py-3 text-surface-900 focus:outline-none focus:ring-2 focus:border-brand-500 focus:ring-brand-500/20 transition-all"
                    {...register("role")}
                >
                    {Object.entries(USER_ROLES).map(([value, { label }]) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>
                {errors.role && (
                    <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
                    {error}
                </div>
            )}

            {/* Submit Button */}
            <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
            </Button>
        </form>
    )
}
