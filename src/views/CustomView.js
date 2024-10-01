import { useState, useContext, useEffect } from "react";
import {Context} from '../contexts/context.js';

export default function Custom(props) {
  const { actions, data} = useContext(Context);

  const availableToppings = [
    "Pepperoni",
    "Bacon",
    "Ham",
    "Mushrooms",
    "Black Olives",
    "Green Olives",
    "Bell Pepper",
    "Italian Sausage",
    "Onions",
    "Pineapple",
    "Extra Cheese",
    "Prosciutto",
    "Meatballs",
    "Anchovies",
    "Roasted Garlic",
    "Truffles",
    "Artichokes",
    "Blue Cheese",
    "Jalapenos",
    "Ground Beef",
    "Sloppy Joe Sauce",
  ];

  const addPizzaToCart = () => {
    const pizza = { size, sauce, crust, toppings };
    actions.addCustom(pizza); // Call addCustom from context to add the pizza to the cart
  };

  const handleSauceChange = (event) => {
    setSauce(event.target.value);
  };

  const handleCrustChange = (event) => {
    setCrust(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const [desktopMode, setDesktopMode] = useState(false);
  const [tabletMode, setTabletMode] = useState(false);
  const [mobileMode, setMobileMode] = useState(false);
  const [size, setSize] = useState("Small");
  const [sauce, setSauce] = useState("Regular");
  const [crust, setCrust] = useState("Traditional");
  const [toppings, setToppings] = useState([]);

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

  if (desktopMode) {
    return (
      <>
        <div className="container mt-5">
          <h2 className="text-center">Create Your Custom Sloppy Pizza</h2>

          <div className="container text-center pb-5">
            <h4 className="text-left my-4 mt-5">Choose Your Sloppy Pizza Size</h4>
            <div className="row justify-content-center">
              <div className="col-xs-6 col-sm-2">
                <div className="card">
                  <img
                    src="img/smallPizza.png"
                    alt="Small Size"
                    className="card-img-top"
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">Small</h5>
                    <input
                      type="radio"
                      name="size"
                      value="Small"
                      onChange={handleSizeChange}
                    />
                  </div>
                  <div className="description">
                    $15
                    <br />A small pizza is perfect for 1-2 people.
                  </div>
                </div>
              </div>
              <div className="col-xs-6 col-sm-2">
                <div className="card">
                  <img
                    src="img/mediumPizza.png"
                    alt="Medium Size"
                    className="card-img-top"
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">Medium</h5>
                    <input
                      type="radio"
                      name="size"
                      value="Medium"
                      onChange={handleSizeChange}
                    />
                  </div>
                  <div className="description">
                    $18.00
                    <br />A medium pizza is ideal for 2-3 people.
                  </div>
                </div>
              </div>
              <div className="col-xs-6 col-sm-2">
                <div className="card">
                  <img
                    src="img/largePizza.png"
                    alt="Large Size"
                    className="card-img-top"
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">Large</h5>
                    <input
                      type="radio"
                      name="size"
                      value="Large"
                      onChange={handleSizeChange}
                    />
                  </div>
                  <div className="description">
                    $22.00
                    <br />A large pizza serves 3-4 people.
                  </div>
                </div>
              </div>
              <div className="col-xs-6 col-sm-2">
                <div className="card">
                  <img
                    src="img/halfSheetPizza.png"
                    alt="Half-Sheet Size"
                    className="card-img-top"
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">Half-Sheet</h5>
                    <input
                      type="radio"
                      name="size"
                      value="Half-Sheet"
                      onChange={handleSizeChange}
                    />
                  </div>
                  <div className="description">
                    $30.00
                    <br />A half-sheet pizza is great for a small gathering.
                  </div>
                </div>
              </div>
              <div className="col-xs-6 col-sm-2">
                <div className="card">
                  <img
                    src="img/fullSheetPizza.png"
                    alt="Full-Sheet Size"
                    className="card-img-top"
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">Full-Sheet</h5>
                    <input
                      type="radio"
                      name="size"
                      value="Full-Sheet"
                      onChange={handleSizeChange}
                    />
                  </div>
                  <div className="description">
                    $37.50
                    <br />A full-sheet pizza is perfect for larger groups.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <h4 className="py-2">Choose Your Sloppy Crust</h4>
            <select className="form-control" onChange={handleCrustChange}>
              <option>Regular</option>
              <option>Thin </option>
              <option>Pan</option>
            </select>
          </div>

          <div className="form-group">
            <h4 className="mt-4 py-2">Choose Your Sloppy Sauce</h4>
            <select className="form-control" onChange={handleSauceChange}>
              <option>Traditional</option>
              <option>Basil-Pesto</option>
              <option>Garlic Parmesean</option>
            </select>
          </div>

          <div className="form-group w-100 m-auto">
            <h4 className="mb-3 mt-5">
              Choose Your Sloppy Toppings - Only $1 Per Topping!
            </h4>
            <div className="row">
              {availableToppings.map((topping, i) => (
                <div className="col-xs-6 col-sm-4" key={i}>
                  <input
                    type="checkbox"
                    name={topping}
                    value="topping"
                    onClick={() => {
                      if (toppings.includes(topping)) {
                        setToppings(toppings.filter((t) => t !== topping));
                      } else {
                        setToppings([...toppings, topping]);
                      }
                    }}
                  />
                  <label
                    className="px-1 topping_label"
                    htmlFor={topping}
                    value="topping"
                  >
                    {topping}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center p-3">
            <button
              type="button"
              className="btn btn-primary p-2 px-5"
              onClick={addPizzaToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </>
    );
  }

  if (tabletMode || mobileMode) {
    return (
      <>
        <div className="container mt-5">
          <h2 className="text-center">Create Your Custom Sloppy Pizza</h2>

          <div className="container text-center pb-5">
            <h4 className="text-left my-4 mt-5">Choose Your Sloppy Pizza Size</h4>
            <div className="">
              <div className="card w-50 m-auto">
                <img
                  src="img/smallPizza.png"
                  alt="Small Size"
                  className="card-img-top"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">Small</h5>
                  <input type="radio" name="size" value="Small" />
                </div>
                <div className="description">
                  $15
                  <br />A small pizza is perfect for 1-2 people.
                </div>
              </div>

              <div className="card w-50 m-auto">
                <img
                  src="img/mediumPizza.png"
                  alt="Medium Size"
                  className="card-img-top"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">Medium</h5>
                  <input type="radio" name="size" value="Medium" />
                </div>
                <div className="description">
                  $18.00
                  <br />A medium pizza is ideal for 2-3 people.
                </div>
              </div>

              <div className="card w-50 m-auto">
                <img
                  src="img/largePizza.png"
                  alt="Large Size"
                  className="card-img-top"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">Large</h5>
                  <input type="radio" name="size" value="Large" />
                </div>
                <div className="description">
                  $22.00
                  <br />A large pizza serves 3-4 people.
                </div>
              </div>

              <div className="card w-50 m-auto">
                <img
                  src="img/halfSheetPizza.png"
                  alt="Half-Sheet Size"
                  className="card-img-top"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">Half-Sheet</h5>
                  <input type="radio" name="size" value="Half-Sheet" />
                </div>
                <div className="description">
                  $30.00
                  <br />A half-sheet pizza is great for a small gathering.
                </div>
              </div>

              <div className="card w-50 m-auto">
                <img
                  src="img/fullSheetPizza.png"
                  alt="Full-Sheet Size"
                  className="card-img-top"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">Full-Sheet</h5>
                  <input type="radio" name="size" value="Full-Sheet" />
                </div>
                <div className="description">
                  $37.50
                  <br />A full-sheet pizza is perfect for larger groups.
                </div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <h4 className="py-2 text-center">Choose Your Sloppy Crust</h4>
            <select className="form-control">
              <option>Regular</option>
              <option>Thin </option>
              <option>Pan</option>
            </select>
          </div>

          <div className="form-group">
            <h4 className="mt-4 py-2 text-center">Choose Your Sloppy Sauce</h4>
            <select className="form-control">
              <option>Traditional</option>
              <option>Basil-Pesto</option>
              <option>Garlic Parmesean</option>
            </select>
          </div>

          <div className="form-group w-100 m-auto">
            <h4 className="mb-3 mt-5 text-center">
              Choose Your Sloppy Toppings - Only $1 Per Topping!
            </h4>
            <div className="row">
              {availableToppings.map((topping, i) => (
                <div className="col-xs-6 col-sm-4 text-center" key={i}>
                  <input type="checkbox" name={topping} value="topping" />
                  <label
                    className="px-1 topping_label"
                    htmlFor={topping}
                    value="topping"
                  >
                    {topping}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center p-3">
            <button
              type="button"
              className="btn btn-primary p-2 px-5"
              on-click={addPizzaToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </>
    );
  }
}
