import React, { useEffect, useState } from "react";
import { Input } from "../../components/input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useCart from "cart/useCart";
import orderController from "../../controllers/order-controller";

import { Product } from "../../../domain/entities/product";
import { formatCurrency } from "../../../utils/format-currency";
import { CHECKOUT_SCHEMA, TAX } from "./constants";
import { useNavigate } from "react-router-dom";
import { CreateOrderDTO } from "../../dtos/create-order-dto";

import "tailwindcss/tailwind.css";

export default function Checkout() {
  const navigate = useNavigate();
  const [cart] = useCart();
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);

  const { control, handleSubmit, watch, setValue } = useForm<CreateOrderDTO>({
    resolver: zodResolver(CHECKOUT_SCHEMA),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      cep: "",
      address: "",
      number: "",
      district: "",
      city: "",
      state: "",
    },
    shouldUnregister: false,
  });

  const subTotal = cart.reduce((acc: number, product: Product) => {
    return acc + product.price * product.quantity;
  }, 0);

  const cep = watch("cep");
  const address = watch("address");
  const district = watch("district");
  const city = watch("city");
  const state = watch("state");

  const deliveryAddress = `${address}, ${district} | ${city} - ${state}`;
  const isDeliveryAddressAvailable =
    !!address && !!district && !!city && !!state;

  async function onSubmit(values: CreateOrderDTO) {
    try {
      const response = await orderController.createOrder(values);
      if (response) navigate("/pedido-realizado");
    } catch (err) {
      console.error(err);
    }
  }

  async function handleLoadAddressByCEP() {
    try {
      setIsLoadingAddress(true);

      const loadedAddress = await orderController.getAddressByCEP(cep);

      setValue("city", loadedAddress?.city ?? "", { shouldValidate: true });
      setValue("district", loadedAddress?.neighborhood ?? "", {
        shouldValidate: true,
      });
      setValue("state", loadedAddress?.state ?? "", { shouldValidate: true });
      setValue("address", loadedAddress?.street ?? "", {
        shouldValidate: true,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingAddress(false);
    }
  }

  useEffect(() => {
    if (!cep || cep.length < 8) return;

    handleLoadAddressByCEP();
  }, [cep]);

  return (
    <main className="ch-mx-auto ch-max-w-2xl sm:ch-px-6 sm:ch-py-24 lg:ch-max-w-7xl lg:ch-px-4 lg:ch-py-8 ch-flex ch-items-start ch-gap-8 lg:ch-gap-28 ch-w-full ch-font-sans">
      <div className="ch-flex ch-flex-col ch-gap-4 ch-flex-1">
        <div className="ch-w-full ch-bg-[#D9D9D9] ch-px-4 ch-py-4">
          <strong className="ch-font-serif ch-text-2xl ch-text-black">
            Informações
          </strong>
        </div>
        <div className="ch-flex ch-items-center ch-justify-between ch-gap-5">
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                label="Nome"
                value={value}
                onChange={onChange}
                errorMessage={error?.message}
                data-testid="name-input"
              />
            )}
          />

          <Controller
            control={control}
            name="lastname"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                label="Sobrenome"
                value={value}
                onChange={onChange}
                errorMessage={error?.message}
              />
            )}
          />
        </div>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              label="Email"
              value={value}
              onChange={onChange}
              errorMessage={error?.message}
            />
          )}
        />

        <div className="ch-w-full ch-bg-[#D9D9D9] ch-px-4 ch-py-4">
          <strong className="ch-font-serif ch-text-2xl ch-text-black">
            Endereço
          </strong>
        </div>

        <Controller
          control={control}
          name="cep"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              label="CEP"
              value={value}
              onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
              errorMessage={error?.message}
              disabled={isLoadingAddress}
            />
          )}
        />

        <div className="ch-flex ch-items-center ch-justify-between ch-gap-5 ch-w-full">
          <Controller
            control={control}
            name="address"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                label="Endereço"
                value={value}
                onChange={onChange}
                errorMessage={error?.message}
                disabled={isLoadingAddress}
              />
            )}
          />
        </div>

        <div className="ch-flex ch-items-center ch-justify-between ch-gap-5">
          <Controller
            control={control}
            name="number"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                label="Número"
                value={value}
                onChange={onChange}
                errorMessage={error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="district"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                label="Bairro"
                value={value}
                onChange={onChange}
                errorMessage={error?.message}
                disabled={isLoadingAddress}
              />
            )}
          />
        </div>

        <div className="ch-flex ch-items-center ch-justify-between ch-gap-5">
          <Controller
            control={control}
            name="city"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                label="Cidade"
                value={value}
                onChange={onChange}
                errorMessage={error?.message}
                disabled={isLoadingAddress}
              />
            )}
          />

          <Controller
            control={control}
            name="state"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                label="Estado"
                value={value}
                onChange={onChange}
                errorMessage={error?.message}
                disabled={isLoadingAddress}
              />
            )}
          />
        </div>
      </div>

      <aside className="ch-min-w-[368px] ch-border ch-border-black">
        <div className="ch-w-full ch-bg-[#D9D9D9] ch-px-4 ch-py-4">
          <strong className="ch-font-serif ch-text-base ch-text-black">
            Pedido
          </strong>
        </div>

        <div className="ch-w-full ch-px-4 ch-py-4 ch-flex ch-flex-col ch-gap-4">
          {cart.length
            ? cart.map((productInCart: Product) => (
                <div
                  key={productInCart.productId}
                  className="ch-flex ch-items-center ch-justify-between ch-gap-4 ch-font-sans"
                >
                  <span>
                    {productInCart.name} x {productInCart.quantity}
                  </span>
                  <strong>
                    {formatCurrency(
                      productInCart.price * productInCart.quantity
                    )}
                  </strong>
                </div>
              ))
            : null}

          <hr className="ch-my-2" />

          <div className="ch-flex ch-items-center ch-gap-4 ch-justify-between">
            <strong>Subtotal</strong>
            <span>{formatCurrency(subTotal)}</span>
          </div>

          <hr className="ch-my-2" />

          {isDeliveryAddressAvailable ? (
            <div className="ch-flex ch-flex-col ch-gap-4">
              <strong>Entrega</strong>

              <span className="ch-max-w-[350px]">{deliveryAddress}</span>

              <strong>Estimativa: 2 dias úteis</strong>
              <hr className="ch-my-2" />
            </div>
          ) : null}

          <div className="ch-flex ch-items-center ch-gap-4 ch-justify-between">
            <strong className="ch-text-xl">Total</strong>
            <strong className="ch-text-xl">
              {formatCurrency(subTotal + TAX)}
            </strong>
          </div>

          <button
            onClick={handleSubmit(onSubmit)}
            className="ch-bg-black ch-text-white ch-flex ch-items-center ch-justify-center ch-py-4 ch-px-10"
          >
            Finalizar pedido
          </button>
        </div>
      </aside>
    </main>
  );
}
