import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendResetPasswordEmail = async (email: string, token: string) => {
    await resend.emails.send({
        from: "Beincom <mail@beincom.longxuong.com>",
        to: [email],
        subject: "Beincom Reset Your Password",
        html: `<p>For resetting your password, please click on the link below</p><p><a href="${process.env.NEXT_PUBLIC_APP_URL}/new-password?token=${token}">Reset Password</a></p>`,
    });
};
