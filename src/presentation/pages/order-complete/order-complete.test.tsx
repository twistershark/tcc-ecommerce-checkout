import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { OrderComplete } from ".";
import { MemoryRouter } from "react-router-dom";

describe("OrderComplete", () => {
  it("should render the page correctly", () => {
    render(
      <MemoryRouter>
        <OrderComplete />
      </MemoryRouter>
    );

    expect(screen.getByText("Pedido realizado")).toBeInTheDocument();
    expect(
      screen.getByText("Voltar para o catálogo de produtos")
    ).toBeInTheDocument();
  });
});
