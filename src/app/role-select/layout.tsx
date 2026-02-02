import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Выбор роли",
    description: "Выберите свою роль на платформе NextSeed: ученик, ментор или бизнесмен",
}

export default function RoleSelectLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
