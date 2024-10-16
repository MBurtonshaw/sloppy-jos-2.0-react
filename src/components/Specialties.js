import { useEffect, useState, useContext } from "react";
import { Context } from "../contexts/context.js";
import { toast } from "react-toastify";

export default function Specialties() {
  const [desktopMode, setDesktopMode] = useState(false);
  const [tabletMode, setTabletMode] = useState(false);
  const [mobileMode, setMobileMode] = useState(false);

  const { actions } = useContext(Context);

  const updateMode = () => {
    if (window.innerWidth <= 600) {
      setDesktopMode(false);
      setTabletMode(false);
      setMobileMode(true);
    } else if (window.innerWidth <= 900) {
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

  function notify() {
    toast.success(`Specialty pizza added to cart`, {
      position: "top-center",
      autoClose: 1500,
      theme: "light",
    });
  }

  const addSpecialty = (id, title, price, quantity) => {
    notify();
    actions.addSpecialty(id, title, price, quantity);
  };

  const renderCard = (imgSrc, title, price, description, id) => {
    function cardInfoSmall() {
      return (
        <div className="card text-center">
          <img src={imgSrc} alt="Custom Pizza" className="card-img-top" />
          <span className="mx-2 fs-3">{title}</span>
          <span className="fs-5">${price}</span>
          <span>{description}</span>
          <button
            className="btn btn-primary w-50 m-auto mt-3 mb-2"
            onClick={() => addSpecialty(id, title, price, 1)}
          >
            Add to Cart
          </button>
        </div>
      );
    }

    function cardInfoLarge() {
      return (
        <>
          <img src={imgSrc} alt={title} className="card-img-top" />
          <p className="card-text description">
            {title}
            <br />${price}
            <br />
            {description}
          </p>
          <button
            className="btn btn-primary add-to-cart-btn"
            onClick={() => addSpecialty(id, title, price, 1)}
          >
            Add to Cart
          </button>
        </>
      );
    }

    if (tabletMode) {
      return <div className="pb-4 w-50 mx-auto">{cardInfoSmall()}</div>;
    }
    if (mobileMode) {
      return <div className="pb-4 mx-2">{cardInfoSmall()}</div>;
    }
    if (desktopMode) {
      return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mt-3">
          <div className="card grid-item">{cardInfoLarge()}</div>
        </div>
      );
    }
  };

  if (desktopMode) {
    return (
      <>
        <h4 className="text-center my-3 fs-1">
          World Famous Sloppy Specialty Pizzas! (Medium Only)
        </h4>
        <div className="container mt-3 pb-5">
          <div className="row justify-content-center">
            {renderCard(
              "img/orderSloppyPizza-min.png",
              "Sloppy Jo Special",
              25,
              "Loaded with seasoned ground beef, a melty cheese blend, and our signature Sloppy Jo Sauce, that brings the classic Sloppy Jo to your plate",
              1
            )}
            {renderCard(
              "img/orderSupreme-min.png",
              "The Sloppy Supreme",
              23,
              "Pepperoni, bacon, Italian sausage, mushrooms, black and green olives, bell pepper, and onions all layered over a rich tomato base and gooey mozzarella",
              2
            )}
            {renderCard(
              "img/orderMeatlovers-min.png",
              "Sloppy Carnivore Delight",
              22,
              "Piled high with pepperoni, bacon, ham, Italian sausage, prosciutto, and meatballs all perfectly balanced by a hearty tomato sauce and melted cheese",
              3
            )}
            {renderCard(
              "img/orderZestyTrio-min.png",
              "Jo's Zesty Trio",
              23.5,
              "A bold combo of spicy pepperoni, earthy mushrooms, and fiery jalapeños, all on a bed of rich tomato sauce and bubbling cheese",
              4
            )}
          </div>
        </div>
      </>
    );
  }

  if (tabletMode || mobileMode) {
    return (
      <>
        <div className="pb-5 text-center mx-3">
          <h4 className="pt-3 fs-1">
            World Famous Sloppy Specialty Pizzas! <br />
            (Medium Only)
          </h4>
          <div className="row justify-content-center mt-4">
            {renderCard(
              "img/orderSloppyPizza-min.png",
              "Sloppy Jo Special",
              25,
              "Loaded with seasoned ground beef, a melty cheese blend, and our signature Sloppy Jo Sauce, that brings the classic Sloppy Jo to your plate",
              1
            )}
            {renderCard(
              "img/orderSupreme-min.png",
              "The Sloppy Supreme",
              23,
              "Pepperoni, bacon, Italian sausage, mushrooms, black and green olives, bell pepper, and onions all layered over a rich tomato base and gooey mozzarella",
              2
            )}
            {renderCard(
              "img/orderMeatlovers-min.png",
              "Sloppy Carnivore Delight",
              22,
              "Piled high with pepperoni, bacon, ham, Italian sausage, prosciutto, and meatballs all perfectly balanced by a hearty tomato sauce and melted cheese",
              3
            )}
            {renderCard(
              "img/orderZestyTrio-min.png",
              "Jo's Zesty Trio",
              23.5,
              "A bold combo of spicy pepperoni, earthy mushrooms, and fiery jalapeños, all on a bed of rich tomato sauce and bubbling cheese",
              4
            )}
          </div>
        </div>
      </>
    );
  }
}
