import { HttpClientInterface } from "../../../../infrastructure/clients/http-client-interface";

export class MockHttpClient implements HttpClientInterface {
  async get(_pathname: string): Promise<any> {
    return Promise.resolve({});
  }

  async post(_pathname: string, _payload: Record<string, string | number>) {
    return Promise.resolve(true);
  }
}
