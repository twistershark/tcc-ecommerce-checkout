import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from ".";

describe("Input", () => {
  test("renders with label", () => {
    render(<Input label="Username" />);
    expect(screen.getByText("Username")).toBeInTheDocument();
  });

  test("renders with error message", () => {
    render(<Input label="Password" errorMessage="Required field" />);
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByText("Required field")).toBeInTheDocument();
  });

  test("applies red border on error", () => {
    render(
      <Input
        label="Email"
        errorMessage="Invalid email"
        data-testid="email-input"
      />
    );
    const inputElement = screen.getByTestId("email-input");
    expect(inputElement).toHaveClass("ch-border-red-500");
  });

  test("does not apply red border without error", () => {
    render(<Input label="Phone" />);
    const inputElement = screen.getByLabelText("Phone");
    expect(inputElement).not.toHaveClass("ch-border-red-500");
  });
});
