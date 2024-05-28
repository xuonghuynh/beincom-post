import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import WelcomeSection from "@/components/WelcomeSection"; // Adjust the import path if necessary
import { useGetUsers } from "@/hooks/useGetUsers";
import { User } from "@prisma/client";
import { SessionProvider, useSession } from "next-auth/react";

// Mock the next-auth/react module
vi.mock("next-auth/react", () => ({
    useSession: vi.fn(() => ({
        data: { user: { name: "Test User", email: "test@example.com" } },
        status: "authenticated",
    })),
    SessionProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock the useGetUsers hook
vi.mock("@/hooks/useGetUsers", () => ({
    useGetUsers: vi.fn(),
}));

describe("WelcomeSection component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should render loading state", () => {
        (useGetUsers as Mock).mockReturnValue({
            status: "pending",
        });

        render(
            <SessionProvider session={null}>
                <WelcomeSection />
            </SessionProvider>
        );

        expect(screen.getByTestId("skeleton-user")).toBeInTheDocument();
    });

    it("should render error state", () => {
        (useGetUsers as Mock).mockReturnValue({
            status: "error",
            error: new Error("Failed to fetch users"),
        });

        render(
            <SessionProvider session={null}>
                <WelcomeSection />
            </SessionProvider>
        );

        expect(screen.getByText("Error: Failed to fetch users")).toBeInTheDocument();
    });

    it("should render users when data is fetched", () => {
        const users: User[] = [
            { id: "1", name: "John Doe", email: "john@example.com", image: "/john.jpg", emailVerified: new Date(), createdAt: new Date(), updatedAt: new Date(), password: "password123" },
            { id: "2", name: "Jane Smith", email: "jane@example.com", image: "/jane.jpg", emailVerified: new Date(), createdAt: new Date(), updatedAt: new Date(), password: "password123" },
        ];

        (useGetUsers as Mock).mockReturnValue({
            status: "success",
            data: users,
        });

        (useSession as Mock).mockReturnValue({
            data: { user: { name: "Current User", email: "current@example.com" } },
            status: "authenticated",
        });

        render(
            <SessionProvider session={null}>
                <WelcomeSection />
            </SessionProvider>
        );

        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("john@example.com")).toBeInTheDocument();
        expect(screen.getByText("Jane Smith")).toBeInTheDocument();
        expect(screen.getByText("jane@example.com")).toBeInTheDocument();
    });

    it("should render no users when data is empty", () => {
        (useGetUsers as Mock).mockReturnValue({
            status: "success",
            data: [],
        });

        render(
            <SessionProvider session={null}>
                <WelcomeSection />
            </SessionProvider>
        );

        expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
        expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
    });
});
