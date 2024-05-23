"use client";
import LeftSidebar from "@/app/(home)/_components/LeftSidebar";
import NewPostButton from "@/components/NewPostButton";
import ShowPostSection from "@/components/ShowPostSection";
import WhiteBoxWrapper from "@/components/WhileWrapper";

export default function Home() {
    return (
        <div className="container pt-20">
            <div className="flex items-start justify-between gap-x-4 md:gap-x-11">
                <div className=" max-w-layout-side-pane flex-grow sticky top-20">
                    <WhiteBoxWrapper className="!p-2 ">
                        <LeftSidebar />
                    </WhiteBoxWrapper>
                </div>
                <div className="flex-grow">
                    <WhiteBoxWrapper className="!px-1">
                        <NewPostButton />
                    </WhiteBoxWrapper>
                    <ShowPostSection />
                </div>
                <div className="max-w-layout-side-pane flex-grow sticky top-20">
                    <WhiteBoxWrapper>
                        <div></div>
                    </WhiteBoxWrapper>
                </div>
            </div>
        </div>
    );
}
