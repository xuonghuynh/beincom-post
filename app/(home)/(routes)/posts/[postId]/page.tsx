"use client";
import AvataAndName from "@/components/AvataAndName";
import ContainerWrapper from "@/components/ContainerWrapper";
import PostContent from "@/components/PostContent";
import { useGetPost } from "@/hooks/useGetPost";
import React from "react";

const PostPage = ({ params }: { params: { postId: string } }) => {
    const postId = params.postId;

    const { data, status, error } = useGetPost(postId);

    return (
        <ContainerWrapper>
            <div className="flex justify-center pt-6 mb-20">
                <div className="max-w-layout-main-pane min-w-layout-main-pane bg-white p-4 rounded-md w-full">
                    {status === "pending" ? (
                        "Loading..."
                    ) : status === "error" ? (
                        <span>Error: {error.message}</span>
                    ) : status === "success" && !data ? (
                        <div className="italic">Post not found</div>
                    ) : (
                        <PostContent post={data} showAllComment />
                    )}
                </div>
            </div>
        </ContainerWrapper>
    );
};

export default PostPage;
