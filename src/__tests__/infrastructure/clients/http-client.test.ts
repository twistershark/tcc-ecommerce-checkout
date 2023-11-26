import { HttpClient } from "../../../infrastructure/clients/http-client";

global.fetch = jest.fn();

describe("HttpClient", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should make a GET request successfully", async () => {
    const httpClient = new HttpClient();

    const responseData = { key: "value" };
    const fetchMock = global.fetch as jest.MockedFunction<typeof fetch>;

    fetchMock.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(responseData),
    } as unknown as Response);

    const result = await httpClient.get("/some/path");

    expect(fetchMock).toHaveBeenCalledWith("/some/path");
    expect(result).toEqual(responseData);
  });

  it("should make a POST request successfully", async () => {
    const httpClient = new HttpClient();

    const result = await httpClient.post("/some/path", { key: "value" });

    expect(result).toBe(true);
  });
});
