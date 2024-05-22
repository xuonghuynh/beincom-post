"use client";
import RegisterForm from "@/app/(auth)/_components/RegisterForm";
import React from "react";

const RegisterPage = () => {
    return (
        <div className="flex min-h-[50vh] w-[40%] items-center justify-center py-20">
            <RegisterForm />
        </div>
    );
};

export default RegisterPage;
