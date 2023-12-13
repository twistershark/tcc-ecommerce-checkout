import { Entity } from "./entity";

export type Product = Entity & {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};
