import { Address } from "../../domain/object-values/address";
import { OrderRepositoryInterface } from "../../domain/repositories/order-repository-interface";
import { OrderServiceInterface } from "../../domain/services/order-service-interface";
import { CreateOrderDTO } from "../../presentation/dtos/create-order-dto";

export class OrderService implements OrderServiceInterface {
  private orderRepository: OrderRepositoryInterface;

  constructor(orderRepository: OrderRepositoryInterface) {
    this.orderRepository = orderRepository;
  }

  async createOrder(payload: CreateOrderDTO): Promise<boolean> {
    const response = await this.orderRepository.createOrder(payload);

    return response;
  }

  async getAddressByCEP(cep: string): Promise<Address> {
    const response = await this.orderRepository.getAddressByCEP(cep);

    return response;
  }
}
