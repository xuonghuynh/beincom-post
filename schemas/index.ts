import * as z from "zod";

export const LoginSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email("This is not a valid email"),
    password: z.string().min(1, { message: "Password is required" }),
});

export const RegisterSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().min(2).max(50).email({ message: "Invalid email" }),
    password: z.string().min(1, { message: "Password is required" }),
});

export const ForgotPasswordSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email("This is not a valid email"),
});

export const NewPasswordSchema = z.object({
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
});

export const CreatePostSchema = z.object({
    content: z.string().min(10, { message: "Content is required" }),
})
