import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest"; // Adjust the import path if necessary
import { register } from "@/actions/auth/register";
import RegisterForm from "@/app/(auth)/_components/RegisterForm";

// Mock the register function
vi.mock("@/actions/auth/register", () => ({
    register: vi.fn(),
}));

describe("RegisterForm component", () => {
    it("should render the form with all fields and submit button", () => {
        render(<RegisterForm />);

        expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
    });

    it("should show validation errors if form is submitted empty", async () => {
        render(<RegisterForm />);

        const submitButton = screen.getByRole("button", { name: /sign up/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/string must contain at least 2 character/i)).toBeInTheDocument();
            expect(screen.getByText(/name is required/i)).toBeInTheDocument();
            expect(screen.getByText(/password is required/i)).toBeInTheDocument();
        });
    });

    it("should call register function with form data when form is submitted", async () => {
        const mockRegister = register as jest.Mock;
        mockRegister.mockResolvedValue({ success: "Registration successful" });

        render(<RegisterForm />);

        fireEvent.input(screen.getByLabelText(/full name/i), {
            target: { value: "John Doe" },
        });
        fireEvent.input(screen.getByLabelText(/email/i), {
            target: { value: "john@example.com" },
        });
        fireEvent.input(screen.getByLabelText(/password/i), {
            target: { value: "password123" },
        });

        const submitButton = screen.getByRole("button", { name: /sign up/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(register).toHaveBeenCalledWith({
                name: "John Doe",
                email: "john@example.com",
                password: "password123",
            });
        });
    });

    it("should display error message if registration fails", async () => {
        const mockRegister = register as jest.Mock;
        mockRegister.mockResolvedValue({ error: "Registration failed" });

        render(<RegisterForm />);

        fireEvent.input(screen.getByLabelText(/full name/i), {
            target: { value: "John Doe" },
        });
        fireEvent.input(screen.getByLabelText(/email/i), {
            target: { value: "john@example.com" },
        });
        fireEvent.input(screen.getByLabelText(/password/i), {
            target: { value: "password123" },
        });

        const submitButton = screen.getByRole("button", { name: /sign up/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/registration failed/i)).toBeInTheDocument();
        });
    });

    it("should display success message if registration succeeds", async () => {
        const mockRegister = register as jest.Mock;
        mockRegister.mockResolvedValue({ success: "Registration successful" });

        render(<RegisterForm />);

        fireEvent.input(screen.getByLabelText(/full name/i), {
            target: { value: "John Doe" },
        });
        fireEvent.input(screen.getByLabelText(/email/i), {
            target: { value: "john@example.com" },
        });
        fireEvent.input(screen.getByLabelText(/password/i), {
            target: { value: "password123" },
        });

        const submitButton = screen.getByRole("button", { name: /sign up/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/registration successful/i)).toBeInTheDocument();
        });
    });
});
