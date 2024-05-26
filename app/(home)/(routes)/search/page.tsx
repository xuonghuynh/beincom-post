"use client";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ContainerWrapper from "@/components/ContainerWrapper";
import { useGetPostBySearch } from "@/hooks/useGetPostBySearch";
import PostContent from "@/components/PostContent";
import WhiteBoxWrapper from "@/components/WhileWrapper";
import { DateRangePicker } from "@/components/CalendarFilter";
import qs from "query-string";

interface SearchPageProps {
    searchParams: { content: string };
}

const SearchPage = () => {
    const pathName = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentSearchContent = searchParams.get("content");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const date = {
        from: startDate,
        to: endDate,
    }

    const { data: posts, status, error } = useGetPostBySearch({content: currentSearchContent || "", date});


    const handleOnUpdate = (values: any) => {
        console.log(values)
        const url = qs.stringifyUrl(
            {
                url: pathName,
                query: {
                    content: currentSearchContent,
                    startDate: values.range.from,
                    endDate: values.range.to,
                },
            },
            { skipNull: true, skipEmptyString: true }
        );
        router.push(url);
    };

    return (
        <ContainerWrapper>
            <div className="flex items-start justify-center gap-x-12 px-6 xl:px-12">
                <div className="min-w-layout-side-pane max-w-layout-side-pane grow sticky top-0 pt-6">
                    <WhiteBoxWrapper className="p-4">
                        <div className="flex items-center gap-2">
                            {/* <Calendar className="w-5 h-5" /> */}
                            <div className="font-semibold">Filter by date</div>
                        </div>
                        <div className="mt-4">
                            <DateRangePicker
                                showCompare={false}
                                align="start"
                                onUpdate={(values) => handleOnUpdate(values)}
                            />
                        </div>
                    </WhiteBoxWrapper>
                </div>
                <div className="max-w-layout-main-pane min-w-layout-main-pane w-full pt-6">
                    {status === "pending" ? (
                        "Loading..."
                    ) : status === "error" ? (
                        <span>Error: {error.message}</span>
                    ) : status === "success" && !posts ? (
                        <div className="italic">Post not found</div>
                    ) : status === "success" && posts.length === 0 ? (
                        <div className="italic">Sorry, we couldn&apos;t find anything related to your search.</div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {posts.map((post: any) => (
                                <WhiteBoxWrapper key={post.id}>
                                    <PostContent post={post} />
                                </WhiteBoxWrapper>
                            ))}
                        </div>
                    )}
                </div>
                <div className="min-w-layout-side-pane max-w-layout-side-pane grow sticky top-0 pt-6"></div>
            </div>
        </ContainerWrapper>
    );
};

export default SearchPage;
