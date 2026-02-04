"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Building2, Settings, User } from "lucide-react"

export default function BusinessProfilePage() {
    const router = useRouter()
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        accountType: "individual",
        companyName: "",
        interests: "",
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
                if (data.user?.role !== "business") {
                    router.push("/login")
                    return
                }
                const profile = data.user?.businessProfile
                setUser(data.user)
                setFormData({
                    name: data.user?.name || "",
                    email: data.user?.email || "",
                    accountType: profile?.type === "organization" ? "organization" : "individual",
                    companyName: profile?.companyName || "",
                    interests: profile?.interests || "",
                    bio: profile?.bio || "",
                })
            } else {
                setError("Не удалось загрузить профиль. Попробуйте обновить страницу.")
            }
        } catch (err) {
            console.error("Failed to fetch business profile:", err)
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
            const res = await fetch("/api/business/update-profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
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

    return (
        <div className="min-h-screen bg-surface-50/50 py-10">
            <div className="container mx-auto px-4 max-w-4xl space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-surface-900">Личный кабинет бизнеса</h1>
                        <p className="text-surface-600">Информация из регистрации. Можно редактировать.</p>
                    </div>
                    <Link href="/business/settings">
                        <Button variant="outline" className="rounded-xl">
                            <Settings className="w-4 h-4 mr-2" /> Настройки
                        </Button>
                    </Link>
                </div>

                <Card variant="bento">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building2 className="w-5 h-5 text-brand-500" /> Профиль инвестора
                        </CardTitle>
                        <CardDescription>Данные можно редактировать в любое время</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Контактное лицо"
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
                                <User className="w-4 h-4 text-brand-500" /> Тип аккаунта
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
                                    <p className="text-xs text-surface-500">Личное инвестирование</p>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => isEditing && setFormData({ ...formData, accountType: "organization" })}
                                    className={`p-3 rounded-xl border-2 text-left transition-all ${formData.accountType === "organization"
                                        ? "border-brand-500 bg-brand-50"
                                        : "border-surface-100 hover:border-surface-200"
                                        } ${!isEditing ? "cursor-default opacity-80" : ""}`}
                                >
                                    <p className="font-semibold text-surface-900">Организация</p>
                                    <p className="text-xs text-surface-500">Фонд или компания</p>
                                </button>
                            </div>
                        </div>

                        {formData.accountType === "organization" && (
                            <Input
                                label="Название организации"
                                value={formData.companyName}
                                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                disabled={!isEditing}
                                className={!isEditing ? "bg-surface-50 border-transparent" : ""}
                            />
                        )}

                        <Input
                            label="Интересы"
                            placeholder="EdTech, AI, Robotics"
                            value={formData.interests}
                            onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                            disabled={!isEditing}
                            className={!isEditing ? "bg-surface-50 border-transparent" : ""}
                        />

                        <Textarea
                            label="О себе / компании"
                            placeholder="Кратко о стратегии инвестиций..."
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            disabled={!isEditing}
                            className={!isEditing ? "bg-surface-50 border-transparent" : ""}
                            rows={4}
                        />

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
