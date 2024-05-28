import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PostAction from "@/components/PostAction";
import { title } from "process";

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
        content: "Post 1",
        authorId: "user1",
        publishedAt: new Date(),
        published: true,
        title: "Post 1",
        imageUrl: "image.png",
        createdAt: new Date(),
        updatedAt: new Date(),
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
                author: {
                    id: "user1",
                    name: "User 1",
                    email: "user1@example.com",
                    image: "image.png",
                    emailVerified: new Date(),
                    password: "password123",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
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
