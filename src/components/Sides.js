import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Sides() {
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
 <h4 className="text-center my-3" >Order Our Sloppy Sides!</h4>
    <div className="container pb-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="card grid-item">
            <img src="img/orderMozzSticks-min.png" alt="Mozzarella Sticks" className="card-img-top"/>
            <p className="card-text description">Jo's Mozz Sticks<br/>$10<br/>Crispy on the
              outside, gooey on the inside, served with a side of marinara for dipping</p>
            <button className="btn btn-primary add-to-cart-btn"
              // onClick={addSideToCart(4, 'Jo\'s Mozz Sticks', 10.00)}
              >Add to Cart</button>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="card grid-item">
            <img src="img/orderBuffaloWings-min.png" alt="Buffalo Wings" className="card-img-top"/>
            <p className="card-text description">Sloppy Buff
                Wings - Half Dozen<br/>$10<br/>6 Juicy chicken wings coated in a tangy,
              spicy Buffalo sauce, served with a cooling side of ranch or blue cheese dressing</p>
            <button className="btn btn-primary add-to-cart-btn"
              // onClick={addSideToCart(5, 'Sloppy Buff Wings - 6pc', 10.00)}
              >Add to Cart</button>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="card grid-item">
            <img src="img/orderWings2-min.png" alt="Buffalo Wings" className="card-img-top"/>
            <p className="card-text description">Sloppy Buff Wings - 1 Dozen<br/>$16<br/>Oooooweee
              let's make it a 12 piece! Spicy Buffalo sauce, served with a cooling side of ranch or
              blue cheese dressing</p>
            <button className="btn btn-primary add-to-cart-btn"
              // onClick={addSideToCart(6, 'Sloppy Buff Wings - 12pc', 16.00)}
              >Add to Cart</button>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="card grid-item">
            <img src="img/orderCheeseBread-min.png" alt="Cheesy Bread" className="card-img-top"/>
            <p className="card-text description">Cheesy Bread<br/>$10<br/>Soft, cheesy
              perfection with a crisp, golden crust and a gooey, melted center</p>
            <button className="btn btn-primary add-to-cart-btn"
              // onClick={addSideToCart(2, 'Cheesy Bread', 10.00)}
              >Add to Cart</button>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mt-4">
          <div className="card grid-item">
            <img src="img/orderGarlicBread-min.png" alt="Garlic Bread" className="card-img-top"/>
            <p className="card-text description">Garlic Bread<br/>$7<br/>Warm, golden
              breadsticks infused with rich garlic butter and sprinkled with Parmesan cheese—perfect for dipping</p>
            <button className="btn btn-primary add-to-cart-btn"
              // onClick={addSideToCart(1, 'Garlic Bread', 7.00)}
              >Add to Cart</button>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mt-4">
          <div className="card grid-item">
            <img src="img/orderSalad-min.png" alt="Salad" className="card-img-top"/>
            <p className="card-text description">Sloppy Salad<br/>$10<br/>Crisp romaine
              lettuce, shaved Parmesan, and crunchy croutons tossed in a creamy Caesar dressing</p>
            <button className="btn btn-primary add-to-cart-btn"
              // onClick={addSideToCart(3, 'Sloppy Salad', 10.00)}
              >Add to Cart</button>
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
       <h4 className="text-center my-3" >Order Our Sloppy Sides!</h4>
<div className="container pb-5 text-center">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-3 mt-2">
          <div className="card">
            <img src="img/orderMozzSticks-min.png" alt="Mozzarella Sticks" className="card-img-top" />
            <p className="text-center">Jo's Mozz Sticks<br/>$10<br/></p><p className="p-2">Crispy on the
              outside, gooey on the inside, served with a side of marinara for dipping</p>
            <button className="btn btn-primary w-50 m-auto m-2 mb-2"
              // onClick={addSideToCart(4, 'Jo\'s Mozz Sticks', 10.00)}
              >Add to Cart</button>
          </div>
        </div>
        <div className="col-12 col-lg-3 mt-2">
          <div className="card">
            <img src="img/orderBuffaloWings-min.png" alt="Buffalo Wings" className="card-img-top" />
            <p className="text-center">Sloppy Buff
                Wings - Half Dozen<br/>$10<br/></p><p className="p-2">6 Juicy chicken wings coated in a tangy,
              spicy Buffalo sauce, served with a cooling side of ranch or blue cheese dressing</p>
            <button className="btn btn-primary w-50 m-auto m-2 mb-2"
              // onClick={addSideToCart(5, 'Sloppy Buff Wings - 6pc', 10.00)}
              >Add to Cart</button>
          </div>
        </div>
        <div className="col-12 col-lg-3 mt-2">
          <div className="card">
            <img src="img/orderWings2-min.png" alt="Buffalo Wings" className="card-img-top" />
            <p className="text-center">Sloppy Buff Wings - 1 Dozen<br/>$16<br/></p><p className="p-2">Oooooweee
              let's make it a 12 piece! Spicy Buffalo sauce, served with a cooling side of ranch or
              blue cheese dressing</p>
            <button className="btn btn-primary w-50 m-auto m-2 mb-2"
              // onClick={addSideToCart(6, 'Sloppy Buff Wings - 12pc', 16.00)}
              >Add to Cart</button>
          </div>
        </div>
        <div className="col-12 col-lg-3 mt-2">
          <div className="card">
            <img src="img/orderCheeseBread-min.png" alt="Cheesy Bread" className="card-img-top" />
            <p className="text-center">Cheesy Bread<br/>$10<br/></p><p className="p-2">Soft, cheesy
              perfection with a crisp, golden crust and a gooey, melted center</p>
            <button className="btn btn-primary w-50 m-auto m-2 mb-2"
              // onClick={addSideToCart(2, 'Cheesy Bread', 10.00)}
              >Add to Cart</button>
          </div>
        </div>
        <div className="col-12 col-lg-3 mt-2">
          <div className="card">
            <img src="img/orderGarlicBread-min.png" alt="Garlic Bread" className="card-img-top" />
            <p className="text-center">Garlic Bread<br/>$7<br/>Warm, golden
              breadsticks infused with rich garlic butter and sprinkled with Parmesan cheese—perfect for dipping</p>
            <button className="btn btn-primary w-50 m-auto m-2 mb-2"
              // onClick={addSideToCart(1, 'Garlic Bread', 7.00)}
              >Add to Cart</button>
          </div>
        </div>
        <div className="col-12 col-lg-3 mt-2">
          <div className="card">
            <img src="img/orderSalad-min.png" alt="Salad" className="card-img-top" />
            <p className="text-center">Sloppy Salad<br/>$10<br/>Crisp romaine
              lettuce, shaved Parmesan, and crunchy croutons tossed in a creamy Caesar dressing</p>
            <button className="btn btn-primary w-50 m-auto m-2 mb-2"
              // onClick={addSideToCart(3, 'Sloppy Salad', 10.00)}
              >Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
      </>
    );
  }

}
