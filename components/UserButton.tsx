'use client';
import React from "react";
import { signOut } from "next-auth/react";
import { ClipboardList, LogOut } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { shortName } from "@/hooks/shortName";

const UserButton = () => {
    const user = useCurrentUser();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="flex items-center gap-x-4">
                    <Avatar>
                        <AvatarImage src={user?.image || ""} />
                        <AvatarFallback>{shortName(user?.name!)}</AvatarFallback>
                    </Avatar>
                    <div className="text-left hidden md:block">
                        <p className="text-sm font-medium">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">
                            {user?.email}
                        </p>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <div
                        className="flex cursor-pointer items-center"
                        onClick={() => {}}
                    >
                        <ClipboardList className="mr-2 h-4 w-4" />
                        Profile
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <div
                        className="flex cursor-pointer items-center"
                        onClick={() => signOut()}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserButton;
