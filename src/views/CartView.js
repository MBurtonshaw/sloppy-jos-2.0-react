import { useContext, useState, useEffect } from "react";
import { Context } from "../contexts/context.js";

export default function Cart() {
  const { actions, cart } = useContext(Context);
  const specialties = cart.specialtyPizzas;
  const customs = cart.customPizzas;
  const sides = cart.sides;

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

  function mapSpecialties() {
    if (mobileMode || tabletMode) {
      return specialties.map((item, i) => {
        if (item === 1) {
          return (
            <li className="undercover add_border_bottom" key={i}>
              Sloppy Joe
            </li>
          );
        } else if (item === 2) {
          return (
            <li className="undercover add_border_bottom" key={i}>
              Supreme
            </li>
          );
        } else if (item === 3) {
          return (
            <li className="undercover add_border_bottom" key={i}>
              Carnivore
            </li>
          );
        } else if (item === 4) {
          return (
            <li className="undercover add_border_bottom" key={i}>
              Zesty Trio
            </li>
          );
        }
      });
    }
    return specialties.map((item, i) => {
      if (item === 1) {
        return (
          <li className="undercover add_border_bottom" key={i}>
            Sloppy Joe Special
          </li>
        );
      } else if (item === 2) {
        return (
          <li className="undercover add_border_bottom" key={i}>
            Sloppy Supreme
          </li>
        );
      } else if (item === 3) {
        return (
          <li className="undercover add_border_bottom" key={i}>
            Carnivore's Delight
          </li>
        );
      } else if (item === 4) {
        return (
          <li className="undercover add_border_bottom" key={i}>
            Zesty Trio
          </li>
        );
      }
    });
  }

  function mapSpecialtiesPrice() {
    return specialties.map((item, i) => {
      if (item === 1) {
        return (
          <li className="undercover add_border_bottom" key={i}>
            $25
          </li>
        );
      } else if (item === 2) {
        return (
          <li className="undercover add_border_bottom" key={i}>
            $23
          </li>
        );
      } else if (item === 3) {
        return (
          <li className="undercover add_border_bottom" key={i}>
            $22
          </li>
        );
      } else if (item === 4) {
        return (
          <li className="undercover add_border_bottom" key={i}>
            $23.50
          </li>
        );
      }
    });
  }

  function mapCustoms() {
    return customs.map((item, i) => {
      return (
        <li className="undercover add_border_bottom" key={i}>
          {item.id}
        </li>
      );
    });
  }

  function mapCustomsPrice() {
    return customs.map((item, i) => {
      return (
        <li className="undercover add_border_bottom" key={i}>
          ${item.price}
        </li>
      );
    });
  }

  function mapSpecialtyActions() {
    return specialties.map((item, i) => {
      return (
        <li key={i} className="undercover add_border_bottom">
          <p className='fake_anchor' onClick={() => removeSpecialty(item)}>remove</p>
        </li>
      );
    });
  }

  function mapCustomsActions() {
    return customs.map((item, i) => {
      return (
        <li key={i} className="undercover add_border_bottom">
          <p className='fake_anchor' onClick={() => removeCustom(item.id)}>remove</p>
        </li>
      );
    });
  }

  function mapSidesActions() {
    return sides.map((item, i) => {
      return (
        <li key={i} className="undercover add_border_bottom">
          <p className='fake_anchor' onClick={() => removeSide(item)}>remove</p>
        </li>
      );
    });
  }

  async function removeSpecialty(id) {
    await actions.removeSpecialty(id);
  }

  async function removeCustom(id) {
    console.log("Removing custom pizza with ID:", id);
    await actions.removeCustom(id);
  }

  async function removeSide(id) {
    await actions.removeSide(id);
  }

  function mapSides() {
    if (mobileMode || tabletMode) {
      return sides.map((item, i) => {
        if (item === 1) {
          return (
            <li className="undercover add_border_bottom" key={i}>
              G Bread
            </li>
          );
        } else if (item === 2) {
          return (
            <li className="undercover add_border_bottom" key={i}>
              C Bread
            </li>
          );
        } else if (item === 3) {
          return (
            <li className="undercover add_border_bottom" key={i}>
              Salad
            </li>
          );
        } else if (item === 4) {
          return (
            <li className="undercover add_border_bottom" key={i}>
              Mozz Sticks
            </li>
          );
        } else if (item === 5) {
          return (
            <li className="undercover add_border_bottom" key={i}>
              Wings - 6pc
            </li>
          );
        } else if (item === 6) {
          return (
            <li className="undercover add_border_bottom" key={i}>
              Wings - 12pc
            </li>
          );
        }
      });
    }
    return sides.map((item, i) => {
      if (item === 1) {
        return (
          <li className="undercover add_border_bottom" key={i}>
            Garlic Bread
          </li>
        );
      } else if (item === 2) {
        return (
          <li className="undercover add_border_bottom" key={i}>
            Cheesy Bread
          </li>
        );
      } else if (item === 3) {
        return (
          <li className="undercover add_border_bottom" key={i}>
            Sloppy Salad
          </li>
        );
      } else if (item === 4) {
        return (
          <li className="undercover add_border_bottom" key={i}>
            Jo's Mozz Sticks
          </li>
        );
      } else if (item === 5) {
        return (
          <li className="undercover add_border_bottom" key={i}>
            Sloppy Buff Wings - 6pc
          </li>
        );
      } else if (item === 6) {
        return (
          <li className="undercover add_border_bottom" key={i}>
            Sloppy Buff Wings - 12pc
          </li>
        );
      }
    });
  }

  function mapSidesPrice() {
    return sides.map((item, i) => {
      if (item === 1) {
        return (
          <li className="undercover add_border_bottom" key={i}>
            $7
          </li>
        );
      } else if (item === 2) {
        return (
          <li className="undercover add_border_bottom" key={i}>
            $10
          </li>
        );
      } else if (item === 3) {
        return (
          <li className="undercover add_border_bottom" key={i}>
            $10
          </li>
        );
      } else if (item === 4) {
        return (
          <li className="undercover add_border_bottom" key={i}>
            $10
          </li>
        );
      } else if (item === 5) {
        return (
          <li className="undercover add_border_bottom" key={i}>
            $10
          </li>
        );
      } else if (item === 6) {
        return (
          <li className="undercover add_border_bottom" key={i}>
            $16
          </li>
        );
      }
    });
  }

  if (mobileMode || tabletMode) {
    return (
      <>
        <div className="w-100 px-5 text-center">
          <div className="row py-3 px-5">
            <h1 className="">Cart</h1>
            <div className="col"></div>
            <h2 className="col">Total: </h2>
          </div>
          <div className="row py-2">
            <div className="col">
              <h3>Product</h3>
              <ul className="mt-3">{mapSpecialties()}</ul>
              <ul className="mt-3">{mapCustoms()}</ul>
              <ul className="mt-3">{mapSides()}</ul>
            </div>
            <div className="col">
              <h3>Price</h3>
              <ul className="mt-3">{mapSpecialtiesPrice()}</ul>
              <ul className="mt-3">{mapCustomsPrice()}</ul>
              <ul className="mt-3">{mapSidesPrice()}</ul>
            </div>
            <div className="col">
              <h3>Actions</h3>
              <ul className="mt-3">{mapSpecialtyActions()}</ul>
              <ul className="mt-3">{mapCustomsActions()}</ul>
              <ul className="mt-3">{mapSidesActions()}</ul>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="">
        <div className="py-3">
          <h1 className="text-center">Total: </h1>
        </div>
        <div className="row py-2 m-auto text-center">
          <div className="col"></div>
          <div className="col">
            <h3>Price</h3>
            <ul className="mt-3">{mapSpecialtiesPrice()}</ul>
            <ul className="mt-3">{mapCustomsPrice()}</ul>
            <ul className="mt-3">{mapSidesPrice()}</ul>
          </div>
          <div className="col">
            <h3>Product</h3>
            <ul className="mt-3">{mapSpecialties()}</ul>
            <ul className="mt-3">{mapCustoms()}</ul>
            <ul className="mt-3">{mapSides()}</ul>
          </div>
          <div className="col">
            <h3>Actions</h3>
            <ul className="mt-3">{mapSpecialtyActions()}</ul>
            <ul>{mapCustomsActions()}</ul>
            <ul>{mapSidesActions()}</ul>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </>
  );
}
