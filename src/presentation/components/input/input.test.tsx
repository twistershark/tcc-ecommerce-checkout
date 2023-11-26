import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from ".";

describe("Input", () => {
  it("renders without crashing", () => {
    render(<Input label="Test Label" />);
  });

  it("handles onChange without mask", async () => {
    const onChangeMock = jest.fn();
    const { getByLabelText } = render(
      <Input label="Test Label" onChange={onChangeMock} value="" />
    );

    const input = getByLabelText("Test Label");
    await userEvent.type(input, "new value");

    expect(input).toHaveValue("new value");
    expect(onChangeMock).toHaveBeenCalled();
  });

  it("handles onChange with mask", async () => {
    const onChangeMock = jest.fn();
    const { getByLabelText } = render(
      <Input
        label="Test Label"
        mask="99999-999"
        onChange={onChangeMock}
        value=""
      />
    );

    const input = getByLabelText("Test Label");
    await userEvent.type(input, "12345678");

    expect(input).toHaveValue("12345-678");
  });

  it("displays error message when provided", () => {
    const { getByText } = render(
      <Input label="Test Label" errorMessage="Test Error" />
    );

    const errorMessage = getByText("Test Error");
    expect(errorMessage).toBeInTheDocument();
  });
});
