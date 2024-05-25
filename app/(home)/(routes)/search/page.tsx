"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import ContainerWrapper from "@/components/ContainerWrapper";
import { useGetPostBySearch } from "@/hooks/useGetPostBySearch";
import PostContent from "@/components/PostContent";
import WhiteBoxWrapper from "@/components/WhileWrapper";

interface SearchPageProps {
    searchParams: { content: string };
}

const SearchPage = () => {
    const searchParams = useSearchParams();
    const content = searchParams.get("content");
    const { data: posts, status, error } = useGetPostBySearch(content || "");

    return (
        <ContainerWrapper>
            <div className="flex flex-col items-center pt-6 mb-20">
                <div className="max-w-layout-main-pane min-w-layout-main-pane w-full">
                    {status === "pending" ? (
                        "Loading..."
                    ) : status === "error" ? (
                        <span>Error: {error.message}</span>
                    ) : status === "success" && !posts ? (
                        <div className="italic">Post not found</div>
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
            </div>
        </ContainerWrapper>
    );
};

export default SearchPage;
