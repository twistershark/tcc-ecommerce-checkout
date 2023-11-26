export interface HttpClientAdapterInterface {
  get: (pathname: string) => Promise<any>;
  post: (pathname: string, payload: any) => Promise<boolean>;
}
