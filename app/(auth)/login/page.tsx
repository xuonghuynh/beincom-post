"use client";
import LoginForm from "@/app/(auth)/_components/LoginForm";
import React from "react";

const LoginPage = () => {
    return (
        <div className="flex min-h-[50vh] w-[40%] items-center justify-center py-20">
            <LoginForm />
        </div>
    );
};

export default LoginPage;
