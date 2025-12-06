import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/main.css";
import App from "@/app-splash/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
