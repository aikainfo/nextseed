"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, LogOut, AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function BusinessSettingsPage() {
    const router = useRouter()
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleDeleteAccount = async () => {
        setLoading(true)
        try {
            const res = await fetch("/api/user/delete-account", { method: "POST" })
            if (res.ok) {
                router.push("/login")
            }
        } catch (error) {
            console.error("Delete failed:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/sign-out", { method: "POST" })
            router.push("/login")
        } catch (error) {
            console.error("Logout failed:", error)
        }
    }

    return (
        <div className="min-h-screen bg-surface-50/50 py-10">
            <div className="container mx-auto px-4 max-w-3xl space-y-6">
                <div>
                    <h1 className="text-3xl font-black text-surface-900">Настройки</h1>
                    <p className="mt-1 text-surface-600">Выход из аккаунта или удаление профиля</p>
                </div>

                <Card variant="bento" className="p-6">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-surface-100 flex items-center justify-center">
                                <LogOut className="h-5 w-5 text-surface-600" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-surface-900">Выйти из аккаунта</h2>
                                <p className="text-sm text-surface-600">Завершить текущую сессию</p>
                            </div>
                        </div>
                        <Button variant="outline" onClick={handleLogout}>
                            Выйти
                        </Button>
                    </div>
                </Card>

                <Card variant="bento" className="p-6 border-red-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-xl bg-red-100 flex items-center justify-center">
                            <Trash2 className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-red-900">Удалить аккаунт</h2>
                            <p className="text-sm text-red-600">Это действие необратимо</p>
                        </div>
                    </div>

                    {!showDeleteConfirm ? (
                        <Button
                            variant="outline"
                            className="w-full border-red-300 text-red-600 hover:bg-red-50"
                            onClick={() => setShowDeleteConfirm(true)}
                        >
                            Удалить аккаунт
                        </Button>
                    ) : (
                        <div className="space-y-4">
                            <div className="p-4 bg-red-50 rounded-xl flex items-start gap-3">
                                <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-red-900">
                                    <p className="font-semibold mb-1">Вы уверены?</p>
                                    <p>Все ваши данные будут удалены безвозвратно.</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="ghost" className="flex-1" onClick={() => setShowDeleteConfirm(false)}>
                                    Отмена
                                </Button>
                                <Button
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                                    disabled={loading}
                                    onClick={handleDeleteAccount}
                                >
                                    {loading ? "Удаление..." : "Подтвердить удаление"}
                                </Button>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    )
}
