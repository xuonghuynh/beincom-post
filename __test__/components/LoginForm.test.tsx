import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { login } from "@/actions/auth/login";
import { useSearchParams } from "next/navigation";
import LoginForm from "@/app/(auth)/_components/LoginForm";

// Mock the login function
vi.mock("@/actions/auth/login", () => ({
    login: vi.fn(),
}));

// Mock the useSearchParams hook
vi.mock("next/navigation", () => ({
    useSearchParams: vi.fn(),
}));

const mockGet = vi.fn();
mockGet.mockReturnValue('5000');

(useSearchParams as jest.Mock).mockReturnValue({
  get: mockGet,
});

describe("LoginForm component", () => {
    it("should render the form with all fields and submit button", () => {
        render(<LoginForm />);

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /forgot password/i })).toBeInTheDocument();
    });

    it("should show validation errors if form is submitted empty", async () => {
        render(<LoginForm />);

        const submitButton = screen.getByRole("button", { name: /sign in/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText("Email is required")).toBeInTheDocument();
            expect(screen.getByText("Password is required")).toBeInTheDocument();
        });
    });

    it("should call login function with form data when form is submitted", async () => {
        const mockLogin = login as jest.Mock;
        mockLogin.mockResolvedValue({ success: "Login successful" });

        render(<LoginForm />);

        fireEvent.input(screen.getByLabelText(/email/i), {
            target: { value: "john@example.com" },
        });
        fireEvent.input(screen.getByLabelText(/password/i), {
            target: { value: "password123" },
        });

        const submitButton = screen.getByRole("button", { name: /sign in/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(login).toHaveBeenCalledWith({
                email: "john@example.com",
                password: "password123",
            });
        });
    });

    it("should display error message if login fails", async () => {
        const mockLogin = login as jest.Mock;
        mockLogin.mockResolvedValue({ error: "Login failed" });

        render(<LoginForm />);

        fireEvent.input(screen.getByLabelText(/email/i), {
            target: { value: "john@example.com" },
        });
        fireEvent.input(screen.getByLabelText(/password/i), {
            target: { value: "password123" },
        });

        const submitButton = screen.getByRole("button", { name: /sign in/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/login failed/i)).toBeInTheDocument();
        });
    });

    it("should display success message if login succeeds", async () => {
        const mockLogin = login as jest.Mock;
        mockLogin.mockResolvedValue({ success: "Login successful" });

        render(<LoginForm />);

        fireEvent.input(screen.getByLabelText(/email/i), {
            target: { value: "john@example.com" },
        });
        fireEvent.input(screen.getByLabelText(/password/i), {
            target: { value: "password123" },
        });

        const submitButton = screen.getByRole("button", { name: /sign in/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/login successful/i)).toBeInTheDocument();
        });
    });

    it("should display URL error if OAuth account not linked", () => {
        const useSearchParamsMock = useSearchParams as jest.Mock;
        useSearchParamsMock.mockReturnValue({
            get: vi.fn().mockReturnValue("OAuthAccountNotLinked"),
        });

        render(<LoginForm />);

        expect(screen.getByText(/email already in use with different account/i)).toBeInTheDocument();
    });
});
