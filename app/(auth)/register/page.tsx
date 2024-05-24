"use client";
import RegisterForm from "@/app/(auth)/_components/RegisterForm";
import React from "react";

const RegisterPage = () => {
    return (
        <div className="flex h-screen items-center justify-center py-20">
            <RegisterForm />
        </div>
    );
};

export default RegisterPage;
