import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { App } from "@/App";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { InstituteDataProvider } from "@/contexts/InstituteDataContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import "./index.css";
import "@/utils/dialog";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider>
          <BrowserRouter>
            <InstituteDataProvider>
              <LanguageProvider>
                <App />
              </LanguageProvider>
            </InstituteDataProvider>
          </BrowserRouter>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
