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
import { NewPasswordSchema } from "@/schemas";
import { useSearchParams } from "next/navigation";
import { newPasswordReset } from "@/actions/auth/new-password";
import CardWarapper from "@/app/(auth)/_components/CardWrapper";

const NewPasswordForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token")
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: ""
        },
    });

    function onSubmit(values: z.infer<typeof NewPasswordSchema>) {
        setSuccess("");
        setError("");

        startTransition(() => { 
            if(!token) {
                setError("Missing token")
                return
            }
            newPasswordReset(values, token).then((res) => {
                if(res.error) {
                    setError(res.error)
                }
                if(res.success) {
                    setSuccess(res.success)
                }
            })
        });
    }
    return (
        <CardWarapper
            headerLabel={"Reset your password"}
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
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="" {...field} />
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
                            Reset Password
                        </Button>
                    </div>
                </form>
            </Form>
        </CardWarapper>
    );
};

export default NewPasswordForm;
