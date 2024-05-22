import { db } from "@/lib/db"

export const getResetPasswordByToken = async(token: string) => {
    try {
        const resetPasswordToken = await db.resetPasswordToken.findUnique({
            where: {
                token
            }
        })
        return resetPasswordToken
    } catch (error) {
        return null
    }
}