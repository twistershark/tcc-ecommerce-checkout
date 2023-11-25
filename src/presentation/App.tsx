import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import { Checkout } from "./pages/checkout";

const App = () => (
  <BrowserRouter>
    <Checkout />
  </BrowserRouter>
);

const root = createRoot(document.getElementById("app")!);
root.render(<App />);
