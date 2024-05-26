"use client";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import Link from "next/link";
import React from "react";

const LikedPostButton = () => {
    return (
        <Link
            href="/posts/liked"
            className="relative hover:bg-transparent hover:text-amber-900"
        >
            <div className="flex flex-col items-center gap-1">
                <Heart className="h-[18px] w-[18px]" />
                <span className="text-xs font-medium uppercase">Liked Post</span>
            </div>
        </Link>
    );
};

export default LikedPostButton;
