import { getResetPasswordByEmail } from "@/actions/auth/get-reset-password-by-email";
import { getVerificationByEmail } from "@/actions/auth/get-verification-by-email";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export const generateVerificationToken = async(email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingVerificationToken = await getVerificationByEmail(email);

    if(existingVerificationToken) {
        await db.verificationToken.delete({
            where: {
                id: existingVerificationToken.id
            }
        })
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires
        }
    })

    return verificationToken;
}

export const generateResetPasswordToken = async(email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingResetPasswordToken = await getResetPasswordByEmail(email);

    if(existingResetPasswordToken) {
        await db.resetPasswordToken.delete({
            where: {
                id: existingResetPasswordToken.id
            }
        })
    }

    const resetPasswordToken = await db.resetPasswordToken.create({
        data: {
            email,
            token,
            expires
        }
    })

    return resetPasswordToken;
}