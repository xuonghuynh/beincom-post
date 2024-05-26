'use client';
import LeftSidebar from "@/app/(home)/_components/LeftSidebar";
import ContainerWrapper from "@/components/ContainerWrapper";
import NewPostButton from "@/components/NewPostButton";
import ShowLikedPostSection from "@/components/ShowLikedPostSection";
import ShowPostSection from "@/components/ShowPostSection";
import WelcomeSection from "@/components/WelcomeSection";
import WhiteBoxWrapper from "@/components/WhileWrapper";
import React from "react";

const LikedPostPage = () => {
    return (
        <ContainerWrapper>
            <div className="flex items-start justify-center gap-x-12 px-6 xl:px-12">
                <div className="md:min-w-layout-side-pane max-w-layout-side-pane grow sticky top-0 pt-6 hidden lg:block">
                    <WhiteBoxWrapper className="!p-2 ">
                        <LeftSidebar />
                    </WhiteBoxWrapper>
                </div>
                <div className="flex-grow max-w-layout-main-pane md:min-w-layout-main-pane mb-20">
                    <ShowLikedPostSection />
                </div>
                <div className="min-w-layout-side-pane max-w-layout-side-pane grow sticky top-0 pt-6 hidden xl:block">
                    <WhiteBoxWrapper>
                        <WelcomeSection />
                    </WhiteBoxWrapper>
                </div>
            </div>
        </ContainerWrapper>
    );
};

export default LikedPostPage;
