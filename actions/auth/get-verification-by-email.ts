import { db } from "@/lib/db"

export const getVerificationByEmail = async(email: string) => {
    try {
        const verificationToken = await db.verificationToken.findFirst({
            where: {
                email
            }
        })
        return verificationToken
    } catch (error) {
        return null
    }
}