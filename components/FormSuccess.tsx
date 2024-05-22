import React from "react";
import { CircleCheck } from "lucide-react";

type FormErrorProps = {
    message?: string;
};

const FormSuccess = ({ message }: FormErrorProps) => {
    if (!message) return null;
    return (
        <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
            <CircleCheck />
            <p>{message}</p>
        </div>
    );
};

export default FormSuccess;
