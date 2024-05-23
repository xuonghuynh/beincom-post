import React from "react";

interface WhiteBoxProps {
    children: React.ReactNode;
    className?: string;
}

const WhiteBoxWrapper = ({ children, className }: WhiteBoxProps) => {
    return (
        <div className={`h-full w-full rounded-lg bg-white p-6 ${className}`}>{children}</div>
    );
};

export default WhiteBoxWrapper;
