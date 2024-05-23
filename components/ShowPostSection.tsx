'use client';
import { Post, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

import PostContent from "@/components/PostContent";

type PostProps = Post & {
    author: User;
};

const ShowPostSection = () => {
    const { data: posts, isLoading, error } = useQuery({
        queryKey: ["posts"],
        queryFn: () => {
            return axios.get("/api/post").then((res) => res.data);
        },
    });
    console.log(posts)
    
    return (
        <div>
            {posts?.map((post: PostProps) => (
                <div key={post.id} className="p-4 bg-white rounded-md mt-4">
                    <PostContent post={post} />
                </div>
            ))}
        </div>
    );
};

export default ShowPostSection;
