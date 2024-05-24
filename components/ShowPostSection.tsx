"use client";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import PostContent from "@/components/PostContent";
import { usePosts } from "@/hooks/useGetPosts";
import { toast } from "sonner";
import { PostProps } from "@/types/types";

const ShowPostSection = () => {
    const { ref, inView } = useInView();
    const {
        data,
        error,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isSuccess,
        isFetchingNextPage,
    } = usePosts();

    useEffect(() => {
        if (inView && hasNextPage) {
            console.log("object");
            fetchNextPage();
        }
    }, [hasNextPage, inView, fetchNextPage]);

    if (error) {
        console.log(error);
        toast.error("Something went wrong when fetch posts");
    }

    return (
        <div className="mt-10 h-screen">
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

            {(isLoading || isFetchingNextPage) && (
                <p className="mb-4">Loading...</p>
            )}
        </div>
    );
};

export default ShowPostSection;
