import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
    console.log(email, token)
    await resend.emails.send({
        from: "Beincom <mail@beincom.longxuong.com>",
        to: [email],
        subject: "Beincom verification email",
        html: `<p>Hi there, please click on the link below to verify your email addressss.</p><p><a href="${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}">Verify Email</a></p>`,
    });
};
