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

    const isActive = href==="/dashboard" && pathname !== href ? false : pathname.startsWith(href);

    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-x-2 pl-6 text-sm font-[500] text-slate-500 transition-all hover:bg-fuchsia-300/20 hover:text-slate-600 rounded-md",
                isActive &&
                    "bg-orange-200/20 text-orange-700 hover:bg-orange-200/20 hover:text-orange-700",
            )}
        >
            <div className="flex items-center gap-x-2 py-4">
                <Icon
                    size={22}
                    className={cn(
                        "text-slate-500",
                        isActive && "text-orange-700",
                    )}
                />
                {lable}
            </div>
            <div
                className={cn(
                    "ml-auto h-[54px] border-2 border-orange-700 opacity-0 transition-all",
                    isActive && "opacity-100",
                )}
            />
        </Link>
    );
};

export default SidebarRouteItem;
