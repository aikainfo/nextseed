"use client"

import { CreateProjectForm } from "@/components/forms/create-project-form"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CreateProjectPage() {
    const router = useRouter()

    const handleSubmit = async (data: any) => {
        const stageMap: Record<string, string> = {
            idea: "Idea",
            mvp: "MVP",
            active: "Active",
        }

        try {
            const res = await fetch("/api/user/create-project", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: data.title,
                    description: data.description,
                    shortDescription: data.description?.slice(0, 150),
                    stage: stageMap[data.status] || data.status || "Idea",
                }),
            })

            if (res.ok) {
                router.push("/student/projects")
            } else {
                const err = await res.json().catch(() => ({}))
                alert(err.error || "Ошибка создания проекта")
            }
        } catch (error) {
            console.error("Create project failed:", error)
            alert("Ошибка сети. Попробуйте снова.")
        }
    }

    const handleCancel = () => {
        router.push("/student/projects")
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link
                    href="/student/projects"
                    className="inline-flex items-center gap-2 text-surface-600 hover:text-surface-900 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span className="font-medium">Назад к проектам</span>
                </Link>
            </div>

            <div>
                <h1 className="text-3xl font-bold text-surface-900">Создать проект</h1>
                <p className="mt-1 text-surface-600">Добавьте новый проект в ваше портфолио</p>
            </div>

            <Card variant="bento">
                <CardContent>
                    <CreateProjectForm onSubmit={handleSubmit} onCancel={handleCancel} />
                </CardContent>
            </Card>
        </div>
    )
}
