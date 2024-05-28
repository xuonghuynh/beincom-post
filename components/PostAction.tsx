import CommentLength from "@/components/CommentLength";
import LikeLength from "@/components/LikeLength";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { PostChildProps } from "@/types/types";
import { Comment, Like, Post } from "@prisma/client";
import { MessageCircle, ThumbsUp } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import { useSetLike } from "@/hooks/useSetLike";
import Link from "next/link";

interface PostProps {
    post: {
        id: string,
    } & {
        likes: Like[],
        comments: Comment[]
    }
}

const PostAction = ({ post }: PostProps ) => {
    const user = useCurrentUser();
    const userId = user?.id;

    const { mutate: mutateLike, data, isSuccess } = useSetLike(post.id);

    return (
        <div className="flex items-center justify-between gap-2 border-t border-b py-2 mt-4">
            <div className="flex items-center gap-2">
                <Button
                    className="flex items-center gap-2"
                    variant="ghost"
                    onClick={() => mutateLike(post.id)}
                >
                    {post.likes.some((like: Like) => like.userId === userId) ? (
                        <FaThumbsUp className="h-4 w-4 text-fuchsia-500" />
                    ) : (
                        <FaRegThumbsUp className="h-4 w-4" />
                    )}
                    Like
                </Button>
                <Link href={`/posts/${post.id}`}>
                    <Button className="flex items-center gap-2" variant="ghost">
                        <MessageCircle className="h-4 w-4" />
                        Comment
                    </Button>
                </Link>
            </div>
            <div className="flex items-center gap-2">
                <LikeLength length={post.likes.length} />
                <CommentLength length={post.comments.length} />
            </div>
        </div>
    );
};

export default PostAction;
