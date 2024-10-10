import { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Context } from "../contexts/context.js";

export default function Cart() {
  const { actions, cart } = useContext(Context);
  const specialties = cart.specialtyPizzas;
  const customs = cart.customPizzas;
  const sides = cart.sides;
  const navigate = useNavigate();

  const [desktopMode, setDesktopMode] = useState(false);
  const [tabletMode, setTabletMode] = useState(false);
  const [mobileMode, setMobileMode] = useState(false);

  const updateMode = () => {
    if (window.innerWidth <= 779) {
      setDesktopMode(false);
      setTabletMode(false);
      setMobileMode(true);
    } else if (window.innerWidth <= 1104) {
      setDesktopMode(false);
      setTabletMode(true);
      setMobileMode(false);
    } else {
      setDesktopMode(true);
      setTabletMode(false);
      setMobileMode(false);
    }
  };

  useEffect(() => {
    updateMode(); // Set initial mode on mount
    window.addEventListener("resize", updateMode); // Add event listener for resize

    return () => {
      window.removeEventListener("resize", updateMode); // Cleanup on unmount
    };
  }, []);

  function mapSpecialtiesMobile() {
    if (specialties && specialties.length > 0) {
      return specialties.map((item, i) => (
        <div className="add_border_bottom" key={i}>
          <p>{`${item.title} - $${item.price}`}</p>
          <p>{`Quantity: ${item.quantity}`}</p>
          <p className="fake_anchor" onClick={() => removeSpecialty(item.id)}>
            remove
          </p>
        </div>
      ));
    }
    return null; // Optionally return null or a message if there are no specialties
  }

  function mapCustomsMobile() {
    if (customs && customs.length > 0) {
      return customs.map((item, i) => (
        <div className="add_border_bottom" key={i}>
          <p>{`${item.id} - $${item.price}`}</p>
          <p>{`Quantity: ${item.quantity || 0}`}</p>
          <p className="fake_anchor" onClick={() => removeCustom(item.id)}>
            remove
          </p>
        </div>
      ));
    }
    return null; // Optionally return null or a message if there are no custom pizzas
  }

  function mapSidesMobile() {
    if (sides && sides.length > 0) {
      return sides.map((item, i) => (
        <div className="add_border_bottom" key={i}>
          <p>{`${item.title} - $${item.price}`}</p>
          <p>{`Quantity: ${item.quantity || 0}`}</p>
          <p className="fake_anchor" onClick={() => removeSide(item.id)}>
            remove
          </p>
        </div>
      ));
    }
    return null; // Optionally return null or a message if there are no sides
  }

  async function removeSpecialty(id) {
    await actions.removeSpecialty(id);
  }

  async function removeCustom(id) {
    console.log("Removing custom pizza with ID:", id);
    await actions.removeCustom(id);
  }

  async function removeSide(id) {
    await actions.removeSide(id);
  }

  function showSpecialtyHeader() {
    if (cart && cart.specialtyPizzas && cart.specialtyPizzas.length > 0) {
      return <h5 className="mt-3">Specialty Pizzas</h5>;
    }
  }

  function showCustomHeader() {
    if (cart && cart.customPizzas && cart.customPizzas.length > 0) {
      return <h5 className="mt-3">Custom Pizzas</h5>;
    }
  }
  
  function showSidesHeader() {
    if (cart && cart.sides && cart.sides.length > 0) {
      return <h5 className="mt-3">Side Orders</h5>;
    }
  }

  async function submitCart() {
    await actions.submitOrder();
    navigate('/customer_info');
  }

  if (mobileMode || tabletMode) {
    return (
      <>
        <div className="w-100 px-5 text-center">
          <div className="row py-3 px-5">
            <h2>{`Total: $${cart.total || 0}`}</h2>
          </div>
          {showSpecialtyHeader()}
          {mapSpecialtiesMobile()}
          {showCustomHeader()}
          {mapCustomsMobile()}
          {showSidesHeader()}
          {mapSidesMobile()}
          <div className="text-center mt-3">
            <button className="px-5 py-2 mt-3 mb-5" onClick={() => submitCart()}>Place Order</button>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="w-50 m-auto px-5 text-center">
        <div className="row py-3 px-5">
          <h2>{`Total: $${cart.total || 0}`}</h2>
        </div>
        {showSpecialtyHeader()}
        {mapSpecialtiesMobile()}
        {showCustomHeader()}
        {mapCustomsMobile()}
        {showSidesHeader()}
        {mapSidesMobile()}
        <div className="text-center mt-3">
          <button className="px-5 py-2 mt-3 mb-5" onClick={() => submitCart()}>Place Order</button>
        </div>
      </div>
    </>
  );
}
