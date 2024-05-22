"use server";
import { signIn } from "@/auth";
import { getUserByEmail } from "@/actions/auth/get-user-by-email";
import { sendVerificationEmail } from "@/actions/auth/mail-send-verification";
import { generateVerificationToken } from "@/lib/tokens";
import { DEFAULT_ADMIN_LOGIN_REDIRECT, DEFAULT_USER_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

/**
 * Login user using credentials
 *
 * @param values - User credentials
 * @returns Object containing error or success message
 */
export const login = async (values: z.infer<typeof LoginSchema>): Promise<{
    error?: string;
    success?: string;
}> => {
    // Validate fields
    const validatedFields = LoginSchema.safeParse(values);

    // If fields are invalid, return error
    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password } = validatedFields.data;

    // Find user by email
    const existingUser = await getUserByEmail(email);

    // If user not found, return error
    if (!existingUser || !existingUser.password) {
        return { error: "User not found!" };
    }

    // If user not verified, send verification email and return success message
    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email);
        await sendVerificationEmail(verificationToken.email, verificationToken.token);
        return { success: "Confirmation email sent!" };
    }

    // Try to sign in user
    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_USER_LOGIN_REDIRECT,
        });
    } catch (error) {
        // If error is instance of AuthError, check type and return appropriate message
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid email or password!" };
                default:
                    return { error: "Something went wrong!" };
            }
        }
        // If error is not AuthError, re-throw error
        throw error;
    }

    // If login successful, return success message
    return { success: "Logged in successfully!" };
};
