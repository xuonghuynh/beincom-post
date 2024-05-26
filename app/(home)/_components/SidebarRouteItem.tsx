"use client";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface SidebarItemProps {
    lable: string;
    href: string;
    icon: LucideIcon;
}

const SidebarRouteItem = ({ lable, icon: Icon, href }: SidebarItemProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const isActive = href==="/" && pathname !== href ? false : pathname.startsWith(href);

    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-x-2 pl-6 text-sm font-[500] text-slate-500 transition-all hover:bg-purple-200/20 hover:text-slate-600 rounded-md",
                isActive &&
                    "bg-purple-200/20 text-purple-700 hover:bg-purple-200/20 hover:text-purple-700",
            )}
        >
            <div className="flex items-center gap-x-2 py-4">
                <Icon
                    size={22}
                    className={cn(
                        "text-slate-500",
                        isActive && "text-purple-700",
                    )}
                />
                {lable}
            </div>
        </Link>
    );
};

export default SidebarRouteItem;
