import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Specialties from "../components/Specialties";
import Sides from "../components/Sides";
import { Context } from "../contexts/context.js";

export default function Menu() {
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

  if (desktopMode) {
    return (
      <>
        <div className="container mt-5 pb-5">
          <div className="row justify-content-center">
            <h4 className="text-center my-3 fs-1">
              Build Your Own and Make it Extra Sloppy!
            </h4>
            <div className="col-11 col-lg-5 grid-item p-0">
              <div className="card">
                <a href="/custom">
                  <img
                    src="img/Pizzas3.png"
                    alt="Custom Pizza"
                    className="card-img-top"
                  />
                  <p className="card-text description">
                    Create Your Own Sloppy Pizza!
                  </p>
                  <button className="btn btn-primary add-to-cart-btn">
                    Build Now
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
        <Specialties />
        <Sides />
      </>
    );
  }
  if (tabletMode) {
    return (
      <>
        <div className="pb-5 px-5 w-75 mx-auto">
          <h4 className="text-center p-4 pt-5 fs-1">
            Build Your Own and Make it Extra Sloppy!
          </h4>
          <div className="">
            <div className="card text-center">
              <a className="nonchalant" href="/custom">
                <img
                  src="img/Pizzas3.png"
                  alt="Custom Pizza"
                  className="card-img-top"
                />
                <p className="fs-4 pt-1">Create Your Own Sloppy Pizza!</p>
                <button className="btn btn-primary w-50 m-auto mb-2">
                  Build Now
                </button>
              </a>
            </div>
          </div>
        </div>
        <Specialties />
        <Sides />
      </>
    );
  }
  if (mobileMode) {
    return (
      <>
        <div className="pb-5 mx-2">
          <h4 className="text-center p-4 pt-5 fs-1">
            Build Your Own and Make it Extra Sloppy!
          </h4>
          <div className="">
            <div className="card text-center">
              <a className="nonchalant" href="/custom">
                <img
                  src="img/Pizzas3.png"
                  alt="Custom Pizza"
                  className="card-img-top"
                />
                <p className="fs-4 pt-1">Create Your Own Sloppy Pizza!</p>
                <button className="btn btn-primary w-50 m-auto mb-2">
                  Build Now
                </button>
              </a>
            </div>
          </div>
        </div>
        <Specialties />
        <Sides />
      </>
    );
  }
}
