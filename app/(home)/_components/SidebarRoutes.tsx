"use client";
import SidebarRouteItem from "@/app/(home)/_components/SidebarRouteItem";
import { Bookmark, Boxes, Heart, Layout, ShoppingBag, Tag, User, Users } from "lucide-react";
import React from "react";

const routesMenu = [
    {
        lable: "Home",
        href: "/",
        icon: Layout,
    },
    {
        lable: "People",
        href: "/people",
        icon: User,
    },
    {
        lable: "Liked Posts",
        href: "/liked-posts",
        icon: Heart,
    }
];

const SidebarRoutes = () => {
    return (
        <div className="flex w-full flex-col">
            {routesMenu.map((route) => {
                return (
                    <SidebarRouteItem
                        key={route.href}
                        lable={route.lable}
                        icon={route.icon}
                        href={route.href}
                    />
                );
            })}
        </div>
    );
};

export default SidebarRoutes;
