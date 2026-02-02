"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock, Trash2, LogOut, AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"

/**
 * Student Settings Page
 * Password change, account deletion, logout
 */
export default function StudentSettingsPage() {
    const router = useRouter()
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [passwordData, setPasswordData] = useState({
        current: "",
        new: "",
        confirm: "",
    })

    const handleChangePassword = async () => {
        // TODO: Implement password change
        console.log("Changing password")
    }

    const handleDeleteAccount = async () => {
        // TODO: Implement account deletion
        console.log("Deleting account")
        router.push("/")
    }

    const handleLogout = () => {
        // TODO: Implement logout
        router.push("/login")
    }

    return (
        <div className="max-w-3xl space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-surface-900">Настройки</h1>
                <p className="mt-1 text-surface-600">Управление аккаунтом и безопасностью</p>
            </div>

            {/* Change Password */}
            <Card variant="bento" className="p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-xl bg-brand-100 flex items-center justify-center">
                        <Lock className="h-5 w-5 text-brand-600" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-surface-900">Сменить пароль</h2>
                        <p className="text-sm text-surface-600">Обновите пароль для вашего аккаунта</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <Input
                        label="Текущий пароль"
                        type="password"
                        placeholder="••••••••"
                        value={passwordData.current}
                        onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                    />
                    <Input
                        label="Новый пароль"
                        type="password"
                        placeholder="••••••••"
                        value={passwordData.new}
                        onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                    />
                    <Input
                        label="Подтвердите новый пароль"
                        type="password"
                        placeholder="••••••••"
                        value={passwordData.confirm}
                        onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                    />
                    <Button onClick={handleChangePassword} className="w-full">
                        Сменить пароль
                    </Button>
                </div>
            </Card>

            {/* Logout */}
            <Card variant="bento" className="p-6">
                <div className="flex items-center justify-between">
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

            {/* Delete Account */}
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
                    <Button variant="outline" className="w-full border-red-300 text-red-600 hover:bg-red-50" onClick={() => setShowDeleteConfirm(true)}>
                        Удалить аккаунт
                    </Button>
                ) : (
                    <div className="space-y-4">
                        <div className="p-4 bg-red-50 rounded-xl flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <div className="text-sm text-red-900">
                                <p className="font-semibold mb-1">Вы уверены?</p>
                                <p>Все ваши данные, проекты и заявки будут удалены безвозвратно.</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="ghost" className="flex-1" onClick={() => setShowDeleteConfirm(false)}>
                                Отмена
                            </Button>
                            <Button className="flex-1 bg-red-500 hover:bg-red-600" onClick={handleDeleteAccount}>
                                Подтвердить удаление
                            </Button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    )
}
