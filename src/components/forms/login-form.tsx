"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { loginSchema, type LoginFormData } from "@/lib/validations/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { USER_ROLES } from "@/lib/utils/constants"

/**
 * Login Form Component
 * Migrated from role-login.js logic
 * 
 * Handles login for all user roles with validation
 */
export function LoginForm() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            role: "student",
        },
    })

    const onSubmit = async (data: LoginFormData) => {
        setIsSubmitting(true)
        setError(null)

        try {
            // TODO: Replace with actual Better Auth login
            // For now, simulate login with localStorage check
            const storedUser = localStorage.getItem("nextseed.user")

            if (!storedUser) {
                setError("Неверный email или пароль (или профиль не зарегистрирован)")
                return
            }

            const user = JSON.parse(storedUser)

            // Simple validation (in real app, this would be server-side)
            if (user.email !== data.email || user.role !== data.role) {
                setError("Неверный email или пароль (или профиль не зарегистрирован)")
                return
            }

            // Redirect based on role
            if (data.role === "student") {
                router.push("/student")
            } else if (data.role === "mentor") {
                router.push("/mentor")
            } else {
                router.push("/business")
            }
        } catch (err) {
            setError("Произошла ошибка при входе. Попробуйте снова.")
            console.error(err)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                    autoComplete="current-password"
                    {...register("password")}
                />
                {errors.password && (
                    <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
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
                {isSubmitting ? "Вход..." : "Войти"}
            </Button>
        </form>
    )
}
