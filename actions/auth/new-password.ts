'use server'

import { getResetPasswordByToken } from "@/actions/auth/get-reset-password-by-token"
import { getUserByEmail } from "@/actions/auth/get-user-by-email"
import { db } from "@/lib/db"
import { NewPasswordSchema } from "@/schemas"
import { z } from "zod"
import bcryptjs from "bcryptjs"

export const newPasswordReset = async (values: z.infer<typeof NewPasswordSchema>, token: string) => {
    const validatedFields = NewPasswordSchema.safeParse(values)
    if(!validatedFields.success) return {error: 'Invalid fields'}
    const {password} = validatedFields.data
    // Check if token exists
    const existingToken = await getResetPasswordByToken(token)
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
            password: await bcryptjs.hash(password, 10),
            email: existingToken.email
        }
    })

    // Delete token
    await db.resetPasswordToken.delete({
        where: {
            id: existingToken.id
        }
    })

    // // Return success
    return {success: 'Password reset successfully'}
}