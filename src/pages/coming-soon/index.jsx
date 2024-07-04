/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import "./index.scss";

const ComingSoon = () => {
  const [preloading, setPreloading] = useState(true);
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    setPreloading(false);
  }, []);

  //   window.onload = function () {
  //     // HIDE PRELAODER
  //     $(".preloader").addClass("preloader-hidden");

  //     // SHOW/ANIMATE ANIMATION CONTAINER
  //     setTimeout(function () {
  //       $(".hero .animation-container").each(function () {
  //         var e = $(this);

  //         setTimeout(function () {
  //           e.addClass("run-animation");
  //         }, e.data("animation-delay"));
  //       });
  //     }, 900);
  //   };

  setTimeout(() => {
    setLoaded(true);
  }, 900);

  return (
    <div className="container">
      <div className={`preloader ${preloading ? null : "preloader-hidden"} `}>
        <div className="spinner">
          <div className="bounce-1"></div>
          <div className="bounce-2"></div>
          <div className="bounce-3"></div>
        </div>
      </div>
      <div className={`hero ${loaded ? "run-animation" : null}`}>
        <div className="front-content">
          <div className="container-mid">
            <div
              className={`animation-container animation-fade-down  ${
                loaded ? "run-animation" : null
              }`}
              data-animation-delay="0"
            >
              <img className="img-responsive logo" src={logo} alt="image" />
            </div>
            <div
              //   className="animation-container animation-fade-right"
              className="animation-container"
              data-animation-delay="300"
            >
              <h1>We're Coming Soon..</h1>
            </div>
            <div
              //   className="animation-container animation-fade-left"
              className="animation-container"
              data-animation-delay="600"
            >
              <p className="subline">
                We're working on our new website. Join our newsletter and get
                notifed.
              </p>
            </div>
            <div
              className="animation-container animation-fade-up"
              data-animation-delay="900"
            >
              <div className="open-popup">Notify Me</div>
            </div>
          </div>
          <div className="footer">
            <div
              className="animation-container animation-fade-up"
              data-animation-delay="1200"
            >
              <p>
                © 2017 Your Brand | Design by{" "}
                <a href="https://templatefoundation.com">Template Foundation</a>
              </p>
            </div>
          </div>
        </div>
        <div className="background-content parallax-on">
          <div className="background-overlay"></div>
          <div className="background-img layer" data-depth="0.05"></div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
