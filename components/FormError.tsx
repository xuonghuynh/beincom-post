import React from "react";
import { TriangleAlert } from "lucide-react";

type FormErrorProps = {
    message?: string;
};

const FormError = ({ message }: FormErrorProps) => {
    if (!message) return null;
    return (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
            <TriangleAlert />
            <p>{message}</p>
        </div>
    );
};

export default FormError;
