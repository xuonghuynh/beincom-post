import { db } from "@/lib/db"

export const getResetPasswordByEmail = async(email: string) => {
    try {
        const resetPasswordToken = await db.resetPasswordToken.findFirst({
            where: {
                email
            }
        })
        return resetPasswordToken
    } catch (error) {
        return null
    }
}