import { OrderService } from "../../application/services/order-service";
import { OrderControllerInterface } from "../../domain/controllers/order-controller-interface";
import { Address } from "../../domain/object-values/address";
import { OrderServiceInterface } from "../../domain/services/order-service-interface";
import { HttpClientAdapter } from "../../infrastructure/adapters/http-client-adapter";
import { HttpClient } from "../../infrastructure/clients/http-client";
import { OrderRepository } from "../../infrastructure/repositories/order-repository";
import { CreateOrderDTO } from "../dtos/create-order-dto";

export class OrderController implements OrderControllerInterface {
  private orderService: OrderServiceInterface;

  constructor(orderService: OrderServiceInterface) {
    this.orderService = orderService;
  }

  async createOrder(payload: CreateOrderDTO): Promise<boolean> {
    const response = this.orderService.createOrder(payload);
    return response;
  }

  async getAddressByCEP(cep: string): Promise<Address> {
    const response = this.getAddressByCEP(cep);
    return response;
  }
}

export default new OrderController(
  new OrderService(new OrderRepository(new HttpClientAdapter(new HttpClient())))
);
