import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="mt-28">
      <video
        autoPlay
        muted
        loop
        className="fixed top-0 left-0 w-full h-full object-cover ">
        <source
          src="../../public/7815960-hd_1920_1080_25fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="hero min-h-screen" style={{}}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              If you want to create your own data, its price, name and more,
              click on the button below
            </p>
            <Link to="/products">
              {" "}
              <button className="btn btn-primary">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
