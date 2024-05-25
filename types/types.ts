import { Like, Post, Comment, User } from "@prisma/client";

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

export type PostContentProps = PostChildProps & {
    showAllComment?: boolean;
}

export type CommentProps = Comment & {
    author: User;
}
