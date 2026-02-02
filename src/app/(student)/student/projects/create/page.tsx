"use client"

import { CreateProjectForm } from "@/components/forms/create-project-form"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CreateProjectPage() {
    const router = useRouter()

    const handleSubmit = (data: any) => {
        console.log("Creating project:", data)
        alert("Проект создан!")
        router.push("/student/projects")
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
