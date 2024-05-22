'use server'

import { getUserByEmail } from "@/actions/auth/get-user-by-email"
import { getVerificationByToken } from "@/actions/auth/get-verification-by-token"
import { db } from "@/lib/db"

export const verificationEmail = async (token: string) => {
    // Check if token exists
    const existingToken = await getVerificationByToken(token)
    if(!existingToken) return {error: 'Token does not exist'}

    // Check if token is expired
    const isTokenExpired = new Date(existingToken.expires) < new Date()
    if(isTokenExpired) return {error: 'Token expired'}

    // Check if user exists
    const existingUser = await getUserByEmail(existingToken.email)
    if(!existingUser) return {error: 'Email does not exist'}

    // Verify email
    await db.user.update({
        where: {
            id: existingUser.id
        },
        data: {
            emailVerified: new Date(),
            email: existingToken.email
        }
    })

    // Delete token
    await db.verificationToken.delete({
        where: {
            id: existingToken.id
        }
    })

    // Return success
    return {success: 'Email verified!'}
}