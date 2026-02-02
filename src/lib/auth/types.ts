/**
 * Authentication and Authorization Types
 * Strict type safety for user roles and permissions
 */

export type UserRole = 'student' | 'mentor' | 'business'

export type StudentAccountType = 'individual' | 'team'
export type BusinessAccountType = 'individual' | 'organization'

export interface BaseUser {
    id: string
    name: string
    email: string
    emailVerified: boolean
    role: UserRole
    image?: string
    createdAt: Date
    updatedAt: Date
}

export interface StudentProfile {
    id: string
    userId: string
    type: StudentAccountType
    bio?: string
    mentorName?: string
    mentorEmail?: string
    teamName?: string
    teamMembers?: string
    competitions?: string
}

export interface MentorProfile {
    id: string
    userId: string
    hasTeams: boolean
    managedTeams?: string
    bio?: string
}

export interface BusinessProfile {
    id: string
    userId: string
    type: BusinessAccountType
    companyName?: string
    bio?: string
}

export interface AuthenticatedUser extends BaseUser {
    studentProfile?: StudentProfile
    mentorProfile?: MentorProfile
    businessProfile?: BusinessProfile
}

/**
 * Type guards for role checking
 */
export function isStudent(user: AuthenticatedUser): user is AuthenticatedUser & { studentProfile: StudentProfile } {
    return user.role === 'student' && !!user.studentProfile
}

export function isMentor(user: AuthenticatedUser): user is AuthenticatedUser & { mentorProfile: MentorProfile } {
    return user.role === 'mentor' && !!user.mentorProfile
}

export function isBusiness(user: AuthenticatedUser): user is AuthenticatedUser & { businessProfile: BusinessProfile } {
    return user.role === 'business' && !!user.businessProfile
}
