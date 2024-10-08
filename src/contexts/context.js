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
  // const getCustomer = async () => {
  //   try {
  //     const customer = await data.getCustomer();
  //     setCustomer(customer);
  //     return customer;
  //   } catch (error) {
  //     setError(error);
  //     console.error("Failed to fetch customer:", error);
  //   }
  // };

  const fillCustomer = async(customer) => {
    setCustomer({
      firstName: customer.customerFirstName,
      lastName: customer.customerLastName,
      email: customer.customerEmail,
      phone: customer.customerPhone,
      credit: customer.customerCreditCard,
      creditExpiry: customer.customerCreditExpiry,
      creditCVV: customer.customerCreditCVV
    });
  }

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

  const removeSpecialty = (idToRemove) => {
    setCart((prevCart) => {
      const index = prevCart.specialtyPizzas.indexOf(idToRemove);
      if (index > -1) {
        return {
          ...prevCart,
          specialtyPizzas: [
            ...prevCart.specialtyPizzas.slice(0, index),
            ...prevCart.specialtyPizzas.slice(index + 1)
          ]
        };
      }
      return prevCart;
    });
  };

  const removeSide = (idToRemove) => {
    setCart((prevCart) => {
      const index = prevCart.sides.indexOf(idToRemove);
      if (index > -1) {
        return {
          ...prevCart,
          sides: [
            ...prevCart.sides.slice(0, index),
            ...prevCart.sides.slice(index + 1)
          ]
        };
      }
      return prevCart;
    });
  }
  
  const removeCustom = (pizzaId) => {
    setCart((prevCart) => ({
      ...prevCart,
      customPizzas: prevCart.customPizzas.filter(pizza => pizza.id !== pizzaId),
    }));
  };

  const value = {
    customer,
    cart,
    error,
    actions: {
      // getCustomer,
      addCustom,
      addSpecialty,
      addSide,
      fillCustomer,
      removeSpecialty,
      removeCustom,
      removeSide
    },
  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};