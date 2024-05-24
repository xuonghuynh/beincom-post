import CommentLength from "@/components/CommentLength";
import LikeLength from "@/components/LikeLength";
import { Button } from "@/components/ui/button";
import { PostChildProps } from "@/types/types";
import axios from "axios";
import { MessageCircle, ThumbsUp } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const PostAction = ({ post }: PostChildProps) => {
    const onClickLike = async(postId: string) => {
        console.log(postId);
        try {
            const res = await axios.post("/api/like", { postId });
            if(res.status === 200) {
                console.log(res)
                toast.success("Like post successfully");
            }
        } catch (error) {
            
            console.log(error);
        }
    }
    return (
        <div className="flex items-center justify-between gap-2 border-t border-b py-2 mt-4">
            <div className="flex items-center gap-2">
                <Button className="flex items-center gap-2" variant="ghost" onClick={() => onClickLike(post.id)}>
                    <ThumbsUp className="h-4 w-4" />
                    Like
                </Button>
                <Button className="flex items-center gap-2" variant="ghost">
                    <MessageCircle className="h-4 w-4" />
                    Comment
                </Button>
            </div>
            <div className="flex items-center gap-2">
                <LikeLength length={post.likes.length} />
                <CommentLength length={post.comments.length} />
            </div>
        </div>
    );
};

export default PostAction;
