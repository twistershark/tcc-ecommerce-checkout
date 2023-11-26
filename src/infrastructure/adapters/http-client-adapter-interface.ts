export interface HttpClientAdapterInterface {
  get: (pathname: string) => Promise<Record<string, string>>;
  post: (pathname: string, payload: any) => Promise<boolean>;
}
