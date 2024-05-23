// import SearchButton from "@/components/SearchButton";
// import ShoppingCartButton from "@/components/ShoppingCart";
// import WishlistButton from "@/components/WishlistButton";
import { Home } from "lucide-react";
import Link from "next/link";
import React from "react";

const MobileNavbar = () => {
    return (
        <div className="fixed bottom-0 z-[10] w-full bg-white px-4 py-3 md:hidden">
            <div className="flex items-center justify-between">
                <Link className="flex flex-col items-center gap-1" href="/">
                    <Home className="h-[18px] w-[18px]" />
                    <span className="text-xs uppercase font-medium">Home</span>
                </Link>
                {/* <SearchButton isMobileNavbar />
                <WishlistButton isMobileNavbar /> */}
            </div>
        </div>
    );
};

export default MobileNavbar;
