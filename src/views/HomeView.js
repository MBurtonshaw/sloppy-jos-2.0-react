import { useState, useEffect, useContext } from "react";
import { Context } from "../contexts/context.js";

export default function Home() {
  const { customer, error } = useContext(Context);

  function locationMap() {
    if (window.innerWidth < 800) {
      return (
        <div className="other-map-div">
          <div className="map-div">
            <div className="well">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2987.979148375994!2d-81.64315672653612!3d41.50472667128512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8830fbae42fdaa89%3A0xb4f58c976afcbb42!2s7001%20Euclid%20Ave%2C%20Cleveland%2C%20OH%2044103!5e0!3m2!1sen!2sus!4v1722952925730!5m2!1sen!2sus"
                width="90%"
                height="300px"
                title="pizza-map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <h2 className="mb-4">Location</h2>
          </div>
        </div>
      );
    }

    return (
      <div className="other-map-div">
        <div className="map-div">
          <div className="well">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2987.979148375994!2d-81.64315672653612!3d41.50472667128512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8830fbae42fdaa89%3A0xb4f58c976afcbb42!2s7001%20Euclid%20Ave%2C%20Cleveland%2C%20OH%2044103!5e0!3m2!1sen!2sus!4v1722952925730!5m2!1sen!2sus"
              width="600px"
              height="250px"
              title="pizza-map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <h2 className="mb-4">Location</h2>
        </div>
      </div>
    );
  }

  const renderTagline = () => {
    const isMobile = window.innerWidth < 800;
    return (
      <h1 className={isMobile ? "tagline_small" : "tagline"}>
        Pizza Extra Sloppy is What We Do
      </h1>
    );
  };

  return (
    <>
      <div className="embed-responsive embed-responsive-16by9 pizza-video-div">
        <a href="/menu">
          <video className="pizza-video" autoPlay loop muted>
            <source src="img/fullPizza.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </a>
      </div>

      <div className="container text-center">{renderTagline()}</div>

      <div className="bottom_home_div">
        <div className="to-menu-div">
          <a className="nonchalant" href="/menu">
            <img
              id="to-menu-pic"
              src="img/Pizzas2.png"
              className="img-responsive"
              alt="Pizza"
            />
            <h2>Order Now!</h2>
          </a>
        </div>
        <div className="to-about-div">
          <a className="nonchalant" href="/about">
            <img
              id="founder_pic"
              src="img/founderPic.png"
              className="img-responsive"
              alt="Pizza"
            />
            <h2>About Us</h2>
          </a>
        </div>
      </div>
      {locationMap()}
    </>
  );
}
