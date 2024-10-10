import { Routes, Route } from "react-router-dom";
import { useState, useContext, useEffect } from 'react';
import Home from "./views/HomeView.js";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import About from "./views/AboutView.js";
import Menu from "./views/MenuView.js";
import Custom from "./views/CustomView.js";
import Contact from "./views/ContactView.js";
import Cart from "./views/CartView.js";
import CustomerInfo from "./views/CustomerInfoView.js";
import Receipt from "./views/ReceiptView.js";

function App() {

  return (
    <div className="App anton-sc-regular">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/custom" element={<Custom />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/customer_info" element={<CustomerInfo />} />
          <Route path="/receipt" element={<Receipt />} />
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
