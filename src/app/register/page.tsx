"use client"

import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, User, Users, Briefcase, GraduationCap } from "lucide-react"
import { StepForm } from "@/components/ui/step-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Radio } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"

function RegisterContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const roleFromParams = searchParams.get("role") || "student"
    const [role, setRole] = useState(roleFromParams)

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
        participatedWhere: "",
        expertise: "",
        companyName: "",
        interests: ""
    })

    const updateField = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleComplete = async () => {
        if (formData.password !== formData.confirmPassword) {
            alert("Пароли не совпадают")
            return
        }

        console.log("🔵 [UI] Submitting registration:", formData)

        try {
            const controller = new AbortController()
            const timeout = setTimeout(() => controller.abort(), 20000)
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, role }),
                credentials: "include",
                signal: controller.signal,
            }).finally(() => clearTimeout(timeout))

            const data = await response.json()

            if (data.success) {
                console.log("✅ [UI] Registration successful! Redirecting to dashboard...")
                // Manual redirect for reliability
                window.location.href = data.redirectUrl || `/${role}`
            } else {
                console.error("❌ [UI] Registration failed:", data.error)
                alert("Ошибка регистрации: " + data.error)
            }
        } catch (error) {
            console.error("❌ [UI] Network error:", error)
            alert("Ошибка сети или таймаут. Попробуйте снова.")
        }
    }

    // Role selection if needed (though it should be passed from role-select)
    const roleInfo = {
        student: { title: "Ученик", icon: GraduationCap },
        mentor: { title: "Ментор", icon: Users },
        business: { title: "Бизнес / Инвестор", icon: Briefcase }
    }

    if (role === "student") {
        return (
            <StepForm
                steps={[
                    {
                        title: "Основная информация",
                        description: "Расскажите о себе",
                        content: (
                            <div className="space-y-4">
                                <Input label="Имя и фамилия" placeholder="Иван Иванов" value={formData.name} onChange={(e) => updateField("name", e.target.value)} required />
                                <Input label="Email" type="email" placeholder="ivan@example.com" value={formData.email} onChange={(e) => updateField("email", e.target.value)} required />
                                <Input label="Пароль" type="password" placeholder="••••••••" value={formData.password} onChange={(e) => updateField("password", e.target.value)} required />
                                <Input label="Подтвердите пароль" type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={(e) => updateField("confirmPassword", e.target.value)} required />
                            </div>
                        ),
                    },
                    {
                        title: "Тип аккаунта",
                        description: "Вы регистрируетесь как индивидуальный участник или команда?",
                        content: (
                            <div className="space-y-4">
                                <Radio label="Индивидуальный участник" name="accountType" checked={formData.accountType === "individual"} onChange={() => updateField("accountType", "individual")} />
                                <Radio label="Команда" name="accountType" checked={formData.accountType === "team"} onChange={() => updateField("accountType", "team")} />

                                {formData.accountType === "team" && (
                                    <div className="mt-4 animate-in slide-in-from-top-2">
                                        <Input label="Название команды" placeholder="SuperTeam 2025" value={formData.teamName} onChange={(e) => updateField("teamName", e.target.value)} required />
                                        <div className="mt-2">
                                            <label className="mb-2 block text-sm font-semibold text-surface-900">Участники команды (имена)</label>
                                            <Textarea placeholder="Иван, Мария, Пётр..." value={formData.teamMembers} onChange={(e) => updateField("teamMembers", e.target.value)} rows={2} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ),
                    },
                    {
                        title: "Ментор и опыт",
                        description: "Есть ли у вас ментор?",
                        content: (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-surface-900">Есть ли у вас ментор?</label>
                                    <div className="flex gap-4">
                                        <Radio label="Нет" name="hasMentor" checked={formData.hasMentor === "no"} onChange={() => updateField("hasMentor", "no")} />
                                        <Radio label="Да" name="hasMentor" checked={formData.hasMentor === "yes"} onChange={() => updateField("hasMentor", "yes")} />
                                    </div>
                                </div>

                                {formData.hasMentor === "yes" && (
                                    <div className="space-y-3 animate-in fade-in duration-300">
                                        <Input label="Имя ментора" placeholder="Асхат Жумабаев" value={formData.mentorName} onChange={(e) => updateField("mentorName", e.target.value)} />
                                        <Input label="Email ментора" type="email" placeholder="mentor@example.com" value={formData.mentorEmail} onChange={(e) => updateField("mentorEmail", e.target.value)} />
                                    </div>
                                )}

                                <div className="mt-4">
                                    <label className="mb-2 block text-sm font-semibold text-surface-900">Где вы участвовали раньше? (конкурсы, стартапы)</label>
                                    <Textarea placeholder="FIRST Robotics, Technovation..." value={formData.participatedWhere} onChange={(e) => updateField("participatedWhere", e.target.value)} rows={3} />
                                </div>
                            </div>
                        ),
                    },
                    {
                        title: "О себе",
                        description: "Завершите регистрацию",
                        content: (
                            <div className="space-y-4">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-surface-900">Био или интересы</label>
                                    <Textarea placeholder="Я разрабатываю проекты на Python..." value={formData.bio} onChange={(e) => updateField("bio", e.target.value)} rows={4} />
                                </div>
                                <p className="text-xs text-surface-500 italic">
                                    После регистрации вы сможете изменить тип аккаунта на командный в личном кабинете.
                                </p>
                            </div>
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
                        title: "Регистрация Ментора",
                        description: "Ваши личные данные",
                        content: (
                            <div className="space-y-4">
                                <Input label="Имя и фамилия" placeholder="Асхат Жумабаев" value={formData.name} onChange={(e) => updateField("name", e.target.value)} required />
                                <Input label="Email" type="email" placeholder="askhat@example.com" value={formData.email} onChange={(e) => updateField("email", e.target.value)} required />
                                <Input label="Пароль" type="password" placeholder="••••••••" value={formData.password} onChange={(e) => updateField("password", e.target.value)} required />
                                <Input label="Подтвердите пароль" type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={(e) => updateField("confirmPassword", e.target.value)} required />
                            </div>
                        ),
                    },
                    {
                        title: "Опыт Ментора",
                        description: "Расскажите о вашей экспертизе",
                        content: (
                            <div className="space-y-4">
                                <Input label="Сферы экспертизы" placeholder="AI, Fintech, Web Development" value={formData.expertise} onChange={(e) => updateField("expertise", e.target.value)} />
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-surface-900">Уже ведете команды? (Укажите название или почту)</label>
                                    <Input placeholder="InnoTeam (inno@email.com)" value={formData.teamName} onChange={(e) => updateField("teamName", e.target.value)} />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-surface-900">Кратко о вашем опыте</label>
                                    <Textarea placeholder="5 лет в стартапах, помог 10+ командам..." value={formData.bio} onChange={(e) => updateField("bio", e.target.value)} rows={4} />
                                </div>
                            </div>
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
                        title: "Бизнес Аккаунт",
                        description: "Основная информация",
                        content: (
                            <div className="space-y-4">
                                <Input label="Контактное лицо" placeholder="Игорь Бизнесменов" value={formData.name} onChange={(e) => updateField("name", e.target.value)} required />
                                <Input label="Email" type="email" placeholder="invest@nextseed.com" value={formData.email} onChange={(e) => updateField("email", e.target.value)} required />
                                <Input label="Пароль" type="password" placeholder="••••••••" value={formData.password} onChange={(e) => updateField("password", e.target.value)} required />
                                <Input label="Подтвердите пароль" type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={(e) => updateField("confirmPassword", e.target.value)} required />
                            </div>
                        ),
                    },
                    {
                        title: "Данные Компании",
                        description: "Как вы будете инвестировать?",
                        content: (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-surface-900">Тип регистрации</label>
                                    <div className="flex gap-4">
                                        <Radio label="Индивидуальный" name="accountType" checked={formData.accountType === "individual"} onChange={() => updateField("accountType", "individual")} />
                                        <Radio label="Организация" name="accountType" checked={formData.accountType === "team"} onChange={() => updateField("accountType", "team")} />
                                    </div>
                                </div>

                                {formData.accountType === "team" && (
                                    <Input label="Название организации" placeholder="Venture Cap" value={formData.companyName} onChange={(e) => updateField("companyName", e.target.value)} required />
                                )}

                                <Input label="Интересы (сферы)" placeholder="EdTech, Robotics, SaaS" value={formData.interests} onChange={(e) => updateField("interests", e.target.value)} />
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-surface-900">Описание деятельности</label>
                                    <Textarea placeholder="Мы ищем pre-seed стартапы в Казахстане..." value={formData.bio} onChange={(e) => updateField("bio", e.target.value)} rows={4} />
                                </div>
                            </div>
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
