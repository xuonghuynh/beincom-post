import React from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import SocialLogin from "@/app/(auth)/_components/SocialLogin";

type CardWarapperProps = {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonLinkLabel: string;
    backButtonLink: string;
    showSocialLogin?: boolean;
};

const CardWarapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonLinkLabel,
    backButtonLink,
    showSocialLogin,
}: CardWarapperProps) => {
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle className="text-center">{headerLabel}</CardTitle>
            </CardHeader>
            <CardContent>{children}</CardContent>
            <CardFooter className="flex flex-col items-center justify-center gap-4 mb-5">
                <Link className="text-sm mb-4" href={backButtonLink}>
                    {backButtonLabel}
                    <span className="underline">{backButtonLinkLabel}</span>
                </Link>
                {showSocialLogin && <SocialLogin />}
            </CardFooter>
        </Card>
    );
};

export default CardWarapper;
