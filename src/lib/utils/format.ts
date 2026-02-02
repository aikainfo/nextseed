/**
 * Get initials from a name
 * @param name - Full name
 * @returns Initials (max 2 characters)
 */
export function getInitials(name: string): string {
    if (!name) return "U"

    const parts = name
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)

    const initials = parts
        .map((part) => part[0]?.toUpperCase() || "")
        .join("")

    return initials || "U"
}

/**
 * Format date to Russian locale
 * @param date - Date object or timestamp
 * @returns Formatted date string
 */
export function formatDate(date: Date | number | string): string {
    const d = typeof date === "string" || typeof date === "number"
        ? new Date(date)
        : date

    return d.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    })
}

/**
 * Format date and time to Russian locale
 * @param date - Date object or timestamp
 * @returns Formatted date and time string
 */
export function formatDateTime(date: Date | number | string): string {
    const d = typeof date === "string" || typeof date === "number"
        ? new Date(date)
        : date

    return d.toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })
}

/**
 * Truncate text to specified length
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + "..."
}

/**
 * Validate email format
 * @param email - Email address
 * @returns True if valid email format
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}
