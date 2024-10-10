import { useEffect, useState, useContext } from "react";
import { Context } from "../contexts/context.js";

export default function Specialties() {
  const [desktopMode, setDesktopMode] = useState(false);
  const [tabletMode, setTabletMode] = useState(false);
  const [mobileMode, setMobileMode] = useState(false);

  const { actions } = useContext(Context);

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

  const addSpecialty = (id, title, price) => {
    actions.addSpecialty(id, title, price);
  };

  const renderCard = (imgSrc, title, price, description, id) => (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mt-3">
      <div className="card grid-item">
        <img src={imgSrc} alt={title} className="card-img-top" />
        <p className="card-text description">
          {title}
          <br />${price}
          <br />
          {description}
        </p>
        <button
          className="btn btn-primary add-to-cart-btn"
          onClick={() => addSpecialty(id, title, price)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );

  const renderCardMobile = (imgSrc, title, price, description, id) => (
    <div className="pb-4 mx-2">
      <h4 className="text-center pb-3 pt-4">{title}</h4>
      <div className="">
        <div className="card text-center">
          <img src={imgSrc} alt="Custom Pizza" className="card-img-top" />
          <p className="mx-2">
            {title}
            <br />${price}
            <br />
            {description}
          </p>
          <button
            className="btn btn-primary w-50 m-auto mb-2"
            onClick={() => addSpecialty(id, title, price)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );

  if (desktopMode) {
    return (
      <>
        <h4 className="my-3 text-center">
          World Famous Sloppy Specialty Pizzas! (Medium Only)
        </h4>
        <div className="container mt-3 pb-5">
          <div className="row justify-content-center">
            {renderCard(
              "img/orderSloppyPizza-min.png",
              "Sloppy Joe Special",
              25,
              "Loaded with seasoned ground beef, tangy tomato sauce, and a melty cheese blend that brings the classic Sloppy Joe to your plate",
              1
            )}
            {renderCard(
              "img/orderSupreme-min.png",
              "The Sloppy Supreme",
              23,
              "Pepperoni, sausage, bell peppers, onions, and black olives, all layered over a rich tomato base and gooey mozzarella",
              2
            )}
            {renderCard(
              "img/orderMeatlovers-min.png",
              "Sloppy's Carnivore Delight",
              22,
              "Piled high with pepperoni, sausage, ham, and bacon, all perfectly balanced by a hearty tomato sauce and melted cheese",
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
          <div className="row justify-content-center">
            {renderCardMobile(
              "img/orderSloppyPizza-min.png",
              "Sloppy Joe Special",
              25,
              "Loaded with seasoned ground beef, tangy tomato sauce, and a melty cheese blend that brings the classic Sloppy Joe to your plate",
              1
            )}
            {renderCardMobile(
              "img/orderSupreme-min.png",
              "The Sloppy Supreme",
              23,
              "Pepperoni, sausage, bell peppers, onions, and black olives, all layered over a rich tomato base and gooey mozzarella",
              2
            )}
            {renderCardMobile(
              "img/orderMeatlovers-min.png",
              "Sloppy's Carnivore Delight",
              22,
              "Piled high with pepperoni, sausage, ham, and bacon, all perfectly balanced by a hearty tomato sauce and melted cheese",
              3
            )}
            {renderCardMobile(
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
