import { useState, useContext, useEffect } from "react";
import { Context } from "../contexts/context.js";
import { toast } from "react-toastify";

export default function Custom() {
  const { actions, data } = useContext(Context);

  const availableToppings = [
    { name: "Pepperoni", id: 1 },
    { name: "Bacon", id: 2 },
    { name: "Ham", id: 3 },
    { name: "Mushrooms", id: 4 },
    { name: "Black Olives", id: 5 },
    { name: "Green Olives", id: 6 },
    { name: "Bell Pepper", id: 7 },
    { name: "Italian Sausage", id: 8 },
    { name: "Onions", id: 9 },
    { name: "Pineapple", id: 10 },
    { name: "Extra Cheese", id: 11 },
    { name: "Prosciutto", id: 12 },
    { name: "Meatballs", id: 13 },
    { name: "Anchovies", id: 14 },
    { name: "Roasted Garlic", id: 15 },
    { name: "Truffles", id: 16 },
    { name: "Artichokes", id: 17 },
    { name: "Blue Cheese", id: 18 },
    { name: "Jalapenos", id: 19 },
    { name: "Ground Beef", id: 20 },
    { name: "Sloppy Joe Sauce", id: 21 },
  ];

  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;

  const [desktopMode, setDesktopMode] = useState(false);
  const [tabletMode, setTabletMode] = useState(false);
  const [mobileMode, setMobileMode] = useState(false);
  const [size_name, setSize_name] = useState("Small");
  const [sauce_name, setSauce_name] = useState("Traditional");
  const [crust_name, setCrust_name] = useState("Regular");
  const [toppings, setToppings] = useState([]);
  const [toppingIds, setToppingIds] = useState([]);
  const [price, setPrice] = useState(15);

  function notify() {
    toast.success(`Custom pizza added to cart`, {
      position: "top-center",
      autoClose: 1500,
      theme: "light",
    });
  }

  const addPizzaToCart = () => {
    const pizza = {
      size_name,
      sauce_name,
      crust_name,
      toppingIds, // Use names for the toppings
      price,
      quantity: 1,
    };
    pizza.id = `Custom-${currentMonth}${currentDay}-${price}`;
    notify();
    actions.addCustom(pizza); // Call addCustom from context to add the pizza to the cart
  };

  const handleSauceChange = (event) => {
    setSauce_name(event.target.value);
  };

  const handleCrustChange = (event) => {
    setCrust_name(event.target.value);
  };

  const basePrices = {
    Small: 15,
    Medium: 18,
    Large: 22,
    "Half-Sheet": 30,
    "Full-Sheet": 37.5,
  };

  const [previousSize, setPreviousSize] = useState("Small"); // Initialize with a default size

  const handleSizeChange = (event) => {
    const newSize = event.target.value;
    setPreviousSize(0);
    // Get the price for the new size
    const newSizePrice = basePrices[newSize]; // Assuming basePrices is defined as shown before
    const previousSizePrice = basePrices[previousSize];

    // Update price by subtracting the previous size price and adding the new size price
    setPrice((prevPrice) => prevPrice - previousSizePrice + newSizePrice);

    // Update the size and previous size states
    setSize_name(newSize);
    setPreviousSize(newSize); // Update previous size to the new one
  };

  const updateMode = () => {
    if (window.innerWidth < 779) {
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

  const handleToppingChange = (topping) => {
    const { id, name } = topping; // Destructure ID and name from the topping
    console.log(topping.id);
    if (toppingIds.includes(id)) {
      // If the topping ID is already selected, remove it
      setToppingIds(toppingIds.filter((t) => t !== id)); // Remove ID
      setToppings(toppings.filter((t) => t !== name)); // Remove name
      setPrice((prevPrice) => prevPrice - 1); // Subtract $1 for the topping
    } else {
      // If the topping ID is not selected, add it
      setToppingIds([...toppingIds, id]); // Add ID
      setToppings([...toppings, name]); // Add name
      setPrice((prevPrice) => prevPrice + 1); // Add $1 for the topping
    }
  };

  useEffect(() => {
    updateMode(); // Set initial mode on mount
    window.addEventListener("resize", updateMode); // Add event listener for resize

    return () => {
      window.removeEventListener("resize", updateMode); // Cleanup on unmount
    };
  }, []);

  function toppingsMapped() {
    if (tabletMode) {
      return availableToppings.map((topping) => (
        <div className="col-xs-6 col-sm-4" key={topping.id}>
          <input
            type="checkbox"
            checked={toppingIds.includes(topping.id)} // Check if the topping is selected
            onChange={() => handleToppingChange(topping)} // Pass the whole topping object
          />
          <label className="px-1 topping_label">{topping.name}</label>
        </div>
      ));
    }
    if (mobileMode) {
      return availableToppings.map((topping) => (
        <div className="" key={topping.id}>
          <input
            type="checkbox"
            checked={toppingIds.includes(topping.id)} // Check if the topping is selected
            onChange={() => handleToppingChange(topping)} // Pass the whole topping object
          />
          <label className="px-1 topping_label">{topping.name}</label>
        </div>
      ));
    }
  }

  function sizesMapped() {
    if (tabletMode) {
      return (
        <div className="">
          <div className="card w-75 m-auto mb-4">
            <img
              src="img/smallPizza.png"
              alt="Small Size"
              className="card-img-top"
            />
            <div className="card-body text-center">
              <label className="card-title mobile_card_text">Small</label>
              <input
                type="radio"
                name="size"
                value="Small"
                defaultChecked={true}
                onChange={handleSizeChange}
              />
            </div>
            <div className="description">
              $15
              <br />A small pizza is perfect for 1-2 people.
            </div>
          </div>

          <div className="card w-75 m-auto mb-4">
            <img
              src="img/mediumPizza.png"
              alt="Medium Size"
              className="card-img-top"
            />
            <div className="card-body text-center">
              <label className="card-title mobile_card_text">Medium</label>
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

          <div className="card w-75 m-auto mb-4">
            <img
              src="img/largePizza.png"
              alt="Large Size"
              className="card-img-top"
            />
            <div className="card-body text-center">
              <label className="card-title mobile_card_text">Large</label>
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

          <div className="card w-75 m-auto mb-4">
            <img
              src="img/halfSheetPizza.png"
              alt="Half-Sheet Size"
              className="card-img-top"
            />
            <div className="card-body text-center">
              <label className="card-title mobile_card_text">Half-Sheet</label>
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

          <div className="card w-75 m-auto mb-4">
            <img
              src="img/fullSheetPizza.png"
              alt="Full-Sheet Size"
              className="card-img-top"
            />
            <div className="card-body text-center">
              <label className="card-title mobile_card_text">Full-Sheet</label>
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
      );
    }
    if (mobileMode) {
      return (
        <div className="">
          <div className="card w-100 m-auto mb-3">
            <img
              src="img/smallPizza.png"
              alt="Small Size"
              className="card-img-top"
            />
            <div className="card-body text-center">
              <label className="card-title mobile_card_text">Small</label>
              <input
                type="radio"
                name="size"
                value="Small"
                defaultChecked={true}
                onChange={handleSizeChange}
              />
            </div>
            <div className="description">
              $15
              <br />A small pizza is perfect for 1-2 people.
            </div>
          </div>

          <div className="card w-100 m-auto mb-3">
            <img
              src="img/mediumPizza.png"
              alt="Medium Size"
              className="card-img-top"
            />
            <div className="card-body text-center">
              <label className="card-title mobile_card_text">Medium</label>
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

          <div className="card w-100 m-auto mb-3">
            <img
              src="img/largePizza.png"
              alt="Large Size"
              className="card-img-top"
            />
            <div className="card-body text-center">
              <label className="card-title mobile_card_text">Large</label>
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

          <div className="card w-100 m-auto mb-3">
            <img
              src="img/halfSheetPizza.png"
              alt="Half-Sheet Size"
              className="card-img-top"
            />
            <div className="card-body text-center">
              <label className="card-title mobile_card_text">Half-Sheet</label>
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

          <div className="card w-100 m-auto mb-3">
            <img
              src="img/fullSheetPizza.png"
              alt="Full-Sheet Size"
              className="card-img-top"
            />
            <div className="card-body text-center">
              <label className="card-title mobile_card_text">Full-Sheet</label>
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
      );
    }
  }

  if (desktopMode) {
    return (
      <>
        <div className="container mt-5">
          <h2 className="text-center">Create Your Custom Sloppy Pizza</h2>

          <div className="container text-center pb-5">
            <h4 className="text-left my-4 mt-5">Choose Your Pizza Size</h4>
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
                      defaultChecked={true}
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
            <h4 className="py-2">Choose Your Crust</h4>
            <select className="form-control" onChange={handleCrustChange}>
              <option>Regular</option>
              <option>Thin </option>
              <option>Pan</option>
            </select>
          </div>

          <div className="form-group">
            <h4 className="mt-4 py-2">Choose Your Sauce</h4>
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
              {availableToppings.map((topping) => (
                <div className="col-xs-6 col-sm-4" key={topping.id}>
                  <input
                    type="checkbox"
                    checked={toppingIds.includes(topping.id)} // Check if the topping is selected
                    onChange={() => handleToppingChange(topping)} // Pass the whole topping object
                  />
                  <label className="px-1 topping_label">{topping.name}</label>
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

  if (tabletMode) {
    return (
      <>
        <div className="container mt-5">
          <h2 className="text-center fs-1">Create Your Custom Sloppy Pizza</h2>

          <div className="container text-center pb-5">
            <h4 className="text-left my-4 mt-5">Choose Your Pizza Size</h4>
            {sizesMapped()}
          </div>

          <div className="form-group">
            <h4 className="py-2 text-center">Choose Your Crust</h4>
            <select className="form-control" onChange={handleCrustChange}>
              <option>Regular</option>
              <option>Thin </option>
              <option>Pan</option>
            </select>
          </div>

          <div className="form-group">
            <h4 className="mt-4 py-2 text-center">Choose Your Sauce</h4>
            <select className="form-control" onChange={handleSauceChange}>
              <option>Traditional</option>
              <option>Basil-Pesto</option>
              <option>Garlic Parmesean</option>
            </select>
          </div>

          <div className="form-group w-100 m-auto">
            <h4 className="mb-3 mt-5 text-center">
              Choose Your Sloppy Toppings - Only $1 Per Topping!
            </h4>
            <div className="row text-center">{toppingsMapped()}</div>
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
  if (mobileMode) {
    return (
      <>
        <div className="container mt-5">
          <h2 className="text-center fs-1">Create Your Custom Sloppy Pizza</h2>

          <div className="container text-center pb-5">
            <h4 className="text-left my-4 mt-5 fs-2">Choose Your Pizza Size</h4>
            {sizesMapped()}
          </div>

          <div className="form-group">
            <h4 className="py-2 text-center">Choose Your Crust</h4>
            <select className="form-control" onChange={handleCrustChange}>
              <option>Regular</option>
              <option>Thin </option>
              <option>Pan</option>
            </select>
          </div>

          <div className="form-group">
            <h4 className="mt-4 py-2 text-center">Choose Your Sauce</h4>
            <select className="form-control" onChange={handleSauceChange}>
              <option>Traditional</option>
              <option>Basil-Pesto</option>
              <option>Garlic Parmesean</option>
            </select>
          </div>

          <div className="form-group w-100 m-auto">
            <h4 className="mb-3 mt-5 text-center">
              Choose Your Sloppy Toppings - Only $1 Per Topping!
            </h4>
            <div className="text-center">{toppingsMapped()}</div>
          </div>
          <div className="text-center p-4 pt-4 mt-1">
            <button
              type="button"
              className="btn btn-primary py-2 px-5"
              onClick={addPizzaToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </>
    );
  }
}
