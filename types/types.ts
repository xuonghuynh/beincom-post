import { Like, Post, Comment } from "@prisma/client";
import { User } from "next-auth";

export type PostProps = Post & {
    author: User;
    comments: Comment &
        {
            author: User;
        }[];
    likes: Like[];
};

export type PostChildProps = {
    post: Post & {
        author: User;
        comments: Comment &
            {
                author: User;
            }[];
        likes: Like[];
    };
};
