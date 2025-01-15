import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./context/AppContext.jsx";
import AdminContextProvider from "./context/AdminContext.jsx";
import DoctorContextProvider from "./context/DoctorContext.jsx";
import ErrorBoundary from "./components/ ErrorBoundary.jsx";// Assuming you add an error boundary

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary> {/* Wrap with ErrorBoundary */}
        <AdminContextProvider>
          <DoctorContextProvider>
            <AppContextProvider>
              <App />
            </AppContextProvider>
          </DoctorContextProvider>
        </AdminContextProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>
);