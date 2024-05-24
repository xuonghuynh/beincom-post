import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { shortName } from "@/hooks/shortName";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

type AvataAndNameProps = {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    publishedAt?: any;
    hideName?: boolean;
};

const AvataAndName = ({
    name,
    email,
    image,
    publishedAt,
    hideName = false,
}: AvataAndNameProps) => {
    const user = useCurrentUser();
    return (
        <div className="flex items-center gap-x-4">
            <Avatar>
                <AvatarImage src={image || ""} />
                <AvatarFallback className="uppercase">
                    {shortName(name!)}
                </AvatarFallback>
            </Avatar>
            <div className="text-left hidden md:block">
                <div className="flex items-center gap-x-1">
                    {!hideName && (
                        <p className="text-sm font-medium">{user?.name}</p>
                    )}
                    {publishedAt && <p className="text-xs">•</p>}
                    {publishedAt && (
                        <div className="flex w-fit text-sm font-normal text-neutral-40">
                            <ReactTimeAgo
                                date={publishedAt}
                                locale="en-US"
                                timeStyle="twitter"
                            />
                        </div>
                    )}
                </div>
                {email && (
                    <p className="text-xs text-muted-foreground">{email}</p>
                )}
            </div>
        </div>
    );
};

export default AvataAndName;
