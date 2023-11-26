import { formatCurrency } from "../../utils/format-currency";

describe("formatCurrency", () => {
  it("should be able to format currency", () => {
    const value = 1000;
    const formattedValue = formatCurrency(value);

    expect(formattedValue!.replace(/\s+/g, " ")).toEqual("R$ 1.000,00");
  });

  it("should return null if no value if provided", () => {
    const value = undefined;
    const formattedValue = formatCurrency(value!);

    expect(formattedValue).toEqual(null);
  });
});
