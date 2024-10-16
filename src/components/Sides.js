import { useEffect, useState, useContext } from "react";
import { Context } from "../contexts/context.js";
import { toast } from "react-toastify";

const sidesData = [
  {
    id: 4,
    title: "Jo's Mozz Sticks",
    price: 10,
    description:
      "Crispy on the outside, gooey on the inside, served with a side of marinara for dipping",
    imgSrc: "img/orderMozzSticks-min.png",
  },
  {
    id: 5,
    title: "Sloppy Buff Wings - Half Dozen",
    price: 10,
    description:
      "6 Juicy chicken wings coated in a tangy, spicy Buffalo sauce, served with a cooling side of ranch or blue cheese dressing",
    imgSrc: "img/orderBuffaloWings-min.png",
  },
  {
    id: 6,
    title: "Sloppy Buff Wings - 1 Dozen",
    price: 16,
    description:
      "Oooooweee! Let's make it a 12 piece! Spicy Buffalo sauce, served with a cooling side of ranch or blue cheese dressing",
    imgSrc: "img/orderWings2-min.png",
  },
  {
    id: 2,
    title: "Cheesy Bread",
    price: 10,
    description:
      "Soft, cheesy perfection with a crisp, golden crust and a gooey, melted center",
    imgSrc: "img/orderCheeseBread-min.png",
  },
  {
    id: 1,
    title: "Garlic Bread",
    price: 7,
    description:
      "Warm, golden breadsticks infused with rich garlic butter and sprinkled with Parmesan cheese—perfect for dipping",
    imgSrc: "img/orderGarlicBread-min.png",
  },
  {
    id: 3,
    title: "Sloppy Salad",
    price: 10,
    description:
      "Crisp romaine lettuce, shaved Parmesan, and crunchy croutons tossed in a creamy Caesar dressing",
    imgSrc: "img/orderSalad-min.png",
  },
];

export default function Sides() {
  const { actions } = useContext(Context);

  const [deviceMode, setDeviceMode] = useState("desktop");

  const updateMode = () => {
    const width = window.innerWidth;
    if (width <= 600) {
      setDeviceMode("mobile");
    } else if (width <= 900) {
      setDeviceMode("tablet");
    } else {
      setDeviceMode("desktop");
    }
  };

  useEffect(() => {
    updateMode();
    window.addEventListener("resize", updateMode);
    return () => {
      window.removeEventListener("resize", updateMode);
    };
  }, []);

  function notify() {
    toast.success(`Side order added to cart`, {
      position: "top-center",
      autoClose: 1500,
      theme: "light",
    });
  }

  const addSide = (id, title, price, quantity) => {
    notify();
    actions.addSide(id, title, price, quantity);
  };

  const renderCard = (side) => (
    <div key={side.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mt-3">
      <div className="card grid-item">
        <img src={side.imgSrc} alt={side.title} className="card-img-top" />
        <p className="card-text description">
          {side.title}
          <br />${side.price}
          <br />
          {side.description}
        </p>
        <button
          className="btn btn-primary add-to-cart-btn"
          onClick={() => addSide(side.id, side.title, side.price, 1)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );

  const renderCardMobile = (side) => {
    if (deviceMode === "mobile") {
      return (
        <div className="pb-4 mx-2">
          <div className="card text-center">
            <img
              src={side.imgSrc}
              alt="Custom Pizza"
              className="card-img-top"
            />
            <span className="mx-2 fs-3">{side.title}</span>
            <span className="fs-5">${side.price}</span>
            <span>{side.description}</span>
            <button
              className="btn btn-primary w-50 m-auto mt-3 mb-2"
              onClick={() => addSide(side.id, side.title, side.price, 1)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      );
    }
    if (deviceMode === "tablet") {
      return (
        <div className="pb-4 mx-2 w-50 mx-auto">
          <div className="card text-center">
            <img
              src={side.imgSrc}
              alt="Custom Pizza"
              className="card-img-top"
            />
            <span className="mx-2 fs-3">{side.title}</span>
            <span className="fs-5">${side.price}</span>
            <span>{side.description}</span>
            <button
              className="btn btn-primary w-50 m-auto mt-3 mb-2"
              onClick={() => addSide(side.id, side.title, side.price, 1)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      );
    }
  };

  function sideRenderer() {
    if (deviceMode === "mobile" || deviceMode === "tablet") {
      return sidesData.map(renderCardMobile);
    }
    return sidesData.map(renderCard);
  }

  if (deviceMode === "mobile") {
    return (
      <>
        <h4 className="text-center my-3 fs-1">Order Our Sloppy Sides!</h4>
        <div className="pb-5 mx-2">
          <div
            className={`row justify-content-center ${
              deviceMode === "desktop" ? "" : "text-center"
            }`}
          >
            {sideRenderer()}
          </div>
        </div>
      </>
    );
  }

  if (deviceMode === "tablet") {
    return (
      <>
        <h4 className="text-center my-3 fs-1">Order Our Sloppy Sides!</h4>
        <div className="pb-5 mx-2">
          <div
            className={`row justify-content-center ${
              deviceMode === "desktop" ? "" : "text-center"
            }`}
          >
            {sideRenderer()}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <h4 className="text-center my-3 fs-1">Order Our Sloppy Sides!</h4>
      <div className="container mx-auto pb-5 mx-2">
        <div
          className={`row justify-content-center ${
            deviceMode === "desktop" ? "" : "text-center"
          }`}
        >
          {sideRenderer()}
        </div>
      </div>
    </>
  );
}
