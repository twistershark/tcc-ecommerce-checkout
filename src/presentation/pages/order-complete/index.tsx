import React from "react";
import { Link } from "react-router-dom";
import useCart from "cart/useCart";
import { useEffect } from "react";

export default function OrderComplete() {
  const [_, setCart] = useCart();

  useEffect(() => {
    setCart([]);
  }, []);
  return (
    <main className="ch-mx-auto ch-max-w-2xl sm:ch-px-6 sm:ch-py-24 lg:ch-max-w-7xl lg:ch-px-4 lg:ch-py-8 ch-flex ch-gap-8 lg:ch-gap-12 ch-w-full ch-font-sans ch-flex-col ch-items-center ch-justify-center ch-mt-20">
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M60 11.25C50.3582 11.25 40.9329 14.1091 32.916 19.4659C24.8991 24.8226 18.6507 32.4363 14.9609 41.3442C11.2711 50.2521 10.3057 60.0541 12.1867 69.5107C14.0678 78.9672 18.7108 87.6536 25.5286 94.4715C32.3464 101.289 41.0328 105.932 50.4894 107.813C59.9459 109.694 69.7479 108.729 78.6558 105.039C87.5637 101.349 95.1774 95.1009 100.534 87.084C105.891 79.0671 108.75 69.6418 108.75 60C108.736 47.0749 103.596 34.6831 94.4564 25.5436C85.317 16.4042 72.9251 11.2636 60 11.25ZM81.4031 51.4031L55.1531 77.6531C54.8049 78.0018 54.3913 78.2784 53.936 78.4671C53.4808 78.6558 52.9928 78.7529 52.5 78.7529C52.0072 78.7529 51.5192 78.6558 51.064 78.4671C50.6088 78.2784 50.1952 78.0018 49.8469 77.6531L38.5969 66.4031C37.8932 65.6995 37.4979 64.7451 37.4979 63.75C37.4979 62.7549 37.8932 61.8005 38.5969 61.0969C39.3005 60.3932 40.2549 59.9979 41.25 59.9979C42.2451 59.9979 43.1995 60.3932 43.9031 61.0969L52.5 69.6984L76.0969 46.0969C76.4453 45.7485 76.8589 45.4721 77.3142 45.2835C77.7694 45.095 78.2573 44.9979 78.75 44.9979C79.2427 44.9979 79.7307 45.095 80.1859 45.2835C80.6411 45.4721 81.0547 45.7485 81.4031 46.0969C81.7516 46.4453 82.0279 46.8589 82.2165 47.3141C82.405 47.7694 82.5021 48.2573 82.5021 48.75C82.5021 49.2427 82.405 49.7306 82.2165 50.1859C82.0279 50.6411 81.7516 51.0547 81.4031 51.4031Z"
          fill="black"
        />
      </svg>

      <h2 className="ch-font-serif ch-text-2xl">Pedido realizado</h2>

      <Link
        to="/produtos"
        className="ch-flex ch-items-center ch-justify-center ch-px-4 ch-py-6 ch-bg-black ch-text-white ch-font-serif ch-text-2xl"
      >
        Voltar para o catálogo de produtos
      </Link>
    </main>
  );
}
