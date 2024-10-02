import React, { createContext, useState, useEffect } from "react";
import Data from '../HOCs/Data';

export const Context = createContext();

export const Provider = ({ children }) => {
  const data = new Data();

  const [customer, setCustomer] = useState({});
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : {
      specialtyPizzas: [],
      customPizzas: [],
      sides: []
    };
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart)); 
  }, [cart]);

  // Fetch customer data
  const getCustomer = async () => {
    try {
      const customer = await data.getCustomer();
      setCustomer(customer);
      return customer;
    } catch (error) {
      setError(error);
      console.error("Failed to fetch customer:", error);
    }
  };

  const addCustom = (pizza) => {
    setCart((prevCart) => ({
      ...prevCart,
      customPizzas: [...prevCart.customPizzas, pizza],
    }));
  };

  const addSpecialty = (id) => {
    setCart((prevCart) => ({
      ...prevCart,
      specialtyPizzas: [...prevCart.specialtyPizzas, id],
    }));
  };

  const addSide = (id) => {
    setCart((prevCart) => ({
      ...prevCart,
      sides: [...prevCart.sides, id],
    }));
  };

  const value = {
    customer,
    cart,
    error,
    actions: {
      getCustomer,
      addCustom,
      addSpecialty,
      addSide,
    },
  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};