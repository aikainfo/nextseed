"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CreateCompetitionPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        deadline: "",
        location: "",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: Save competition
        console.log("Creating competition:", formData)
        router.push("/mentor/competitions")
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div>
                <Link href="/mentor/competitions" className="inline-flex items-center gap-2 text-surface-600 hover:text-surface-900 transition-colors mb-4">
                    <ArrowLeft className="h-5 w-5" />
                    <span className="font-medium">Назад к конкурсам</span>
                </Link>
                <h1 className="text-3xl font-bold text-surface-900">Создать конкурс</h1>
                <p className="mt-1 text-surface-600">Организуйте новый конкурс для учеников</p>
            </div>

            <Card variant="bento" className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Название конкурса"
                        placeholder="FIRST Robotics Kazakhstan 2026"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-surface-900">
                            Описание <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            className="w-full rounded-xl border border-surface-300 bg-white px-4 py-3 text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:border-brand-500 focus:ring-brand-500/20 transition-all"
                            rows={5}
                            placeholder="Международный конкурс по робототехнике..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                        />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <Input
                            label="Дедлайн"
                            type="date"
                            value={formData.deadline}
                            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                            required
                        />
                        <Input
                            label="Локация"
                            placeholder="Астана, Казахстан"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            required
                        />
                    </div>

                    <div className="flex items-center justify-end gap-4 pt-4">
                        <Link href="/mentor/competitions">
                            <Button type="button" variant="ghost">Отмена</Button>
                        </Link>
                        <Button type="submit">Создать конкурс</Button>
                    </div>
                </form>
            </Card>
        </div>
    )
}
