"use client";

import { verificationEmail } from "@/actions/auth/verification";
import CardWarapper from "@/app/(auth)/_components/CardWrapper";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import { PropagateLoader } from "react-spinners";

const VerificationForm = () => {
    const [error, setError] = React.useState<string | undefined>("");
    const [success, setSuccess] = React.useState<string | undefined>("");
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback(async () => {
        if(!token) {
            setError("Missing token")
            return
        }
        verificationEmail(token).then((res) => {
            if(res.error) {
                setError(res.error)
            }
            if(res.success) {
                setSuccess(res.success)
            }
        })
    }, [token]);

    useEffect(() => {
        onSubmit()
    }, [onSubmit])

    return (
        <div className="flex min-h-[50vh] w-full items-center justify-center py-20">
            <CardWarapper
                headerLabel="Verifying your email"
                backButtonLabel="Back to "
                backButtonLinkLabel="Login"
                backButtonLink="/login"
            >
                <div className="flex items-center justify-center w-full" >
                    {!error && !success ? <PropagateLoader className="mt-10 mb-10" color="#83543d" /> : null}
                    <FormSuccess message={success} />
                    <FormError message={error} />
                </div>
            </CardWarapper>
        </div>
    );
};

export default VerificationForm;
