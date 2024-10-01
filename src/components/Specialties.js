import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Specialties() {
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

  if (desktopMode) {
    return (
      <>
          <h4 className="my-3 text-center">
            World Famous Sloppy Specialty Pizzas! (Medium Only)
          </h4>
          <div className="container mt-3 pb-5">
            <div className="row justify-content-center">
              <div className="col-lg-3">
                <div className="card grid-item">
                  <img
                    src="img/orderSloppyPizza-min.png"
                    alt="Sloppy Joe Special"
                    className="card-img-top"
                  />
                  <p className="card-text description">
                    Sloppy Joe Special
                    <br />
                    $25
                    <br />
                    Loaded with seasoned ground beef, tangy tomato sauce, and a
                    melty cheese blend that brings the classNameic Sloppy Joe to
                    your plate
                  </p>
                  <button
                    className="btn btn-primary add-to-cart-btn"
                    // onClick={addSpecialtyPizzaToCart(1, 'Sloppy Joe Special', 25.00)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="card grid-item">
                  <img
                    src="img/orderSupreme-min.png"
                    alt="Supreme Pizza"
                    className="card-img-top"
                  />
                  <p className="card-text description">
                    The Sloppy Supreme
                    <br />
                    $23
                    <br />
                    Pepperoni, sausage, bell peppers, onions, and black olives,
                    all layered over a rich tomato base and gooey mozzarella
                  </p>
                  <button
                    className="btn btn-primary add-to-cart-btn"
                    // onClick={addSpecialtyPizzaToCart(2, 'The Sloppy Supreme', 23.00)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="card grid-item">
                  <img
                    src="img/orderZestyTrio-min.png"
                    alt="Zesty Trio"
                    className="card-img-top"
                  />
                  <p className="card-text description">
                    Jo's Zesty Trio
                    <br /> $23.50 <br />A bold combo of spicy pepperoni, earthy
                    mushrooms, and fiery jalapeños, all on a bed of rich tomato
                    sauce and bubbling cheese
                  </p>
                  <button
                    className="btn btn-primary add-to-cart-btn"
                    // onClick={addSpecialtyPizzaToCart(4, 'The Zesty Trio', 23.50)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="card grid-item">
                  <img
                    src="img/orderMeatlovers-min.png"
                    alt="Meatlover's Pizza"
                    className="card-img-top"
                  />
                  <p className="card-text description">
                    Sloppy's Carnivore Delight
                    <br />
                    $22
                    <br />
                    Piled high with pepperoni, sausage, ham, and bacon, all
                    perfectly balanced by a hearty tomato sauce and melted
                    cheese
                  </p>
                  <button
                    className="btn btn-primary add-to-cart-btn"
                    // onClick={addSpecialtyPizzaToCart(3, 'Sloppy\'s Carnivore Delight', 22.00)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
      </>
    );
  }
  if (tabletMode || mobileMode) {
    return (
      <>
        <div className="pb-5 text-center mx-2">
        <h4 className="p-3">
        World Famous Sloppy Specialty Pizzas! <br />
        (Medium Only)
            </h4>
          <div className="col-12">
            <div className="card my-3">
              <img
                src="img/orderSloppyPizza-min.png"
                alt="Sloppy Joe Special"
                className="card-img-top"
              />
              <p className="text-center">
                Sloppy Joe Special
                <br />
                $25
                <br />
              </p>
              <p className="p-2">
                Loaded with seasoned ground beef, tangy tomato sauce, and a
                melty cheese blend that brings the classNameic Sloppy Joe to your
                plate
              </p>
              <button
                className="btn btn-primary w-50 m-auto m-2 mb-2"
                // onClick={addSpecialtyPizzaToCart(1, 'Sloppy Joe Special', 25.00)}
              >
                Add to Cart
              </button>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="card my-3">
              <img
                src="img/orderSupreme-min.png"
                alt="Supreme Pizza"
                className="card-img-top"
              />
              <p className="text-center">
                The Sloppy Supreme
                <br />
                $23
                <br />
              </p>
              <p className="p-2">
                Pepperoni, sausage, bell peppers, onions, and black olives, all
                layered over a rich tomato base and gooey mozzarella
              </p>
              <button
                className="btn btn-primary w-50 m-auto m-2 mb-2"
                // onClick={addSpecialtyPizzaToCart(2, 'The Sloppy Supreme', 23.00)}
              >
                Add to Cart
              </button>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="card my-3">
              <img
                src="img/orderZestyTrio-min.png"
                alt="Zesty Trio"
                className="card-img-top"
              />
              <p className="text-center">
                Jo's Zesty Trio
                <br />
                $23.50
                <br />
              </p>
              <p className="p-2">
                A bold combo of spicy pepperoni, earthy mushrooms, and fiery
                jalapeños, all on a bed of rich tomato sauce and bubbling cheese
              </p>
              <button
                className="btn btn-primary w-50 m-auto m-2 mb-2"
                // onClick={addSpecialtyPizzaToCart(4, 'The Zesty Trio', 23.50)}
              >
                Add to Cart
              </button>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="card my-3">
              <img
                src="img/orderMeatlovers-min.png"
                alt="Meatlover's Pizza"
                className="card-img-top"
              />
              <p className="text-center">
                Sloppy's Carnivore Delight
                <br />
                $22
                <br />
              </p>
              <p className="p-2">
                Piled high with pepperoni, sausage, ham, and bacon, all
                perfectly balanced by a hearty tomato sauce and melted cheese
              </p>
              <button
                className="btn btn-primary w-50 m-auto m-2 mb-2"
              //  onClick={addSpecialtyPizzaToCart(3, 'Sloppy\'s Carnivore Delight', 22.00)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
