import { formatCurrency } from "../../utils/format-currency";

describe("formatCurrency", () => {
  it("should be able to format currency", () => {
    const value = 1000;
    const formattedValue = formatCurrency(value);

    expect(formattedValue!.replace(/\s+/g, " ")).toEqual("R$ 1.000,00");
  });
});
