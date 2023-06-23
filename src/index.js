import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { SnackProvider } from "./context/Snackprovider";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <SnackProvider>
      <App />
    </SnackProvider>
  </StrictMode>
);
