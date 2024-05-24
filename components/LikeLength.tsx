import React from "react";

const LikeLength = ({ length }: { length: number }) => {
    return (
        <div>
            {length > 0 && (
                <div className="text-xs">
                    {length} {length > 1 ? "likes" : "like"}
                </div>
            )}
        </div>
    );
};

export default LikeLength;
