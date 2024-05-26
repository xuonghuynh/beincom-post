"use client";
import LeftSidebar from "@/app/(home)/_components/LeftSidebar";
import ContainerWrapper from "@/components/ContainerWrapper";
import NewPostButton from "@/components/NewPostButton";
import ShowPostSection from "@/components/ShowPostSection";
import WelcomeSection from "@/components/WelcomeSection";
import WhiteBoxWrapper from "@/components/WhileWrapper";

export default function Home() {
    return (
        <ContainerWrapper>
            <div className="flex items-start justify-center gap-x-12 px-6 xl:px-12">
                <div className="min-w-layout-side-pane max-w-layout-side-pane grow sticky top-0 pt-6 hidden lg:block">
                    <WhiteBoxWrapper className="!p-2 ">
                        <LeftSidebar />
                    </WhiteBoxWrapper>
                </div>
                <div className="flex-grow max-w-layout-main-pane md:min-w-layout-main-pane pt-6 mb-20">
                    <WhiteBoxWrapper className="!px-1">
                        <NewPostButton />
                    </WhiteBoxWrapper>
                    <ShowPostSection />
                </div>
                <div className="min-w-layout-side-pane max-w-layout-side-pane grow sticky top-0 pt-6 hidden xl:block">
                    <WhiteBoxWrapper>
                        <WelcomeSection />
                    </WhiteBoxWrapper>
                </div>
            </div>
        </ContainerWrapper>
    );
}
