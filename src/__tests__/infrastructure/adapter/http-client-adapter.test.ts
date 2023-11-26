import { HttpClientAdapter } from "../../../infrastructure/adapters/http-client-adapter";
import { HttpClientInterface } from "../../../infrastructure/clients/http-client-interface";
import { MockHttpClient } from "../../__mocks__/infrastructure/clients/mock-http-client";

describe("HttpClientAdapter", () => {
  it("should make a GET request using the provided HttpClient", async () => {
    const mockHttpClient: HttpClientInterface = new MockHttpClient();
    const httpClientAdapter = new HttpClientAdapter(mockHttpClient);

    const result = await httpClientAdapter.get("/some/path");

    expect(result).toEqual({});
  });

  it("should make a POST request using the provided HttpClient", async () => {
    const mockHttpClient: HttpClientInterface = new MockHttpClient();
    const httpClientAdapter = new HttpClientAdapter(mockHttpClient);

    const result = await httpClientAdapter.post("/some/path", { key: "value" });

    expect(result).toBe(true);
  });

  it("should handle errors during GET request", async () => {
    const errorResponse = new Error("Failed to make a GET request");
    const mockHttpClient: HttpClientInterface = {
      get: jest.fn().mockRejectedValueOnce(errorResponse),
      post: jest.fn(),
    };
    const httpClientAdapter = new HttpClientAdapter(mockHttpClient);

    await expect(httpClientAdapter.get("/some/path")).rejects.toThrow(
      errorResponse
    );
  });

  it("should handle errors during POST request", async () => {
    const errorResponse = new Error("Failed to make a POST request");
    const mockHttpClient: HttpClientInterface = {
      get: jest.fn(),
      post: jest.fn().mockRejectedValueOnce(errorResponse),
    };
    const httpClientAdapter = new HttpClientAdapter(mockHttpClient);

    await expect(
      httpClientAdapter.post("/some/path", { key: "value" })
    ).rejects.toThrow(errorResponse);
  });
});
