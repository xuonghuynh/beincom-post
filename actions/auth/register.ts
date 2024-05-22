"use server";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcryptjs from "bcryptjs";
import { getUserByEmail } from "@/actions/auth/get-user-by-email";
import { db } from "@/lib/db";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/actions/auth/mail-send-verification";

/**
 * Register new user using validated data
 * @param {z.infer<typeof RegisterSchema>} values - Validated registration data
 * @returns {{error?: string, success?: string}} Object containing error or success message
 */
export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    // If fields are invalid, return error
    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password, name } = validatedFields.data;

    // Use bcryptjs to hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Get user by email
    const isExistingUser = await getUserByEmail(email);

    // If user already exists, return error
    if (isExistingUser) {
        return { error: "Email already exists!" };
    }

    // Create user
    await db.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        },
    });

    // Generate verification token
    const verificationToken = await generateVerificationToken(email);
    // Send verification email
    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
    );

    // Return success message
    return { success: "Confirmation email sent!" };
};
