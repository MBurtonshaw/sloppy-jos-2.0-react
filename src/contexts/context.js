import React, { createContext, useState, useEffect } from "react";
import Data from "../HOCs/Data";

export const Context = createContext();

export const Provider = ({ children }) => {
  const data = new Data();

  const [customer, setCustomer] = useState({});
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Check if the structure is correct
        if (
          parsedCart &&
          Array.isArray(parsedCart.specialtyPizzas) &&
          Array.isArray(parsedCart.customPizzas) &&
          Array.isArray(parsedCart.sides)
        ) {
          return parsedCart; // return the parsed cart if it's valid
        }
      } catch (error) {
        console.error("Failed to parse cart from local storage", error);
      }
    }
    // Return the default structure if nothing is found
    return {
      specialtyPizzas: [],
      customPizzas: [],
      sides: [],
      total: 0,
    };
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Fetch customer data
  const getCart = async (id) => {
    try {
      const newCart = await data.getCart(id);
      setCart(newCart);
    } catch (error) {
      setError(error);
      console.error("Failed to fetch customer:", error);
    }
  };

  const fillCustomer = async (customer) => {
    if (!customer || typeof customer !== "object") {
      console.error("Invalid customer data");
      return;
    }

    try {
      const {
        first_name,
        last_name,
        email_address,
        phone_number,
        credit_card,
        credit_cvv,
      } = customer;

      const formattedPhone = phone_number.replace(/\D/g, "");
      const formattedCreditCard = credit_card.replace(/\D/g, "");

      setCustomer({
        first_name: first_name, // Use the desired key here
        last_name: last_name,
        email_address: email_address,
        phone_number: formattedPhone,
        credit_card: formattedCreditCard,
        credit_cvv: credit_cvv,
      });
    } catch (error) {
      console.error("Error filling customer data:", error);
    }
  };

  const calculateTotal = (cart) => {
    const specialtyTotal = cart.specialtyPizzas.reduce(
      (sum, pizza) => sum + pizza.price * (pizza.quantity || 1),
      0
    );
    const customTotal = cart.customPizzas.reduce(
      (sum, pizza) => sum + pizza.price * (pizza.quantity || 1),
      0
    );
    const sidesTotal = cart.sides.reduce(
      (sum, side) => sum + side.price * (side.quantity || 1),
      0
    );

    return specialtyTotal + customTotal + sidesTotal;
  };

  const addCustom = (pizza) => {
    console.log("Adding custom pizza:", pizza);
    setCart((prevCart) => {
      const existingPizzaIndex = prevCart.customPizzas.findIndex(
        (p) => p.id === pizza.id
      );

      if (existingPizzaIndex !== -1) {
        // Increment the quantity of the existing pizza
        const updatedPizzas = prevCart.customPizzas.map((p, index) =>
          index === existingPizzaIndex
            ? { ...p, quantity: (p.quantity || 1) + 1 }
            : p
        );

        return {
          ...prevCart,
          customPizzas: updatedPizzas,
          total: calculateTotal({ ...prevCart, customPizzas: updatedPizzas }), // Recalculate total
        };
      }

      // If it's a new pizza, add it with a quantity of 1
      return {
        ...prevCart,
        customPizzas: [...prevCart.customPizzas, { ...pizza, quantity: 1 }], // Always 1
        total: calculateTotal({
          ...prevCart,
          customPizzas: [...prevCart.customPizzas, { ...pizza, quantity: 1 }],
        }), // Recalculate total
      };
    });
  };

  const addSpecialty = (id, title, price, quantity) => {
    console.log("Adding specialty with quantity:", quantity);
    setCart((prevCart) => {
      const existingSpecialty = prevCart.specialtyPizzas.find(
        (pizza) => pizza.id === id
      );

      if (existingSpecialty) {
        // Increment the quantity of the existing specialty pizza
        const updatedSpecialties = prevCart.specialtyPizzas.map((pizza) =>
          pizza.id === id
            ? { ...pizza, quantity: (pizza.quantity || 0) + quantity }
            : pizza
        );

        return {
          ...prevCart,
          specialtyPizzas: updatedSpecialties,
          total: calculateTotal({
            ...prevCart,
            specialtyPizzas: updatedSpecialties,
          }), // Recalculate total
        };
      }

      // If it's a new specialty pizza, add it with the provided quantity
      return {
        ...prevCart,
        specialtyPizzas: [
          ...prevCart.specialtyPizzas,
          { id, title, price, quantity: quantity || 1 }, // Default to 1 if quantity is not provided
        ],
        total: calculateTotal({
          ...prevCart,
          specialtyPizzas: [
            ...prevCart.specialtyPizzas,
            { id, title, price, quantity: quantity || 1 },
          ],
        }),
      };
    });
  };

  const addSide = (id, title, price, quantity) => {
    console.log("Adding side with quantity:", quantity);
    setCart((prevCart) => {
      const existingSide = prevCart.sides.find((side) => side.side_id === id);

      if (existingSide) {
        // Increment the quantity of the existing side
        const updatedSides = prevCart.sides.map((side) =>
          side.side_id === id
            ? { ...side, quantity: (side.quantity || 0) + quantity }
            : side
        );

        return {
          ...prevCart,
          sides: updatedSides,
          total: calculateTotal({
            ...prevCart,
            sides: updatedSides,
          }), // Recalculate total
        };
      }

      // If it's a new side, add it with the provided quantity
      return {
        ...prevCart,
        sides: [
          ...prevCart.sides,
          { side_id: id, title, price, quantity: quantity || 1 }, // Use side_id for consistency
        ],
        total: calculateTotal({
          ...prevCart,
          sides: [
            ...prevCart.sides,
            { side_id: id, title, price, quantity: quantity || 1 },
          ],
        }),
      };
    });
  };

  const removeSpecialty = (idToRemove) => {
    setCart((prevCart) => {
      const specialtyToRemove = prevCart.specialtyPizzas.find(
        (pizza) => pizza.id === idToRemove
      );

      if (specialtyToRemove && specialtyToRemove.quantity > 1) {
        // Decrement quantity if more than 1
        const updatedSpecialties = prevCart.specialtyPizzas.map((pizza) =>
          pizza.id === idToRemove
            ? { ...pizza, quantity: pizza.quantity - 1 }
            : pizza
        );

        return {
          ...prevCart,
          specialtyPizzas: updatedSpecialties,
          total: calculateTotal({
            ...prevCart,
            specialtyPizzas: updatedSpecialties,
          }), // Recalculate total
        };
      }

      // Remove the specialty pizza if quantity is 1
      const filteredSpecialties = prevCart.specialtyPizzas.filter(
        (pizza) => pizza.id !== idToRemove
      );

      return {
        ...prevCart,
        specialtyPizzas: filteredSpecialties,
        total: calculateTotal({
          ...prevCart,
          specialtyPizzas: filteredSpecialties,
        }), // Recalculate total
      };
    });
  };

  const removeSide = (idToRemove) => {
    setCart((prevCart) => {
      const sideToRemove = prevCart.sides.find(
        (side) => side.side_id === idToRemove // Use side_id here
      );
  
      if (sideToRemove && sideToRemove.quantity > 1) {
        // Decrement quantity if more than 1
        const updatedSides = prevCart.sides.map((side) =>
          side.side_id === idToRemove // Use side_id here
            ? { ...side, quantity: side.quantity - 1 }
            : side
        );
  
        return {
          ...prevCart,
          sides: updatedSides,
          total: calculateTotal({ ...prevCart, sides: updatedSides }), // Recalculate total
        };
      }
  
      // Remove the side if quantity is 1
      const filteredSides = prevCart.sides.filter(
        (side) => side.side_id !== idToRemove // Use side_id here
      );
  
      return {
        ...prevCart,
        sides: filteredSides,
        total: calculateTotal({ ...prevCart, sides: filteredSides }), // Recalculate total
      };
    });
  };

  const removeCustom = (idToRemove) => {
    setCart((prevCart) => {
      const pizzaToRemove = prevCart.customPizzas.find(
        (pizza) => pizza.id === idToRemove
      );

      if (pizzaToRemove && pizzaToRemove.quantity > 1) {
        // Decrement quantity if more than 1
        const updatedPizzas = prevCart.customPizzas.map((pizza) =>
          pizza.id === idToRemove
            ? { ...pizza, quantity: pizza.quantity - 1 }
            : pizza
        );

        return {
          ...prevCart,
          customPizzas: updatedPizzas,
          total: calculateTotal({ ...prevCart, customPizzas: updatedPizzas }), // Recalculate total
        };
      }

      // Remove the pizza if quantity is 1
      const filteredPizzas = prevCart.customPizzas.filter(
        (pizza) => pizza.id !== idToRemove
      );

      return {
        ...prevCart,
        customPizzas: filteredPizzas,
        total: calculateTotal({ ...prevCart, customPizzas: filteredPizzas }), // Recalculate total
      };
    });
  };

  async function submitOrder() {
    const new_id = await data.createCart();

    // Update cart with the new ID
    setCart((prevCart) => {
      const updatedCart = {
        ...prevCart,
        id: new_id, // Add the new ID property
      };

      // You can now call other data methods that depend on the updated cart
      data.addSpecialties(updatedCart);
      data.addCustoms(updatedCart);
      data.addSides(updatedCart);
      data.setPrice(updatedCart);

      return updatedCart; // Return the updated cart
    });
  }

  async function submitCustomer(customer) {
    const newCustomer = await data.submitCustomer(customer);
    await data.linkCustomer(newCustomer, cart);
    const newId = cart.id;
    await getCart(newId);
  }

  async function restartCart() {
    setCart({
      specialtyPizzas: [],
      customPizzas: [],
      sides: [],
      total: 0,
    });
    localStorage.removeItem("cart");
    setCustomer({});
  }

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
      removeSide,
      submitOrder,
      submitCustomer,
      restartCart,
    },
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
