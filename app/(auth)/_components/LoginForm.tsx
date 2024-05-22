'use client'
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
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";
import { LoginSchema } from "@/schemas";
import { login } from "@/actions/auth/login";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import CardWarapper from "@/app/(auth)/_components/CardWrapper";

const LoginForm = () => {
    const searchParams = useSearchParams();
    const isUrlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with different account" : "";
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof LoginSchema>) {
        setSuccess("");
        setError("");

        startTransition(() => { 
            login(values).then((res) => {
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
            headerLabel={"Login"}
            backButtonLabel={"Don't have an account? "}
            backButtonLinkLabel={"Sign Up"}
            backButtonLink="/register"
            showSocialLogin
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
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
                    <FormError message={error || isUrlError} />
                    <FormSuccess message={success} />
                    <div className="flex w-full justify-center">
                        <Button
                            variant={"default"}
                            className="rounded-full px-10 py-6"
                            type="submit"
                        >
                            Sign In
                        </Button>
                    </div>
                    <Button size={"sm"} variant={"link"} className="w-full !mt-5 underline !p-0 " asChild>
                        <Link className="w-full mt-0 font-normal " href="/forgot-password">Forgot Password?</Link>
                    </Button>
                </form>
            </Form>
        </CardWarapper>
    );
};

export default LoginForm;
