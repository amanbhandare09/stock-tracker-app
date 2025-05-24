//All tests are passing
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../app/admin/login";
import SignUp from "../app/admin/signup";

beforeEach(() => {
  global.fetch = jest.fn();
  // Mock window.location
  // delete window.location;
  // window.location = { href: "" } as any;

  Object.defineProperty(window, "location", {
    writable: true,
    value: { href: "" },
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Login Component", () => {
  it("Should render the login form ", () => {
    render(<Login />);

    expect(screen.getByText("Admin Login")).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("Should allow user to input email and password", () => {
    render(<Login />);

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  test("Handles successful submission", async () => {
    // Mock fetch for success
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ access_token: "mockToken" }),
    });

    // Mock localStorage
    const setItemMock = jest.spyOn(Storage.prototype, "setItem");

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:8000/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "test@example.com",
            password: "password123",
          }),
        }
      );
      expect(setItemMock).toHaveBeenCalledWith("accessToken", "mockToken");
      expect(window.location.href).toBe("/admin/user"); // Ensure redirection
    });
  });
});

const mockToggleForm = jest.fn();

describe("SignUp Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should render signup form with all fields", () => {
    render(<SignUp toggleForm={mockToggleForm}></SignUp>);

    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /sign up/i })
    ).toBeInTheDocument();
  });

  it("Should call toggleForm when login button is clicked", () => {
    const mockToggleForm = jest.fn();
    render(<SignUp toggleForm={mockToggleForm}></SignUp>);

    fireEvent.click(screen.getByText(/login/i));
    expect(mockToggleForm).toHaveBeenCalledTimes(1);
  });
});
