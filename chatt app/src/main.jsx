import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "sonner";
import { SocketProvider } from "./context/SocketContext.jsx";
// import { store } from './utils/appStore.js'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SocketProvider>
      <App />
      <Toaster closeButton />
    </SocketProvider>
  </StrictMode>
);
