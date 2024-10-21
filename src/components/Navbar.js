import { useState, useEffect } from "react";

export default function Navbar() {
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
        <nav className="navbar">
          <div>
            <a href="/" aria-label="Home">
              <img
                className="nav-pic-desktop"
                src="img/spLogo.png"
                alt="Jo's Sloppy Pizza"
              />
            </a>
          </div>
          <div className="nav_link_div">
            <a className="nonchalant_nav" href="/">
              Home
            </a>
            <a className="nonchalant_nav" href="/about">
              About
            </a>
            <a className="nonchalant_nav" href="/menu">
              Menu
            </a>
            <a className="nonchalant_nav" href="/contact">
              Contact
            </a>
            <a
              className="shopping-cart-desktop"
              href="/cart"
              aria-label="Shopping Cart"
            >
              <img
                className="cart_nav"
                src="img/shopping-cart2.png"
                alt="Shopping cart icon"
              />
            </a>
          </div>
        </nav>
      </>
    );
  }

  if (tabletMode) {
    return (
      <>
        <nav className="navbar">
          <div className="sloppy_div-tablet">
            <a href="/" aria-label="Home">
              <img
                className="nav-pic-tablet"
                src="img/spLogo.png"
                alt="Jo's Sloppy Pizza"
              />
            </a>
          </div>
          <div className="nav_link_div">
            <a className="nonchalant_nav" href="/">
              Home
            </a>
            <a className="nonchalant_nav" href="/about">
              About
            </a>
            <a className="nonchalant_nav" href="/menu">
              Menu
            </a>
            <a className="nonchalant_nav" href="/contact">
              Contact
            </a>
            <a
              className="shopping-cart-tablet"
              href="/cart"
              aria-label="Shopping Cart"
            >
              <img
                className="cart_nav"
                src="img/shopping-cart2.png"
                alt="Shopping cart icon"
              />
            </a>
          </div>
        </nav>
      </>
    );
  }

  if (mobileMode) {
    return (
      <>
        <nav className="navbar-mobile">
          <div>
            <div className="dropdown">
              <button
                className="dropdown-toggle head_button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  className="nav-pic-mobile"
                  src="img/spLogo.png"
                  alt="Jo's Sloppy Pizza"
                />
              </button>
              <ul className="dropdown-menu text-center">
                <li>
                  <a className="dropdown-item" href="/">
                    Home
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/menu">
                    Menu
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/custom">
                    Build Custom
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/about">
                    About
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/contact">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="nav_link_div">
            <a
              className="shopping-cart-mobile"
              href="/cart"
              aria-label="Shopping Cart"
            >
              <img
                className="cart_nav"
                src="img/shopping-cart2.png"
                alt="Shopping cart icon"
              />
            </a>
          </div>
        </nav>
      </>
    );
  }

  return null; // Fallback if no mode matches
}
