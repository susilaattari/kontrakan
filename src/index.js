import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notfound from "./pages/Notfound";
import Dashboard from "./pages/admin";
import Kosan from "./pages/admin/kosan";
import dotenv from "dotenv";
import { CookiesProvider } from "react-cookie";
import "./index.css";

dotenv.config();

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" component={<Home />} element={<Home />} />
        <Route
          path="/dashboard"
          component={<Dashboard />}
          element={<Dashboard />}
        />
        <Route
          path="/dashboard-kosan"
          component={<Kosan />}
          element={<Kosan />}
        />
        <Route path="/login" component={<Login />} element={<Login />} />
        <Route
          path="/register"
          component={<Register />}
          element={<Register />}
        />
        <Route path="*" component={<Notfound />} element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>,
  document.getElementById("root")
);
registerServiceWorker();

