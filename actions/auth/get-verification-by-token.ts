import { db } from "@/lib/db"

export const getVerificationByToken = async(token: string) => {
    try {
        const verificationToken = await db.verificationToken.findUnique({
            where: {
                token
            }
        })
        return verificationToken
    } catch (error) {
        return null
    }
}