import AvataAndName from "@/components/AvataAndName";
import CommentAction from "@/components/CommentAction";
import { PostChildProps } from "@/types/types";
import ReactTimeAgo from "react-time-ago";
import React from "react";

const ShowAllComment = ({ post }: PostChildProps) => {
    return (
        <div>
            <CommentAction post={post} />
            {[...post.comments].reverse().map((comment: any) => (
                <div
                    key={comment.id}
                    className="flex items-start gap-x-4 py-4 "
                >
                    <div className="mt-3">
                        <AvataAndName
                            image={comment.author.image}
                            name={comment.author.name}
                            hideName
                        />
                    </div>
                    <div className="p-4 bg-gray-100 w-full rounded-md">
                        <div className="flex items-center justify-between">
                            <div className="font-semibold">
                                {comment.author.name}
                            </div>
                            <div className="text-xs font-medium">
                                <ReactTimeAgo
                                    date={new Date(comment.createdAt)}
                                    locale="en-US"
                                    timeStyle="twitter"
                                />
                            </div>
                        </div>
                        <div className="mt-2 font-normal text-base">{comment.content}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ShowAllComment;
