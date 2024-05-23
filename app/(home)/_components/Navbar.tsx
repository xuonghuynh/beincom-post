import React from "react";
// import { getCollections } from "@/actions/get-collections";
// import MobileSidebar from "@/app/(landing)/_components/MobileSidebar";
import Logo from "@/components/Logo";
import SearchInput from "@/components/SearchInput";
import UserButton from "@/components/UserButton";
// import ShoppingCartButton from "@/components/ShoppingCart";
// import UserInfo from "@/components/UserInfo";

const Navbar = async () => {
    return (
        <div className="fixed top-0 z-header h-navbar w-screen gap-x-6 border-b bg-white px-6 shadow-1 flex-center xl:gap-x-12 xl:px-12 h-[60px]">
            <div className="container hidden h-full items-center justify-between px-8 md:flex">
                <Logo />
                <SearchInput />
                <UserButton />
            </div>
            <div className="= container flex h-full items-center justify-between px-4 md:hidden">
                {/* <MobileSidebar /> */}
                <Logo />
                <div>User</div>
                {/* <ShoppingCartButton /> */}
            </div>
        </div>
    );
};

export default Navbar;
