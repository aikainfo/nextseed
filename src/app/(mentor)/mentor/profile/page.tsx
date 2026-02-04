"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { User, Settings, Briefcase } from "lucide-react"

export default function MentorProfilePage() {
    const router = useRouter()
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        hasTeams: "no",
        managedTeams: "",
        expertise: "",
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
                if (data.user?.role !== "mentor") {
                    router.push("/login")
                    return
                }
                const profile = data.user?.mentorProfile
                setUser(data.user)
                setFormData({
                    name: data.user?.name || "",
                    email: data.user?.email || "",
                    hasTeams: profile?.hasTeams ? "yes" : "no",
                    managedTeams: profile?.managedTeams || "",
                    expertise: profile?.expertise || "",
                    bio: profile?.bio || "",
                })
            } else {
                setError("Не удалось загрузить профиль. Попробуйте обновить страницу.")
            }
        } catch (err) {
            console.error("Failed to fetch mentor profile:", err)
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
                hasTeams: formData.hasTeams === "yes",
                managedTeams: formData.hasTeams === "yes" ? formData.managedTeams : "",
            }

            const res = await fetch("/api/mentor/update-profile", {
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
        } catch (err) {
            console.error("Save failed:", err)
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

    const showTeamFields = formData.hasTeams === "yes"

    return (
        <div className="min-h-screen bg-surface-50/50 py-10">
            <div className="container mx-auto px-4 max-w-4xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-surface-900">Личный кабинет ментора</h1>
                    <p className="text-surface-600">Информация из регистрации. Можно редактировать.</p>
                </div>
                <Link href="/mentor/settings">
                    <Button variant="outline" className="rounded-xl">
                        <Settings className="w-4 h-4 mr-2" /> Настройки
                    </Button>
                </Link>
            </div>

            <Card variant="bento">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5 text-brand-500" /> Профиль ментора
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
                            <Briefcase className="w-4 h-4 text-brand-500" /> Команды под вашим менторством
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => isEditing && setFormData({ ...formData, hasTeams: "no" })}
                                className={`p-3 rounded-xl border-2 text-left transition-all ${formData.hasTeams === "no"
                                    ? "border-brand-500 bg-brand-50"
                                    : "border-surface-100 hover:border-surface-200"
                                    } ${!isEditing ? "cursor-default opacity-80" : ""}`}
                            >
                                <p className="font-semibold text-surface-900">Нет</p>
                                <p className="text-xs text-surface-500">Пока не веду команды</p>
                            </button>
                            <button
                                type="button"
                                onClick={() => isEditing && setFormData({ ...formData, hasTeams: "yes" })}
                                className={`p-3 rounded-xl border-2 text-left transition-all ${formData.hasTeams === "yes"
                                    ? "border-brand-500 bg-brand-50"
                                    : "border-surface-100 hover:border-surface-200"
                                    } ${!isEditing ? "cursor-default opacity-80" : ""}`}
                            >
                                <p className="font-semibold text-surface-900">Да</p>
                                <p className="text-xs text-surface-500">Указать команды</p>
                            </button>
                        </div>
                    </div>

                    {showTeamFields && (
                        <Textarea
                            label="Команды (названия или почта)"
                            placeholder="InnoTeam (inno@email.com), GreenTech..."
                            value={formData.managedTeams}
                            onChange={(e) => setFormData({ ...formData, managedTeams: e.target.value })}
                            disabled={!isEditing}
                            className={!isEditing ? "bg-surface-50 border-transparent" : ""}
                            rows={3}
                        />
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Экспертиза"
                            placeholder="Product, AI, Design..."
                            value={formData.expertise}
                            onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                            disabled={!isEditing}
                            className={!isEditing ? "bg-surface-50 border-transparent" : ""}
                        />
                        <Textarea
                            label="О себе"
                            placeholder="Коротко о вашем опыте и подходе..."
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            disabled={!isEditing}
                            className={!isEditing ? "bg-surface-50 border-transparent" : ""}
                            rows={3}
                        />
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
        </div>
    )
}
