import { HttpClientInterface } from "../clients/http-client-interface";
import { HttpClientAdapterInterface } from "./http-client-adapter-interface";

export class HttpClientAdapter implements HttpClientAdapterInterface {
  private httpClient: HttpClientInterface;

  constructor(httpClient: HttpClientInterface) {
    this.httpClient = httpClient;
  }

  async get(pathname: string) {
    const response = await this.httpClient.get(pathname);

    return response;
  }

  async post(pathname: string, payload: any) {
    const response = await this.httpClient.post(pathname, payload);

    return response;
  }
}
