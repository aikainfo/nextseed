"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function StudentProfilePage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        accountType: "individual",
        bio: "",
        teamName: "",
        teamMembers: "",
    })

    useEffect(() => {
        // Load user data from cookies or API
        const userId = document.cookie.split("; ").find((row) => row.startsWith("user_id="))?.split("=")[1]
        if (userId) {
            // TODO: Fetch user data from API
            console.log("Loading user:", userId)
        }
    }, [])

    const handleSave = () => {
        console.log("Saving profile:", formData)
        alert("Профиль сохранен!")
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-surface-900">Профиль</h1>
                <p className="mt-1 text-surface-600">Управление вашим профилем</p>
            </div>

            <Card variant="bento">
                <CardContent>
                    <CardTitle className="mb-6">Основная информация</CardTitle>

                    <div className="space-y-4">
                        <Input
                            label="Имя и фамилия"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />

                        <Input
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-surface-900">
                                Тип аккаунта
                            </label>
                            <select
                                className="w-full rounded-xl border border-surface-300 bg-white px-4 py-3 text-surface-900 focus:outline-none focus:ring-2 focus:border-brand-500 focus:ring-brand-500/20 transition-all"
                                value={formData.accountType}
                                onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
                            >
                                <option value="individual">Индивидуальный участник</option>
                                <option value="team">Команда</option>
                            </select>
                        </div>

                        {formData.accountType === "team" && (
                            <>
                                <Input
                                    label="Название команды"
                                    value={formData.teamName}
                                    onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                                />
                                <Input
                                    label="Участники команды"
                                    value={formData.teamMembers}
                                    onChange={(e) => setFormData({ ...formData, teamMembers: e.target.value })}
                                />
                            </>
                        )}

                        <div className="pt-4">
                            <Button onClick={handleSave} className="w-full">
                                Сохранить изменения
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
