import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { App } from "@/App";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { InstituteDataProvider } from "@/contexts/InstituteDataContext";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider>
          <BrowserRouter>
            <InstituteDataProvider>
              <App />
            </InstituteDataProvider>
          </BrowserRouter>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
