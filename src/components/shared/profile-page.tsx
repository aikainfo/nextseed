"use client"

import { useState } from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { User, Mail, Calendar } from "lucide-react"

interface ProfilePageProps {
    user: {
        name: string
        email: string
        role: string
        createdAt: string
    }
    profile: {
        bio?: string
        [key: string]: any
    }
    onSave: (data: any) => Promise<void>
}

/**
 * Profile Page Component
 * Shared across all roles
 */
export function ProfilePage({ user, profile, onSave }: ProfilePageProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [formData, setFormData] = useState(profile)

    const handleSave = async () => {
        setIsSaving(true)
        try {
            await onSave(formData)
            setIsEditing(false)
        } catch (error) {
            console.error("Failed to save profile:", error)
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-surface-900">Профиль</h1>
                    <p className="mt-1 text-surface-600">
                        Управляйте своей информацией
                    </p>
                </div>
                {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)}>
                        Редактировать
                    </Button>
                ) : (
                    <div className="flex gap-2">
                        <Button variant="ghost" onClick={() => setIsEditing(false)}>
                            Отмена
                        </Button>
                        <Button onClick={handleSave} disabled={isSaving}>
                            {isSaving ? "Сохранение..." : "Сохранить"}
                        </Button>
                    </div>
                )}
            </div>

            {/* Profile Card */}
            <Card variant="bento" className="p-8">
                <div className="flex items-start gap-6 mb-8">
                    {/* Avatar */}
                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-4xl font-semibold flex-shrink-0">
                        {user.name.charAt(0)}
                    </div>

                    {/* Basic Info */}
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-surface-900 mb-2">{user.name}</h2>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-surface-600">
                                <Mail className="h-4 w-4" />
                                <span>{user.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-surface-600">
                                <User className="h-4 w-4" />
                                <span className="capitalize">{user.role}</span>
                            </div>
                            <div className="flex items-center gap-2 text-surface-600">
                                <Calendar className="h-4 w-4" />
                                <span>Зарегистрирован: {new Date(user.createdAt).toLocaleDateString('ru-RU')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bio */}
                <div className="space-y-4">
                    {isEditing ? (
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-surface-900">
                                О себе
                            </label>
                            <textarea
                                className="w-full rounded-xl border border-surface-300 bg-white px-4 py-3 text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:border-brand-500 focus:ring-brand-500/20 transition-all"
                                rows={6}
                                placeholder="Расскажите о себе..."
                                value={formData.bio || ""}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            />
                        </div>
                    ) : (
                        <div>
                            <h3 className="text-sm font-semibold text-surface-900 mb-2">О себе</h3>
                            <p className="text-surface-700">
                                {profile.bio || "Информация не указана"}
                            </p>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    )
}
