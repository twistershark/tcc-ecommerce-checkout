import { Address } from "../../domain/object-values/address";

export interface HttpClientAdapterInterface {
  get: (pathname: string) => Promise<Address>;
  post: (pathname: string, payload: any) => Promise<boolean>;
}
