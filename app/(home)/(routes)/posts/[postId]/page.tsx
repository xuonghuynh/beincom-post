"use client";
import AvataAndName from "@/components/AvataAndName";
import ContainerWrapper from "@/components/ContainerWrapper";
import PostContent from "@/components/PostContent";
import { SkeletonPost } from "@/components/PostSkeleton";
import { useGetPost } from "@/hooks/useGetPost";
import React from "react";

const PostPage = ({ params }: { params: { postId: string } }) => {
    const postId = params.postId;

    const { data, status, error } = useGetPost(postId);

    return (
        <ContainerWrapper>
            <div className="flex justify-center pt-6 mb-20 p-4">
                <div className="max-w-layout-main-pane md:min-w-layout-main-pane bg-white p-4 rounded-md w-full">
                    {status === "pending" ? (
                        <SkeletonPost />
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
