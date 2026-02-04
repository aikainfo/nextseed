import React from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Mail, Target } from "lucide-react"

interface MentorTeamCardProps {
    team: any
    onContact: (id: string) => void
    contacted?: boolean
}

export const MentorTeamCard: React.FC<MentorTeamCardProps> = ({
    team,
    onContact,
    contacted,
}) => {
    return (
        <Card variant="bento">
            <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                    <CardTitle>{team.name}</CardTitle>
                    <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-1 rounded-full">
                        {team.stage}
                    </span>
                </div>

                <div className="space-y-2 text-sm text-surface-600">
                    <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {team.members}
                    </div>
                    <div className="flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        {team.project}
                    </div>
                    <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {team.contactEmail}
                    </div>
                </div>

                <p className="text-sm text-surface-600">{team.summary}</p>

                <Button className="w-full" onClick={() => onContact(team.id)} disabled={contacted}>
                    {contacted ? "Заявка отправлена" : "Откликнуться"}
                </Button>
            </CardContent>
        </Card>
    )
}
