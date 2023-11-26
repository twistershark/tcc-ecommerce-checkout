import * as z from "zod";

export const CHECKOUT_SCHEMA = z.object({
  name: z.string().min(1, { message: "Nome é Obrigatório" }),
  lastname: z.string().min(1, { message: "Sobrenome é obrigatório" }),
  email: z
    .string()
    .min(1, { message: "Email é obrigatório" })
    .email({ message: "Email inválido" }),
  cep: z.string().length(8, { message: "CEP inválido" }),
  address: z.string().min(1, { message: "Endereço é obrigatório" }),
  number: z.string().optional(),
  district: z.string().min(1, { message: "Bairro é obrigatório" }),
  city: z.string().min(1, { message: "Cidade é obrigatório" }),
  state: z.string().min(1, { message: "Estado é obrigatório" }),
});

export type CheckoutForm = z.infer<typeof CHECKOUT_SCHEMA>;

export const TAX = 5.99;
