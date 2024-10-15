import { useContext, useEffect, useState } from "react";
import { Context } from "../contexts/context.js";
import { useNavigate } from "react-router-dom";

export default function Receipt() {
  const { actions, cart } = useContext(Context);
  const [total, setTotal] = useState(cart.total);
  const [specialties, setSpecialties] = useState(cart.specialty_pizzas);
  const [customs, setCustoms] = useState(cart.custom_pizzas);
  const [sides, setSides] = useState(cart.sides);

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

  const navigate = useNavigate();

  function specialtyMapper() {
    if (specialties && specialties.length > 0) {
      return (
        <div className="row">
          {specialtyHeader()}
          {specialties.map((specialty, i) => (
            <div className="pt-1 pb-3" key={i}>
              <h5>{specialty.name}</h5>
              <span className="border-bottom">{`Quantity: ${specialty.quantity}`}</span>
            </div>
          ))}
        </div>
      );
    }
  }

  function sidesMapper() {
    if (sides && sides.length > 0) {
      return (
        <div className="row">
          {sidesHeader()}
          {sides.map((side, i) => (
            <div className="pt-1 pb-3" key={i}>
              <h5>{side.side_name}</h5>
              <span className="w-25 m-auto border-bottom">{`Quantity: ${side.quantity}`}</span>
            </div>
          ))}
        </div>
      );
    }
  }

  function toppingsMapper(pizza) {
    return pizza.toppings.map((topping, i) => {
      if (i + 1 !== 1) {
        return " -" + topping;
      } else {
        return "-" + topping;
      }
    });
  }

  function customsMapper() {
    if (customs && customs.length > 0) {
      return (
        <div className="row">
          {customsHeader()}
          {customs.map((custom, i) => (
            <div className="pt-1 pb-3" key={i}>
              <h5>{`Custom Pizza #${i + 1}`}</h5>
              <span>{`${custom.size_name}, ${custom.crust_name} crust, ${custom.sauce_name} sauce`}</span>
              <p>{toppingsMapper(custom)}</p>
              <span className="w-25 m-auto border-bottom">{`Quantity: ${custom.quantity}`}</span>
            </div>
          ))}
        </div>
      );
    }
  }

  function specialtyHeader() {
    return <h3 className="mb-3 border-bottom w-75 m-auto">Specialty Pizzas</h3>;
  }

  function sidesHeader() {
    return <h3 className="mb-3 border-bottom w-75 m-auto">Side Orders</h3>;
  }

  function customsHeader() {
    return <h3 className="mb-3 border-bottom w-75 m-auto">Custom Pizzas</h3>;
  }

  async function submitRestart() {
    await actions.restartCart();
    navigate("/");
  }

  return (
    <>
      <h1 className="text-center pt-5 pb-3 border-bottom">Order Receipt</h1>
      <div className="">
        <div className="text-center pt-4 pb-2">{specialtyMapper()}</div>
        <div className="text-center">{customsMapper()}</div>
        <div className="text-center pt-3 pb-2">{sidesMapper()}</div>
      </div>
      <h4 className="text-center p-3">{`Total: $${total}`}</h4>
      <div className="text-center pb-4">
        <button className="px-5 py-2" onClick={submitRestart}>
          Continue
        </button>
      </div>
    </>
  );
}
