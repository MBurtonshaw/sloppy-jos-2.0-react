import { useEffect, useState, useContext } from "react";
import { Context } from "../contexts/context.js";

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
    if (width <= 779) {
      setDeviceMode("mobile");
    } else if (width <= 1104) {
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

  const addSide = (id, title, price, quantity) => {
    console.log('side quantity: ' + quantity)
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

  const renderCardMobile = (side) => (
    <div className="pb-4 mx-2">
      <h4 className="text-center pb-3 pt-4">{side.title}</h4>
      <div className="">
        <div className="card text-center">
          <img src={side.imgSrc} alt="Custom Pizza" className="card-img-top" />
          <p className="mx-2">
            {side.title}
            <br />${side.price}
            <br />
            {side.description}
          </p>
          <button
            className="btn btn-primary w-50 m-auto mb-2"
            onClick={() => addSide(side.id, side.title, side.price, 1)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );

  function sideRenderer() {
    if(deviceMode === 'mobile' || deviceMode === 'tablet') {
      return sidesData.map(renderCardMobile);
    }
    return sidesData.map(renderCard);
  }

  return (
    <>
      <h4 className="text-center my-3 fs-1">Order Our Sloppy Sides!</h4>
      <div className="container pb-5">
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
