import { HttpClientInterface } from "./http-client-interface";

export class HttpClient implements HttpClientInterface {
  async get(pathname: string): Promise<any> {
    const response = await fetch(pathname);
    const parsedResponse = await response.json();

    return parsedResponse;
  }

  async post(_pathname: string, _payload: Record<string, string | number>) {
    return Promise.resolve(true);
  }
}
