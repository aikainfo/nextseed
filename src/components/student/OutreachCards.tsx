"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Briefcase, Award } from "lucide-react"
import { cn } from "@/lib/utils/cn"

export interface Mentor {
    id: string
    name: string
    email: string
    phone?: string
    specialization?: string
    bio?: string
    hasTeams: boolean
    managedTeams?: string
}

export interface MentorCardProps {
    mentor: Mentor
    onContact?: (mentor: Mentor) => void
    className?: string
}

/**
 * Mentor Card Component
 * Displays mentor information and contact button
 */
export function MentorCard({ mentor, onContact, className }: MentorCardProps) {
    return (
        <Card
            variant="bento"
            className={cn(
                "group transition-all duration-300 hover:shadow-premium hover:-translate-y-1",
                className
            )}
        >
            {/* Header */}
            <div className="mb-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-lg font-bold text-surface-900 group-hover:text-brand-600 transition-colors">
                        {mentor.name}
                    </h3>
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-500 to-accent-sky flex items-center justify-center text-white font-bold text-lg shrink-0">
                        {mentor.name.charAt(0)}
                    </div>
                </div>

                {mentor.specialization && (
                    <Badge variant="outline" className="bg-brand-50 text-brand-700 border-brand-200">
                        {mentor.specialization}
                    </Badge>
                )}
            </div>

            {/* Bio */}
            {mentor.bio && (
                <p className="text-sm text-surface-700 line-clamp-3 mb-4">{mentor.bio}</p>
            )}

            {/* Info */}
            <div className="space-y-2 mb-4">
                {mentor.hasTeams && mentor.managedTeams && (
                    <div className="flex items-start gap-2 text-sm text-surface-600">
                        <Award className="h-4 w-4 mt-0.5 shrink-0" />
                        <span className="line-clamp-2">{mentor.managedTeams}</span>
                    </div>
                )}
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-4 p-3 bg-surface-50 rounded-xl">
                <div className="flex items-center gap-2 text-sm text-surface-700">
                    <Mail className="h-4 w-4 text-surface-500" />
                    <span className="truncate">{mentor.email}</span>
                </div>
                {mentor.phone && (
                    <div className="flex items-center gap-2 text-sm text-surface-700">
                        <Phone className="h-4 w-4 text-surface-500" />
                        <span>{mentor.phone}</span>
                    </div>
                )}
            </div>

            {/* Contact Button */}
            <Button onClick={() => onContact?.(mentor)} className="w-full">
                Связаться
            </Button>
        </Card>
    )
}

export interface Investor {
    id: string
    name: string
    email: string
    phone?: string
    type: "individual" | "organization"
    companyName?: string
    bio?: string
    focusAreas?: string
    investmentRange?: string
}

export interface InvestorCardProps {
    investor: Investor
    onContact?: (investor: Investor) => void
    className?: string
}

/**
 * Investor Card Component
 * Displays investor/organization information and contact button
 */
export function InvestorCard({ investor, onContact, className }: InvestorCardProps) {
    return (
        <Card
            variant="bento"
            className={cn(
                "group transition-all duration-300 hover:shadow-premium hover:-translate-y-1",
                className
            )}
        >
            {/* Header */}
            <div className="mb-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                        <h3 className="text-lg font-bold text-surface-900 group-hover:text-brand-600 transition-colors">
                            {investor.name}
                        </h3>
                        {investor.companyName && (
                            <p className="text-sm text-surface-600 mt-1">{investor.companyName}</p>
                        )}
                    </div>
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
                        {investor.type === "organization" ? "🏢" : investor.name.charAt(0)}
                    </div>
                </div>

                <Badge
                    variant="outline"
                    className="bg-amber-50 text-amber-700 border-amber-200"
                >
                    {investor.type === "organization" ? "Организация" : "Инвестор"}
                </Badge>
            </div>

            {/* Bio */}
            {investor.bio && (
                <p className="text-sm text-surface-700 line-clamp-3 mb-4">{investor.bio}</p>
            )}

            {/* Investment Info */}
            <div className="space-y-2 mb-4">
                {investor.focusAreas && (
                    <div className="flex items-start gap-2 text-sm">
                        <Briefcase className="h-4 w-4 mt-0.5 text-surface-500 shrink-0" />
                        <div>
                            <span className="font-semibold text-surface-900">Фокус: </span>
                            <span className="text-surface-700">{investor.focusAreas}</span>
                        </div>
                    </div>
                )}
                {investor.investmentRange && (
                    <div className="flex items-start gap-2 text-sm">
                        <span className="text-lg">💰</span>
                        <div>
                            <span className="font-semibold text-surface-900">Диапазон: </span>
                            <span className="text-surface-700">{investor.investmentRange}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-4 p-3 bg-surface-50 rounded-xl">
                <div className="flex items-center gap-2 text-sm text-surface-700">
                    <Mail className="h-4 w-4 text-surface-500" />
                    <span className="truncate">{investor.email}</span>
                </div>
                {investor.phone && (
                    <div className="flex items-center gap-2 text-sm text-surface-700">
                        <Phone className="h-4 w-4 text-surface-500" />
                        <span>{investor.phone}</span>
                    </div>
                )}
            </div>

            {/* Contact Button */}
            <Button onClick={() => onContact?.(investor)} className="w-full">
                Связаться
            </Button>
        </Card>
    )
}
