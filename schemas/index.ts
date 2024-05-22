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

export const NewCollectionSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    image: z.string().min(1, { message: "Image is required" }),
});

export const NewProductSchema = z.object({
    name: z
        .string()
        .min(2, {
            message: "Title must be at least 2 characters",
        })
        .max(50, {
            message: "Title must be less than 50 characters",
        }),
});

export const CollectionSelectSchema = z.array(
    z.object({ 
        id: z.string(), 
        name: z.string(),
        description: z.string(),
        slug:        z.string(),
        userId:      z.string(),
        image:       z.string(),
        createdAt:   z.date(),
        updatedAt:   z.date(),
    }),
);

export const UpdateProductSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required",
    }),
    description: z.string().min(1, {
        message: "Description is required",
    }),
    price: z.coerce.number().min(0.1, {
        message: "Price is required",
    }),
    stock: z.coerce.number(),
    compareAtPrice: z.coerce.number().optional(),
    colors: z.array(z.string()),
    images: z
        .array(
            z.object({
                id: z.string(),
                imageUrl: z.string(),
                productId: z.string(),
                createdAt: z.date(),
                updatedAt: z.date(),
            }),
        )
        .nonempty("Please upload at least one image for the product"),
    tags: z.array(z.string()),
    collections: z.array(z.string()),
}).refine((data) => data.compareAtPrice === undefined || data.price >= data.compareAtPrice, {
    message: "Compare at price must be less than price",
    path: ["compareAtPrice"],
});
