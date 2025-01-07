import { Routes, BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Produtos from "./pages/Produtos/Produtos";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import React from "react";

function Routas() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Produtos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routas;
