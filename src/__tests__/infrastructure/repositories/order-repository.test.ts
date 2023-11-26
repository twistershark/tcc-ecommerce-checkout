import { HttpClientAdapterInterface } from "../../../infrastructure/adapters/http-client-adapter-interface";
import { OrderRepository } from "../../../infrastructure/repositories/order-repository";
import { CreateOrderDTO } from "../../../presentation/dtos/create-order-dto";

describe("OrderRepository", () => {
  const mockHttpClientAdapter: jest.Mocked<HttpClientAdapterInterface> = {
    get: jest.fn(),
    post: jest.fn(),
  } as jest.Mocked<HttpClientAdapterInterface>;

  const orderRepository = new OrderRepository(mockHttpClientAdapter);

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

    mockHttpClientAdapter.post.mockResolvedValueOnce(true);

    const result = await orderRepository.createOrder(createOrderDTO);

    expect(mockHttpClientAdapter.post).toHaveBeenCalledWith(
      "http://localhost:3000",
      createOrderDTO
    );
    expect(result).toBe(true);
  });

  it("should get address by CEP successfully", async () => {
    const cep = "12345-678";

    const mockAddressResponse = {
      localidade: "City",
      bairro: "Neighborhood",
      uf: "State",
      logadouro: "Street",
    };

    mockHttpClientAdapter.get.mockResolvedValueOnce(mockAddressResponse);

    const result = await orderRepository.getAddressByCEP(cep);

    const expectedAddress = {
      city: "City",
      neighborhood: "Neighborhood",
      state: "State",
      street: "Street",
    };

    expect(mockHttpClientAdapter.get).toHaveBeenCalledWith(
      `https://viacep.com.br/ws/${cep}/json/`
    );
    expect(result).toEqual(expectedAddress);
  });

  it("should throw an error if CEP is not provided for getAddressByCEP", async () => {
    const cep = "";

    await expect(orderRepository.getAddressByCEP(cep)).rejects.toThrowError(
      "Falha ao carregar endereço. CEP não informado"
    );
  });
});
