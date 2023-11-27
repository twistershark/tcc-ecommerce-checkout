import React, { ComponentPropsWithRef } from "react";

interface InputProps extends ComponentPropsWithRef<"input"> {
  label: string;
  errorMessage?: string;
  mask?: string;
}

export function Input({
  label,
  errorMessage,
  mask,
  ...rest
}: Readonly<InputProps>) {
  return (
    <label className="ch-flex ch-flex-col ch-gap-[.5rem] ch-w-full">
      <strong className="ch-font-serif">{label}</strong>
      <input
        {...rest}
        className={[
          "ch-border ch-border-black ch-h-[62px] ch-px-4 disabled:ch-opacity-5",
          errorMessage ? "ch-border-red-500" : "",
        ].join(" ")}
      />
      {errorMessage ? (
        <strong className="ch-text-red-500 ch-font-sans ch-text-sm -ch-mt-1">
          {errorMessage}
        </strong>
      ) : null}
    </label>
  );
}
