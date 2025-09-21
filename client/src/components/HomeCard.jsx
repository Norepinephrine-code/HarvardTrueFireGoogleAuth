import React from "react";
import harvardLogo from "../assets/harvard_logo_icon.png";

function HomeCard() {
  return (
    <div className="home-card p-5 rounded text-center">
      {/* Logo + Heading inline, centered */}
      <div className="d-flex justify-content-center align-items-center mb-3">
        <img
        src={harvardLogo}
        alt="Harvard Suites Logo"
        className="me-0 pe-0 d-none d-md-inline"
        />
        <img
          src={harvardLogo}
          alt="Harvard Suites Logo"
          className="d-block mx-auto mb-2 d-md-none"
        />
        <h1 className="display-4 m-0 p-0">
            <span className="d-inline d-md-none">H</span>arvard <span className="shine">Safespace</span>
        </h1>
      </div>

      <p className="lead mb-4">
        This platform is a community-driven space where tenants can share honest
        reviews about their agents. Our goal is to promote transparency, hold
        agents accountable, and help future tenants make informed decisions.
      </p>

      <p className="mb-0">
        Explore agent profiles, read reviews, and contribute your own experiences.{" "}
        Together we build a fairer rental community.
      </p>
    </div>
  );
}

export default HomeCard;
