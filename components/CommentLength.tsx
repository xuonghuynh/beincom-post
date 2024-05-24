import React from "react";

const CommentLength = ({ length }: { length: number }) => {
    return (
        <div>
            {length > 0 && (
                <div className="text-xs">
                    {length} {length > 1 ? "comments" : "comment"}
                </div>
            )}
        </div>
    );
};

export default CommentLength;
