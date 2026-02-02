"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft } from "lucide-react"

/**
 * Login Page
 * User authentication
 */
export default function LoginPage() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false,
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            // TODO: Implement actual authentication
            console.log("Logging in:", formData)
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Mock: redirect based on role (replace with actual logic)
            router.push("/student/projects")
        } catch (error) {
            console.error("Login failed:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-surface-50 via-white to-brand-50/30 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Back Link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-surface-600 hover:text-surface-900 transition-colors mb-8"
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span className="font-medium">На главную</span>
                </Link>

                {/* Login Card */}
                <Card variant="bento" className="p-8">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-surface-900 mb-2">Вход</h1>
                        <p className="text-surface-600">Войдите в свой аккаунт</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            required
                        />

                        <Input
                            label="Пароль"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                            required
                        />

                        <div className="flex items-center justify-between">
                            <Checkbox
                                label="Запомнить меня"
                                checked={formData.remember}
                                onChange={(e) => setFormData(prev => ({ ...prev, remember: e.target.checked }))}
                            />
                            <Link
                                href="/forgot-password"
                                className="text-sm font-medium text-brand-600 hover:text-brand-700"
                            >
                                Забыли пароль?
                            </Link>
                        </div>

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Вход..." : "Войти"}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-surface-600">
                        Нет аккаунта?{" "}
                        <Link href="/role-select" className="font-semibold text-brand-600 hover:text-brand-700">
                            Зарегистрироваться
                        </Link>
                    </div>
                </Card>
            </div>
        </div>
    )
}
