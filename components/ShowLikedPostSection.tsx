"use client";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import PostContent from "@/components/PostContent";
import { toast } from "sonner";
import { PostProps } from "@/types/types";
import { SkeletonPost } from "@/components/PostSkeleton";
import { useGetLikedPosts } from "@/hooks/useGetLikedPost";

const ShowLikedPostSection = () => {
    const { ref, inView } = useInView();
    const {
        data,
        error,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isSuccess,
        isFetchingNextPage,
    } = useGetLikedPosts();

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [hasNextPage, inView, fetchNextPage]);

    if (error) {
        console.log(error);
        toast.error("Something went wrong when fetch posts");
    }
    return (
        <div className="mt-6">
            {isSuccess &&
                data?.pages.map((page) =>
                    page.data.map((post: PostProps, index: number) => {
                        if (page.data.length === index + 1) {
                            return (
                                <div
                                    ref={ref}
                                    key={post.id}
                                    className="p-4 bg-white rounded-md mt-4"
                                >
                                    <PostContent post={post} />
                                </div>
                            );
                        } else {
                            return (
                                <div
                                    key={post.id}
                                    className="p-4 bg-white rounded-md mt-4"
                                >
                                    <PostContent post={post} />
                                </div>
                            );
                        }
                    })
                )}

            {(isLoading || isFetchingNextPage) && <SkeletonPost />}
        </div>
    );
};

export default ShowLikedPostSection;
