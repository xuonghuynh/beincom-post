import NewPasswordForm from "@/app/(auth)/_components/NewPasswordForm";
import React from "react";

const NewPasswordPage = () => {
    return (
        <div className="flex min-h-[50vh] w-[40%] items-center justify-center py-20">
            <NewPasswordForm />
        </div>
    );
};

export default NewPasswordPage;
