import { Address } from "../../domain/object-values/address";
import { OrderRepositoryInterface } from "../../domain/repositories/order-repository-interface";
import { CreateOrderDTO } from "../../presentation/dtos/create-order-dto";
import { HttpClientAdapterInterface } from "../adapters/http-client-adapter-interface";

export class OrderRepository implements OrderRepositoryInterface {
  private httpClientAdapter: HttpClientAdapterInterface;

  constructor(httpClientAdapter: HttpClientAdapterInterface) {
    this.httpClientAdapter = httpClientAdapter;
  }

  async createOrder(payload: CreateOrderDTO): Promise<boolean> {
    const pathname = "http://localhost:3000";
    const response = await this.httpClientAdapter.post(pathname, payload);

    return response;
  }

  async getAddressByCEP(cep: string): Promise<Address> {
    const pathname = `https://viacep.com.br/ws/${cep}/json/`;

    if (!cep) throw new Error("Falha ao carregar endereço. CEP não informado");

    const response = await this.httpClientAdapter.get(pathname);

    return response;
  }
}
