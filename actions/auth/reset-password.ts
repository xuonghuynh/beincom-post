'use server'
import { getUserByEmail } from "@/actions/auth/get-user-by-email";
import { sendResetPasswordEmail } from "@/lib/mail-send-resetpassword";
import { generateResetPasswordToken, generateVerificationToken } from "@/lib/tokens";
import { ForgotPasswordSchema } from "@/schemas"
import { z } from "zod";

export const resetPassword = async(values: z.infer<typeof ForgotPasswordSchema>) => {
    const validatedFields = ForgotPasswordSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email } = validatedFields.data
    // Check if user exists
    const existingUser = await getUserByEmail(email)

    console.log(existingUser)

    if(!existingUser) {
        return { error: 'Email does not exist' }
    }

    const resetPasswordToken = await generateResetPasswordToken(existingUser.email);
    await sendResetPasswordEmail(resetPasswordToken.email, resetPasswordToken.token);
    // return { success: "Confirmation email sent!" };



    return { success: "Password reset email sent!" }
}