import React from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Trophy } from "lucide-react"

interface MentorCompetitionCardProps {
    competition: any
    onView: (id: string) => void
    onRegister: (id: string) => void
    isRegistered?: boolean
}

export const MentorCompetitionCard: React.FC<MentorCompetitionCardProps> = ({
    competition,
    onView,
    onRegister,
    isRegistered,
}) => {
    return (
        <Card variant="bento" className="h-full">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-brand-600">
                        <Trophy className="h-4 w-4" />
                        {competition.type === "olympiad" ? "Олимпиада" : "Стартап-конкурс"}
                    </div>
                    {competition.isOwner && (
                        <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                            Ваш конкурс
                        </span>
                    )}
                </div>

                <CardTitle className="mb-2">{competition.title}</CardTitle>
                <p className="text-sm text-surface-600 mb-4 line-clamp-3">{competition.description}</p>

                <div className="space-y-2 text-sm text-surface-600 mb-6">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Дедлайн: {new Date(competition.deadline).toLocaleDateString("ru-RU")}
                    </div>
                    {competition.location && (
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {competition.location}
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" onClick={() => onView(competition.id)}>
                        Подробнее
                    </Button>
                    <Button size="sm" onClick={() => onRegister(competition.id)} disabled={isRegistered}>
                        {isRegistered ? "Вы зарегистрированы" : "Регистрация"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
