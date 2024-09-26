import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.js";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import About from "./components/About.js";
import Menu from "./components/Menu.js";
import Custom from "./components/Custom.js";
import Contact from "./components/Contact.js";
import Cart from "./components/Cart.js";
import CustomerInfo from "./components/CustomerInfo.js";
import Receipt from "./components/Receipt.js";

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
