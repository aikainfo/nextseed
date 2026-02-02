"use client"

import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { StepForm } from "@/components/ui/step-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Radio } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"

function RegisterContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const role = searchParams.get("role") || "student"

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        accountType: "individual" as "individual" | "team",
        hasMentor: "no" as "yes" | "no",
        mentorName: "",
        mentorEmail: "",
        bio: "",
        teamName: "",
        teamMembers: "",
        competitions: "",
    })

    const updateField = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleComplete = async () => {
        console.log("🔵 [UI] Submitting registration:", formData)

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, role }),
            })

            const data = await response.json()

            if (data.success) {
                console.log("✅ [UI] Registration successful! Redirecting to:", data.redirectUrl)
                window.location.href = data.redirectUrl
            } else {
                console.error("❌ [UI] Registration failed:", data.error)
                alert("Ошибка регистрации: " + data.error)
            }
        } catch (error) {
            console.error("❌ [UI] Network error:", error)
            alert("Ошибка сети. Попробуйте снова.")
        }
    }

    if (role === "student") {
        return (
            <StepForm
                steps={[
                    {
                        title: "Основная информация",
                        description: "Расскажите о себе",
                        content: (
                            <>
                                <Input label="Имя и фамилия" placeholder="Иван Иванов" value={formData.name} onChange={(e) => updateField("name", e.target.value)} required />
                                <Input label="Email" type="email" placeholder="ivan@example.com" value={formData.email} onChange={(e) => updateField("email", e.target.value)} required />
                                <Input label="Пароль" type="password" placeholder="••••••••" value={formData.password} onChange={(e) => updateField("password", e.target.value)} required />
                                <Input label="Подтвердите пароль" type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={(e) => updateField("confirmPassword", e.target.value)} required />
                            </>
                        ),
                    },
                    {
                        title: "Тип аккаунта",
                        description: "Вы регистрируетесь как индивидуальный участник или команда?",
                        content: (
                            <div className="space-y-4">
                                <Radio label="Индивидуальный участник" name="accountType" checked={formData.accountType === "individual"} onChange={() => updateField("accountType", "individual")} />
                                <Radio label="Команда" name="accountType" checked={formData.accountType === "team"} onChange={() => updateField("accountType", "team")} />
                            </div>
                        ),
                    },
                    {
                        title: "Ментор",
                        description: "Есть ли у вас ментор?",
                        content: (
                            <div className="space-y-4">
                                <Radio label="Нет, я ищу ментора" name="hasMentor" checked={formData.hasMentor === "no"} onChange={() => updateField("hasMentor", "no")} />
                                <Radio label="Да, у меня есть ментор" name="hasMentor" checked={formData.hasMentor === "yes"} onChange={() => updateField("hasMentor", "yes")} />
                                {formData.hasMentor === "yes" && (
                                    <>
                                        <Input label="Имя ментора" placeholder="Асхат Жумабаев" value={formData.mentorName} onChange={(e) => updateField("mentorName", e.target.value)} />
                                        <Input label="Email ментора" type="email" placeholder="mentor@example.com" value={formData.mentorEmail} onChange={(e) => updateField("mentorEmail", e.target.value)} />
                                    </>
                                )}
                            </div>
                        ),
                    },
                    {
                        title: "О себе",
                        description: "Расскажите немного о себе и своих интересах",
                        content: (
                            <>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-surface-900">Краткая биография</label>
                                    <Textarea placeholder="Я увлекаюсь программированием и робототехникой..." value={formData.bio} onChange={(e) => updateField("bio", e.target.value)} rows={4} />
                                </div>
                                {formData.accountType === "team" && (
                                    <>
                                        <Input label="Название команды" placeholder="InnoTech" value={formData.teamName} onChange={(e) => updateField("teamName", e.target.value)} />
                                        <Input label="Участники команды" placeholder="Иван, Мария, Асель" value={formData.teamMembers} onChange={(e) => updateField("teamMembers", e.target.value)} />
                                    </>
                                )}
                                <Input label="Участие в конкурсах (необязательно)" placeholder="FIRST Robotics 2025, Technovation Girls" value={formData.competitions} onChange={(e) => updateField("competitions", e.target.value)} />
                            </>
                        ),
                    },
                ]}
                onComplete={handleComplete}
            />
        )
    }

    if (role === "mentor") {
        return (
            <StepForm
                steps={[
                    {
                        title: "Основная информация",
                        description: "Расскажите о себе",
                        content: (
                            <>
                                <Input label="Имя и фамилия" placeholder="Асхат Жумабаев" value={formData.name} onChange={(e) => updateField("name", e.target.value)} required />
                                <Input label="Email" type="email" placeholder="askhat@example.com" value={formData.email} onChange={(e) => updateField("email", e.target.value)} required />
                                <Input label="Пароль" type="password" placeholder="••••••••" value={formData.password} onChange={(e) => updateField("password", e.target.value)} required />
                                <Input label="Подтвердите пароль" type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={(e) => updateField("confirmPassword", e.target.value)} required />
                            </>
                        ),
                    },
                    {
                        title: "Профессиональная информация",
                        description: "Ваш опыт и экспертиза",
                        content: (
                            <>
                                <Input label="Должность" placeholder="Senior Software Engineer" value={formData.bio} onChange={(e) => updateField("bio", e.target.value)} />
                                <Input label="Компания" placeholder="Tech Corp" value={formData.teamName} onChange={(e) => updateField("teamName", e.target.value)} />
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-surface-900">Области экспертизы</label>
                                    <Textarea placeholder="AI, Machine Learning, Web Development" value={formData.teamMembers} onChange={(e) => updateField("teamMembers", e.target.value)} rows={3} />
                                </div>
                            </>
                        ),
                    },
                ]}
                onComplete={handleComplete}
            />
        )
    }

    if (role === "business") {
        return (
            <StepForm
                steps={[
                    {
                        title: "Основная информация",
                        description: "Информация о компании",
                        content: (
                            <>
                                <Input label="Название компании" placeholder="TechInvest KZ" value={formData.name} onChange={(e) => updateField("name", e.target.value)} required />
                                <Input label="Email" type="email" placeholder="info@techinvest.kz" value={formData.email} onChange={(e) => updateField("email", e.target.value)} required />
                                <Input label="Пароль" type="password" placeholder="••••••••" value={formData.password} onChange={(e) => updateField("password", e.target.value)} required />
                                <Input label="Подтвердите пароль" type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={(e) => updateField("confirmPassword", e.target.value)} required />
                            </>
                        ),
                    },
                    {
                        title: "О компании",
                        description: "Расскажите о вашем бизнесе",
                        content: (
                            <>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-surface-900">Описание компании</label>
                                    <Textarea placeholder="Мы инвестируем в перспективные стартапы..." value={formData.bio} onChange={(e) => updateField("bio", e.target.value)} rows={4} />
                                </div>
                                <Input label="Сфера интересов" placeholder="EdTech, AI, Green Tech" value={formData.teamMembers} onChange={(e) => updateField("teamMembers", e.target.value)} />
                            </>
                        ),
                    },
                ]}
                onComplete={handleComplete}
            />
        )
    }

    return null
}

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-brand-50/30 to-sky-50/30 py-12 px-4">
            <div className="container mx-auto max-w-2xl">
                <Link href="/role-select" className="inline-flex items-center gap-2 text-surface-600 hover:text-surface-900 transition-colors mb-8">
                    <ArrowLeft className="h-5 w-5" />
                    <span className="font-medium">Назад к выбору роли</span>
                </Link>

                <Card variant="bento" className="p-8">
                    <Suspense fallback={<div>Загрузка...</div>}>
                        <RegisterContent />
                    </Suspense>
                </Card>

                <div className="text-center mt-8">
                    <p className="text-surface-600">
                        Уже есть аккаунт?{" "}
                        <Link href="/login" className="font-semibold text-brand-600 hover:text-brand-700 underline">
                            Войти
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
