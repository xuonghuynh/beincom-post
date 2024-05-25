import AvataAndName from "@/components/AvataAndName";
import CommentAction from "@/components/CommentAction";
import { PostChildProps } from "@/types/types";
import Link from "next/link";
import React, { useEffect } from "react";

const ShowComment = ({ post }: PostChildProps) => {
    const [comment, setComment] = React.useState<any>(null);
    const postComment = post.comments;
    const lastComment = postComment[postComment.length - 1];

    useEffect(() => {
        if (post.comments.length > 0) {
            setComment(lastComment);
        }
    }, [lastComment, post.comments.length]);

    if (!comment) return null;

    return (
        <div>
            <div className="text-sm italic mt-4 hover:text-violet-500 cursor-pointer w-fit">{post.comments.length > 1 && <Link href={`/posts/${post.id}?scrollToComment=true`}>View all comments</Link>}</div>
            <div className="flex items-start gap-1 p-4 pl-0">
                <AvataAndName
                    image={comment.author.image}
                    name={comment.author.name}
                    hideName
                />
                <div className="p-4 bg-gray-100 w-full rounded-md">
                    {comment.content}
                </div>
            </div>
            <CommentAction post={post} />
        </div>
    );
};

export default ShowComment;
