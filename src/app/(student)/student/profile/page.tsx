"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { User, ArrowRightLeft, Settings } from "lucide-react"

export default function StudentProfilePage() {
    const router = useRouter()
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        accountType: "individual",
        teamName: "",
        teamMembers: "",
        hasMentor: "no",
        mentorName: "",
        mentorEmail: "",
        participatedWhere: "",
        bio: "",
    })

    const fetchProfile = async () => {
        try {
            const res = await fetch("/api/user/profile")
            if (res.status === 401) {
                setError("Сессия истекла. Пожалуйста, войдите снова.")
                return
            }
            if (res.ok) {
                const data = await res.json()
                const profile = data.user?.studentProfile
                const hasMentor = profile?.mentorName || profile?.mentorEmail ? "yes" : "no"

                setUser(data.user)
                setFormData({
                    name: data.user?.name || "",
                    email: data.user?.email || "",
                    accountType: profile?.type || (profile?.teamName ? "team" : "individual"),
                    teamName: profile?.teamName || "",
                    teamMembers: profile?.teamMembers || "",
                    hasMentor,
                    mentorName: profile?.mentorName || "",
                    mentorEmail: profile?.mentorEmail || "",
                    participatedWhere: profile?.participatedWhere || "",
                    bio: profile?.bio || "",
                })
            } else {
                setError("Не удалось загрузить профиль. Попробуйте обновить страницу.")
            }
        } catch (error) {
            console.error("Failed to fetch profile:", error)
            setError("Ошибка сети. Проверьте подключение и попробуйте снова.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [])

    const handleSave = async () => {
        setLoading(true)
        try {
            const payload = {
                ...formData,
                mentorName: formData.hasMentor === "yes" ? formData.mentorName : "",
                mentorEmail: formData.hasMentor === "yes" ? formData.mentorEmail : "",
            }

            const res = await fetch("/api/user/update-profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })

            if (res.status === 401) {
                setError("Сессия истекла. Пожалуйста, войдите снова.")
                return
            }
            if (res.ok) {
                const updated = await res.json()
                setUser(updated.user)
                setIsEditing(false)
            } else {
                setError("Не удалось сохранить изменения. Попробуйте еще раз.")
            }
        } catch (error) {
            console.error("Save failed:", error)
            setError("Ошибка сети. Проверьте подключение и попробуйте снова.")
        } finally {
            setLoading(false)
        }
    }

    if (error) {
        return (
            <div className="max-w-xl mx-auto py-16">
                <Card variant="bento">
                    <CardHeader>
                        <CardTitle>Профиль недоступен</CardTitle>
                        <CardDescription>{error}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={() => router.push("/login")}>Войти в аккаунт</Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (loading && !user) {
        return (
            <div className="p-20 text-center text-surface-500 font-medium">
                Загрузка профиля...
            </div>
        )
    }

    const showMentorFields = formData.hasMentor === "yes"

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-surface-900">Личный кабинет</h1>
                    <p className="text-surface-600">Информация из регистрации. Можно редактировать.</p>
                </div>
                <Link href="/student/settings">
                    <Button variant="outline" className="rounded-xl">
                        <Settings className="w-4 h-4 mr-2" /> Настройки
                    </Button>
                </Link>
            </div>

            <Card variant="bento">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5 text-brand-500" /> Профиль ученика
                    </CardTitle>
                    <CardDescription>Данные можно редактировать в любое время</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Имя и фамилия"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            disabled={!isEditing}
                            className={!isEditing ? "bg-surface-50 border-transparent" : ""}
                        />
                        <Input
                            label="Email"
                            value={formData.email}
                            disabled
                            className="bg-surface-50 border-transparent text-surface-400"
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-bold text-surface-900 flex items-center gap-2">
                            <ArrowRightLeft className="w-4 h-4 text-brand-500" /> Тип аккаунта
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => isEditing && setFormData({ ...formData, accountType: "individual" })}
                                className={`p-3 rounded-xl border-2 text-left transition-all ${formData.accountType === "individual"
                                        ? "border-brand-500 bg-brand-50"
                                        : "border-surface-100 hover:border-surface-200"
                                    } ${!isEditing ? "cursor-default opacity-80" : ""}`}
                            >
                                <p className="font-semibold text-surface-900">Индивидуальный</p>
                                <p className="text-xs text-surface-500">Один участник</p>
                            </button>
                            <button
                                type="button"
                                onClick={() => isEditing && setFormData({ ...formData, accountType: "team" })}
                                className={`p-3 rounded-xl border-2 text-left transition-all ${formData.accountType === "team"
                                        ? "border-brand-500 bg-brand-50"
                                        : "border-surface-100 hover:border-surface-200"
                                    } ${!isEditing ? "cursor-default opacity-80" : ""}`}
                            >
                                <p className="font-semibold text-surface-900">Командный</p>
                                <p className="text-xs text-surface-500">Несколько участников</p>
                            </button>
                        </div>
                    </div>

                    {formData.accountType === "team" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Название команды"
                                value={formData.teamName}
                                onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                                disabled={!isEditing}
                                className={!isEditing ? "bg-surface-50 border-transparent" : ""}
                            />
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-surface-900">Участники команды</label>
                                <Textarea
                                    placeholder="Имена участников через запятую"
                                    value={formData.teamMembers}
                                    onChange={(e) => setFormData({ ...formData, teamMembers: e.target.value })}
                                    disabled={!isEditing}
                                    className={!isEditing ? "bg-surface-50 border-transparent" : ""}
                                    rows={2}
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-3">
                        <label className="text-sm font-bold text-surface-900">Есть ли ментор?</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => isEditing && setFormData({ ...formData, hasMentor: "no" })}
                                className={`p-3 rounded-xl border-2 text-left transition-all ${formData.hasMentor === "no"
                                        ? "border-brand-500 bg-brand-50"
                                        : "border-surface-100 hover:border-surface-200"
                                    } ${!isEditing ? "cursor-default opacity-80" : ""}`}
                            >
                                <p className="font-semibold text-surface-900">Нет</p>
                                <p className="text-xs text-surface-500">Ментор не указан</p>
                            </button>
                            <button
                                type="button"
                                onClick={() => isEditing && setFormData({ ...formData, hasMentor: "yes" })}
                                className={`p-3 rounded-xl border-2 text-left transition-all ${formData.hasMentor === "yes"
                                        ? "border-brand-500 bg-brand-50"
                                        : "border-surface-100 hover:border-surface-200"
                                    } ${!isEditing ? "cursor-default opacity-80" : ""}`}
                            >
                                <p className="font-semibold text-surface-900">Да</p>
                                <p className="text-xs text-surface-500">Указать данные ментора</p>
                            </button>
                        </div>
                    </div>

                    {showMentorFields && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Ментор (имя)"
                                value={formData.mentorName}
                                onChange={(e) => setFormData({ ...formData, mentorName: e.target.value })}
                                disabled={!isEditing}
                                className={!isEditing ? "bg-surface-50 border-transparent" : ""}
                            />
                            <Input
                                label="Ментор (email)"
                                value={formData.mentorEmail}
                                onChange={(e) => setFormData({ ...formData, mentorEmail: e.target.value })}
                                disabled={!isEditing}
                                className={!isEditing ? "bg-surface-50 border-transparent" : ""}
                            />
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Где участвовали (если есть)"
                            value={formData.participatedWhere}
                            onChange={(e) => setFormData({ ...formData, participatedWhere: e.target.value })}
                            disabled={!isEditing}
                            className={!isEditing ? "bg-surface-50 border-transparent" : ""}
                        />
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-surface-900">О себе / о команде</label>
                            <Textarea
                                placeholder="Коротко расскажите о себе"
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                disabled={!isEditing}
                                className={!isEditing ? "bg-surface-50 border-transparent" : ""}
                                rows={3}
                            />
                        </div>
                    </div>

                    {isEditing ? (
                        <div className="flex gap-3">
                            <Button
                                variant="ghost"
                                className="flex-1"
                                onClick={() => {
                                    setIsEditing(false)
                                    fetchProfile()
                                }}
                            >
                                Отмена
                            </Button>
                            <Button
                                className="flex-[2] bg-surface-900 text-white hover:bg-black"
                                onClick={handleSave}
                                disabled={loading}
                            >
                                Сохранить изменения
                            </Button>
                        </div>
                    ) : (
                        <Button variant="outline" onClick={() => setIsEditing(true)}>
                            Редактировать
                        </Button>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
