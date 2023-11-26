import { Address } from "../../../domain/object-values/address";
import { OrderController } from "../../../presentation/controllers/order-controller";
import { CreateOrderDTO } from "../../../presentation/dtos/create-order-dto";
import { MockOrderService } from "../../__mocks__/application/mock-order-service";

describe("OrderController", () => {
  const orderController = new OrderController(new MockOrderService());

  it("should create an order successfully", async () => {
    const createOrderDTO: CreateOrderDTO = {
      name: "Test name",
      lastname: "Test last",
      email: "email@email.com",
      cep: "00000-000",
      address: "Rua joão de prad",
      number: "SN",
      district: "Bairro",
      city: "Luzicity",
      state: "GO",
    };

    const result = await orderController.createOrder(createOrderDTO);

    expect(result).toBe(true);
  });

  it("should get address by CEP successfully", async () => {
    const cep = "12345-678";

    const mockAddress: Address = {
      street: "Praça da Sé",
      neighborhood: "Sé",
      city: "São Paulo",
      state: "SP",
    };

    const result = await orderController.getAddressByCEP(cep);

    expect(result).toEqual(mockAddress);
  });
});
