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
import { ForgotPasswordSchema } from "@/schemas";
import CardWarapper from "@/app/(auth)/_components/CardWrapper";
import { resetPassword } from "@/actions/auth/reset-password";

const ForgotPasswordForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
        resolver: zodResolver(ForgotPasswordSchema),
        defaultValues: {
            email: ""
        },
    });

    function onSubmit(values: z.infer<typeof ForgotPasswordSchema>) {
        setSuccess("");
        setError("");

        startTransition(() => { 
            resetPassword(values).then((res) => {
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
            headerLabel={"Forgot your password? "}
            backButtonLabel={"Back to  "}
            backButtonLinkLabel={"Login"}
            backButtonLink="/login"
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
                                    <Input placeholder="john.doe@example.com" {...field} />
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
                            Send reset email
                        </Button>
                    </div>
                </form>
            </Form>
        </CardWarapper>
    );
};

export default ForgotPasswordForm;
