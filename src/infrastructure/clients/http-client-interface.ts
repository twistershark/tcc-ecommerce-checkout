export interface HttpClientInterface {
  get(pathname: string): Promise<any>;
  post(
    pathname: string,
    payload: Record<string, string | number>
  ): Promise<boolean>;
}
