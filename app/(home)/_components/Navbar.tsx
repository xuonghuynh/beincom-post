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
        <div className="fixed top-0 z-10 h-navbar w-screen gap-x-6 border-b bg-white shadow-1 h-[60px]">
            <div className="flex items-center justify-between lg:justify-center gap-x-12 h-full px-6 xl:px-12">
                <div className="md:min-w-layout-side-pane max-w-layout-side-pane grow xl:flex">
                    <Logo />
                </div>
                <div className="min-w-layout-main-pane max-w-layout-main-pane grow hidden lg:block">
                    <SearchInput />
                </div>
                <div className="md:min-w-layout-side-pane max-w-layout-side-pane md:grow ">
                    <UserButton />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
