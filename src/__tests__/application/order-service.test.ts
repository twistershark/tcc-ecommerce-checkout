import { OrderService } from "../../application/services/order-service";
import { Address } from "../../domain/object-values/address";
import { CreateOrderDTO } from "../../presentation/dtos/create-order-dto";
import { MockOrderRepository } from "../__mocks__/infrastructure/repositories/mock-order-repository";

describe("OrderService", () => {
  const orderService = new OrderService(new MockOrderRepository());

  afterEach(() => {
    jest.clearAllMocks();
  });

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

    const result = await orderService.createOrder(createOrderDTO);

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

    const result = await orderService.getAddressByCEP(cep);

    expect(result).toEqual(mockAddress);
  });
});
