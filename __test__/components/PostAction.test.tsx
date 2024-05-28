import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PostAction from "@/components/PostAction";

vi.mock("@/hooks/useCurrentUser", () => ({
    useCurrentUser: () => ({ id: "user1" }),
}));

const mockMutate = vi.fn();
vi.mock("@/hooks/useSetLike", () => ({
    useSetLike: () => ({ mutate: mockMutate }),
}));

vi.mock("next/link", () => ({
    default: ({ children }: { children: React.ReactNode }) => children,
}));

describe("PostAction", () => {
    const postData = {
        id: "post1",
        likes: [
            {
                id: "like1",
                userId: "user1",
                postId: "post1",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
        comments: [
            {
                id: "comment1",
                content: "Comment 1",
                authorId: "user1",
                postId: "post1",
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ],
    };

    it("renders PostAction with provided props", () => {
        render(<PostAction post={postData} />);

        expect(screen.getByText("Like")).toBeInTheDocument();
        expect(screen.getByText("Comment")).toBeInTheDocument();
    });

    it("renders number of likes and comments with provided props", () => {
        render(<PostAction post={postData} />);

        expect(screen.getByText("1 like")).toBeInTheDocument();
        expect(screen.getByText("1 comment")).toBeInTheDocument();
    });

    it("handles like button click", () => {
        render(<PostAction post={postData} />);

        fireEvent.click(screen.getByText("Like"));
        expect(mockMutate).toHaveBeenCalledWith("post1");
    });
});
