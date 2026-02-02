import { z } from "zod"

/**
 * Project form validation schema
 */
export const projectSchema = z.object({
    title: z
        .string()
        .min(3, "Минимум 3 символа")
        .max(100, "Максимум 100 символов"),
    description: z
        .string()
        .min(10, "Минимум 10 символов")
        .max(1000, "Максимум 1000 символов"),
    category: z.enum(["ecology", "games", "services", "ai"] as const),
    status: z.enum(["idea", "mvp", "active"] as const),
})

export type ProjectFormData = z.infer<typeof projectSchema>
