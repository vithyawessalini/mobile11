import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";
import {AuthProvider} from './context/auth';
import { SearchProvider } from "./context/search";
import 'antd/dist/reset.css';
import {CartProvider} from "./context/cart"
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 
        <HashRouter>
        <SearchProvider>
          <CartProvider>
        <AuthProvider>
          <App />
          </AuthProvider>
          </CartProvider>
          </SearchProvider>
        </HashRouter>

);


reportWebVitals();