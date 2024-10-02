import { useEffect, useState, useContext } from "react";
import { Context } from '../contexts/context.js';

const sidesData = [
  {
    id: 4,
    name: "Jo's Mozz Sticks",
    price: 10,
    description: "Crispy on the outside, gooey on the inside, served with a side of marinara for dipping",
    imgSrc: "img/orderMozzSticks-min.png",
  },
  {
    id: 5,
    name: "Sloppy Buff Wings - Half Dozen",
    price: 10,
    description: "6 Juicy chicken wings coated in a tangy, spicy Buffalo sauce, served with a cooling side of ranch or blue cheese dressing",
    imgSrc: "img/orderBuffaloWings-min.png",
  },
  {
    id: 6,
    name: "Sloppy Buff Wings - 1 Dozen",
    price: 16,
    description: "Oooooweee! Let's make it a 12 piece! Spicy Buffalo sauce, served with a cooling side of ranch or blue cheese dressing",
    imgSrc: "img/orderWings2-min.png",
  },
  {
    id: 2,
    name: "Cheesy Bread",
    price: 10,
    description: "Soft, cheesy perfection with a crisp, golden crust and a gooey, melted center",
    imgSrc: "img/orderCheeseBread-min.png",
  },
  {
    id: 1,
    name: "Garlic Bread",
    price: 7,
    description: "Warm, golden breadsticks infused with rich garlic butter and sprinkled with Parmesan cheese—perfect for dipping",
    imgSrc: "img/orderGarlicBread-min.png",
  },
  {
    id: 3,
    name: "Sloppy Salad",
    price: 10,
    description: "Crisp romaine lettuce, shaved Parmesan, and crunchy croutons tossed in a creamy Caesar dressing",
    imgSrc: "img/orderSalad-min.png",
  },
];

const SideItem = ({ side, addSide }) => (
  <div className="col-12 col-sm-6 col-md-4 col-lg-3 mt-4">
    <div className="card grid-item">
      <img src={side.imgSrc} alt={side.name} className="card-img-top" />
      <p className="card-text description">{side.name}<br/>${side.price}<br/>{side.description}</p>
      <button className="btn btn-primary add-to-cart-btn" onClick={() => addSide(side.id)}>Add to Cart</button>
    </div>
  </div>
);

export default function Sides() {
  const { actions } = useContext(Context);

  const [desktopMode, setDesktopMode] = useState(false);
  const [tabletMode, setTabletMode] = useState(false);
  const [mobileMode, setMobileMode] = useState(false);

  const updateMode = () => {
    const width = window.innerWidth;
    if (width <= 779) {
      setDesktopMode(false);
      setTabletMode(false);
      setMobileMode(true);
    } else if (width <= 1104) {
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

  return (
    <>
      <h4 className="text-center my-3">Order Our Sloppy Sides!</h4>
      <div className="container pb-5">
        <div className={`row justify-content-center ${desktopMode ? '' : 'text-center'}`}>
          {sidesData.map(side => (
            <SideItem key={side.id} side={side} addSide={actions.addSide} />
          ))}
        </div>
      </div>
    </>
  );
}