/**
 * Project categories
 */
export const PROJECT_CATEGORIES = {
    ecology: { label: "🌱 Экология", value: "ecology" },
    games: { label: "🎮 Игры", value: "games" },
    services: { label: "⚙️ Сервисы", value: "services" },
    ai: { label: "🤖 ИИ", value: "ai" },
} as const

/**
 * Project statuses
 */
export const PROJECT_STATUSES = {
    idea: { label: "Идея", value: "idea" },
    mvp: { label: "MVP", value: "mvp" },
    active: { label: "Активен", value: "active" },
} as const

/**
 * User roles
 */
export const USER_ROLES = {
    student: { label: "Ученик", value: "student" },
    mentor: { label: "Ментор", value: "mentor" },
    business: { label: "Бизнесмен", value: "business" },
} as const

/**
 * Account types
 */
export const ACCOUNT_TYPES = {
    student: { label: "Индивидуальный", value: "student" },
    team: { label: "Командный", value: "team" },
} as const

/**
 * LocalStorage keys (for backward compatibility during migration)
 */
export const STORAGE_KEYS = {
    STUDENT_PROFILE: "nextseed.student.v1",
    MENTOR_PROFILE: "nextseed.mentor.v1",
    PROFILE_DATA: "profileData",
    STUDENT_NAME: "studentName",
    EVALUATIONS: "nextseed.evaluations.v1",
    APPLICATIONS: "nextseed.applications.v1",
} as const
