import React, { useState, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterSchema } from "@/schemas";
import { register } from "@/actions/auth/register";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";
import CardWarapper from "@/app/(auth)/_components/CardWrapper";

const RegisterForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof RegisterSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setSuccess("");
        setError("");
        startTransition(() => {
            register(values).then((res) => {
                if (res.error) {
                    setError(res.error);
                }
                if (res.success) {
                    setSuccess(res.success);
                }
            });
        });
    }
    return (
        <CardWarapper
            headerLabel={"Sign Up"}
            backButtonLabel={"Already an account? "}
            backButtonLinkLabel={"Sign In"}
            backButtonLink="/login"
            showSocialLogin
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder=""
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <div className="flex w-full justify-center">
                        <Button
                            variant={"default"}
                            className="rounded-full px-10 py-6"
                            type="submit"
                        >
                            Sign Up
                        </Button>
                    </div>
                </form>
            </Form>
        </CardWarapper>
    );
};

export default RegisterForm;
