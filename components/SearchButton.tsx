"use client";
import { Search } from "lucide-react";
import React, { useEffect } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import SearchInput from "@/components/SearchInput";

const SearchButton = ({ isMobileNavbar }: { isMobileNavbar?: boolean }) => {
    const [isMounted, setIsMounted] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    

    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) return null;

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="p-0 hover:bg-transparent hover:text-amber-900">
                {isMobileNavbar ? (
                    <div className="flex flex-col items-center gap-1">
                        <Search className="h-[18px] w-[18px]" />
                        <span className="text-xs font-medium uppercase">
                            Search
                        </span>
                    </div>
                ) : (
                    <Search className="h-[22px] w-[22px]" />
                )}
            </SheetTrigger>
            <SheetContent side={"top"} className="py-20">
                <div className="mx-auto max-w-[1140px]">
                    <SheetHeader>
                        <SheetTitle className="mb-5 text-center text-[28px]">
                            What are you looking for?
                        </SheetTitle>
                        <SheetDescription asChild>
                            <div className="w-full md:flex md:items-center md:justify-center">
                                <SearchInput onChange={() => setOpen(false)} />
                            </div>
                        </SheetDescription>
                    </SheetHeader>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default SearchButton;
