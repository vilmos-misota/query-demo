import React from "react";
import ReactDOM from "react-dom/client";

import { AppRouter } from "./application/App.router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/sonner";

import "./styles/styles.css";
import { ModalManager } from "./components/modals/ModalManager";
import { ModalProvider } from "./components/modals/ModalContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <AppRouter />
        <ModalManager />
        <Toaster richColors />
      </ModalProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
