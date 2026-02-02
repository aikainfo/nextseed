import { db } from "./db"
import { UserRole } from "../../prisma/generated/client"

export async function createDemoAccounts() {
    const roles: UserRole[] = ["student", "mentor", "business"]

    for (const role of roles) {
        const email = `demo-${role}@nextseed.kz`

        const existingUser = await db.user.findUnique({
            where: { email }
        })

        if (!existingUser) {
            await db.user.create({
                data: {
                    name: `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`,
                    email,
                    role,
                    // В реальном приложении мы бы создали Account с хешированным паролем
                    // Для демо-заглушки Better Auth это настраивается отдельно
                    accounts: {
                        create: {
                            providerId: "credential",
                            accountId: email,
                            password: "password123", // В продакшене обязательно хешировать!
                        }
                    }
                }
            })
            console.log(`Created demo account for ${role}: ${email}`)
        } else {
            console.log(`Demo account for ${role} already exists: ${email}`)
        }
    }
}
