import React, { ChangeEvent, ComponentPropsWithoutRef, useState } from "react";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  errorMessage?: string;
  mask?: string;
}

export function Input({
  label,
  errorMessage,
  mask,
  value,
  onChange,
  ...rest
}: Readonly<InputProps>) {
  const [inputValue, setInputValue] = useState(value);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (mask) {
      const value = e.target.value.replace(/\D/g, "");
      let maskedValue = "";

      for (let i = 0, j = 0; i < mask.length && j < value.length; i++) {
        maskedValue += mask[i] === "9" ? value[j++] : mask[i];
      }

      setInputValue(maskedValue);
      return;
    }

    setInputValue(e.target.value);

    if (onChange) {
      onChange(e);
    }
  }

  return (
    <label className="ch-flex ch-flex-col ch-gap-[.5rem] ch-w-full">
      <strong className="ch-font-serif">{label}</strong>
      <input
        {...rest}
        className={[
          "ch-border ch-border-black ch-h-[62px] ch-px-4",
          !!errorMessage ? "ch-border-red-500" : "",
        ].join(" ")}
        onChange={(e) => handleChange(e)}
        value={inputValue}
      />
      {!!errorMessage ? (
        <strong className="ch-text-red-500 ch-font-sans ch-text-sm -ch-mt-1">
          {errorMessage}
        </strong>
      ) : null}
    </label>
  );
}
