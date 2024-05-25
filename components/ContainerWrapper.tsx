import React from "react";

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

const ContainerWrapper = ({ children, className }: ContainerProps) => {
    return (
        <div
            className={`relative overflow-y-auto overflow-x-hidden h-[calc(100vh-60px)] top-[60px] w-screen ${className}`}
        >
            {children}
        </div>
    );
};

export default ContainerWrapper;
