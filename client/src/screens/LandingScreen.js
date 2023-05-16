import React from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init({
  duration: 2000,
});

function LandingScreen() {
  return (
    <div className="row landing">
      <div className="col-md-12 text-center">
        <h2 data-aos="zoom-in" style={{ color: "white", fontSize: "100px" }}>
          ROOM KHOJO
        </h2>
        <h1 data-aos="zoom-out" style={{ color: "white" }}>
           Customer Satisfaction is a Philosophy
        </h1>
          <a href='/home'><button className="btn btn-primary landingBtn">Get Started</button></a>
      </div>
    </div>
  );
}

export default LandingScreen;
