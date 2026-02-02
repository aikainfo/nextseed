/**
 * User role types
 */
export type UserRole = "student" | "mentor" | "business"

/**
 * Account type for students
 */
export type AccountType = "student" | "team"

/**
 * Project category
 */
export type ProjectCategory = "ecology" | "games" | "services" | "ai"

/**
 * Project status
 */
export type ProjectStatus = "idea" | "mvp" | "active"

/**
 * User interface
 */
export interface User {
    id: string
    email: string
    name: string
    role: UserRole
    image?: string
    createdAt: Date
    updatedAt: Date
}

/**
 * Student/Team profile
 */
export interface StudentProfile {
    id: string
    userId: string
    accountType: AccountType
    teamName?: string
    about?: string
    settings?: {
        teamProfile?: boolean
        privateProfile?: boolean
        notifications?: boolean
    }
    createdAt: Date
    updatedAt: Date
}

/**
 * Mentor profile
 */
export interface MentorProfile {
    id: string
    userId: string
    profession?: string
    company?: string
    experience?: string
    focus?: string
    bio?: string
    createdAt: Date
}

/**
 * Project interface
 */
export interface Project {
    id: string
    userId: string
    title: string
    description: string
    category: ProjectCategory
    status: ProjectStatus
    createdAt: Date
    updatedAt: Date
}

/**
 * Mentor application
 */
export interface MentorApplication {
    id: string
    projectId: string
    mentorId: string
    message?: string
    status: "pending" | "accepted" | "rejected"
    createdAt: Date
}

/**
 * Project evaluation
 */
export interface ProjectEvaluation {
    id: string
    projectId: string
    mentorId: string
    mentorName: string
    score: number // 1-5
    comment?: string
    createdAt: Date
}
