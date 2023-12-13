import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import orderController from "../../controllers/order-controller";
import { Checkout } from ".";
import { Product } from "../../../domain/entities/product";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../controllers/order-controller");

jest.mock(
  "cart/useCart",
  () => {
    let cart: Product[] = [
      {
        id: "1",
        name: "produto1",
        price: 20,
        productId: "1",
        version: "1",
        quantity: 3,
      },
      {
        id: "2",
        name: "produto2",
        price: 15,
        productId: "2",
        version: "2",
        quantity: 2,
      },
    ];
    function setCart(newCart: Product[]) {
      cart = newCart;
    }

    function useCart() {
      return [cart, setCart];
    }

    return useCart;
  },
  { virtual: true }
);

describe("Checkout", () => {
  const mockOrderController = orderController as jest.Mocked<
    typeof orderController
  >;

  beforeEach(() => {
    mockOrderController.getAddressByCEP.mockResolvedValue({
      city: "MockCity",
      neighborhood: "MockNeighborhood",
      state: "MockState",
      street: "MockStreet",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders Checkout component", () => {
    render(
      <MemoryRouter>
        <Checkout />
      </MemoryRouter>
    );

    expect(screen.getByText("Informações")).toBeInTheDocument();
    expect(screen.getByText("Pedido")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("Subtotal")).toBeInTheDocument();
    expect(screen.getByText("Finalizar pedido")).toBeInTheDocument();
  });

  it("submits the form successfully", async () => {
    render(
      <MemoryRouter>
        <Checkout />
      </MemoryRouter>
    );

    mockOrderController.createOrder.mockResolvedValue(true);

    await userEvent.type(screen.getByTestId("name-input"), "John");
    await userEvent.type(screen.getByLabelText(/Sobrenome/i), "Doe");
    await userEvent.type(
      screen.getByLabelText(/Email/i),
      "john.doe@example.com"
    );
    await userEvent.type(screen.getByLabelText(/CEP/i), "72035501");
    await userEvent.type(screen.getByLabelText(/Número/i), "42");

    await userEvent.click(screen.getByText(/Finalizar pedido/i));

    await waitFor(() => {
      expect(mockOrderController.createOrder).toHaveBeenCalledWith({
        name: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        cep: "72035501",
        address: "MockStreet",
        number: "42",
        district: "MockNeighborhood",
        city: "MockCity",
        state: "MockState",
      });
    });
  });

  it("loads address by CEP", async () => {
    render(
      <MemoryRouter>
        <Checkout />
      </MemoryRouter>
    );

    userEvent.type(screen.getByLabelText(/CEP/i), "12345678");

    await waitFor(() => {
      expect(screen.getByLabelText(/Endereço/i)).toHaveValue("MockStreet");
      expect(screen.getByLabelText(/Bairro/i)).toHaveValue("MockNeighborhood");
      expect(screen.getByLabelText(/Cidade/i)).toHaveValue("MockCity");
      expect(screen.getByLabelText(/Estado/i)).toHaveValue("MockState");
    });
  });

  it("should not update the address when the request fails", async () => {
    mockOrderController.getAddressByCEP.mockRejectedValue({
      city: "MockCity",
      neighborhood: "MockNeighborhood",
      state: "MockState",
      street: "MockStreet",
    });

    const spy = jest.spyOn(console, "error");

    render(
      <MemoryRouter>
        <Checkout />
      </MemoryRouter>
    );

    userEvent.type(screen.getByLabelText(/CEP/i), "12345678");

    await waitFor(() => {
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });

  it("should show console error when the submit request fails", async () => {
    mockOrderController.createOrder.mockRejectedValue({
      error: true,
    });

    const spy = jest.spyOn(console, "error");

    render(
      <MemoryRouter>
        <Checkout />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByTestId("name-input"), "John");
    await userEvent.type(screen.getByLabelText(/Sobrenome/i), "Doe");
    await userEvent.type(
      screen.getByLabelText(/Email/i),
      "john.doe@example.com"
    );
    await userEvent.type(screen.getByLabelText(/CEP/i), "72035501");
    await userEvent.type(screen.getByLabelText(/Número/i), "42");

    await userEvent.click(screen.getByText(/Finalizar pedido/i));

    await waitFor(() => {
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });

  it("should show the correct subtotal price", async () => {
    render(
      <MemoryRouter>
        <Checkout />
      </MemoryRouter>
    );

    expect(screen.getByText("R$ 90,00")).toBeInTheDocument();
  });
});
