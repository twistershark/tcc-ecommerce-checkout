import { Address } from "../../../../domain/object-values/address";
import { OrderRepositoryInterface } from "../../../../domain/repositories/order-repository-interface";
import { CreateOrderDTO } from "../../../../presentation/dtos/create-order-dto";

export class MockOrderRepository implements OrderRepositoryInterface {
  async createOrder(_payload: CreateOrderDTO): Promise<boolean> {
    return Promise.resolve(true);
  }

  async getAddressByCEP(_cep: string) {
    const response: Address = {
      street: "Praça da Sé",
      neighborhood: "Sé",
      city: "São Paulo",
      state: "SP",
    };

    return Promise.resolve(response);
  }
}
