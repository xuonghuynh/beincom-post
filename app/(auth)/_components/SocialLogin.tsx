"use client";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_USER_LOGIN_REDIRECT } from "@/routes";

const SocialLogin = () => {
    const onClick = (provider: "google" | "github") => {
        signIn(provider, {
            callbackUrl: DEFAULT_USER_LOGIN_REDIRECT,
        });
    };
    return (
        <div className="flex w-full items-center gap-x-2">
            <Button
                variant={"outline"}
                size={"lg"}
                className="w-full"
                data-testid="google-login"
                onClick={() => onClick("google")}
            >
                <FcGoogle className="h-5 w-5" />
            </Button>
            <Button
                variant={"outline"}
                size={"lg"}
                className="w-full"
                data-testid="github-login"
                onClick={() => onClick("github")}
            >
                <FaGithub className="h-5 w-5" />
            </Button>
        </div>
    );
};

export default SocialLogin;
