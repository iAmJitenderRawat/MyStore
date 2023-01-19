import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./components/AuthContext";
import store from "./app/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <AuthContextProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </AuthContextProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
