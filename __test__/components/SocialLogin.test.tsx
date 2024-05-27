import { fireEvent, render, screen } from "@testing-library/react";

import SocialLogin from "@/app/(auth)/_components/SocialLogin";
import "@testing-library/jest-dom";
import { signIn } from "next-auth/react";
import { DEFAULT_USER_LOGIN_REDIRECT } from "@/routes";

vi.mock("next-auth/react", () => ({
  signIn: vi.fn(),
}));

describe("SocialLogin component", () => {
  it("should render Google and GitHub login buttons", () => {
      render(<SocialLogin />);
      expect(screen.getByTestId("google-login")).toBeInTheDocument();
      expect(screen.getByTestId("github-login")).toBeInTheDocument();
  });

  it("should call signIn with 'google' when Google button is clicked", () => {
      render(<SocialLogin />);
      const googleButton = screen.getByTestId("google-login");
      fireEvent.click(googleButton);
      expect(signIn).toHaveBeenCalledWith("google", { callbackUrl: DEFAULT_USER_LOGIN_REDIRECT });
  });

  it("should call signIn with 'github' when GitHub button is clicked", () => {
      render(<SocialLogin />);
      const githubButton = screen.getByTestId("github-login");
      fireEvent.click(githubButton);
      expect(signIn).toHaveBeenCalledWith("github", { callbackUrl: DEFAULT_USER_LOGIN_REDIRECT });
  });
});
