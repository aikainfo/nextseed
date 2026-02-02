import { z } from "zod"

/**
 * Login form validation schema
 */
export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email обязателен")
        .email("Неверный формат email"),
    password: z
        .string()
        .min(6, "Минимум 6 символов"),
    role: z.enum(["student", "mentor", "business"] as const, {
        message: "Выберите роль",
    }),
})

/**
 * Register form validation schema
 */
export const registerSchema = z.object({
    name: z
        .string()
        .min(2, "Минимум 2 символа")
        .max(50, "Максимум 50 символов"),
    email: z
        .string()
        .min(1, "Email обязателен")
        .email("Неверный формат email"),
    password: z
        .string()
        .min(6, "Минимум 6 символов")
        .max(100, "Максимум 100 символов"),
    confirmPassword: z
        .string()
        .min(6, "Минимум 6 символов"),
    role: z.enum(["student", "mentor", "business"] as const, {
        message: "Выберите роль",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
