import { Entity } from "./entity";

export enum Category {
  PURSES = "Bolsas",
  MAN = "Masculina",
  WOMAN = "Feminina",
}

export type Product = Entity & {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};
