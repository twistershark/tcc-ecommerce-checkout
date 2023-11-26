import { CreateOrderDTO } from "../../presentation/dtos/create-order-dto";
import { Address } from "../object-values/address";

export interface OrderRepositoryInterface {
  createOrder(payload: CreateOrderDTO): Promise<boolean>;
  getAddressByCEP: (cep: string) => Promise<Address>;
}
