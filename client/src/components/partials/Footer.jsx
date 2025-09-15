import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { FaFacebook } from "react-icons/fa";
import "../../styles/footer.css";

export default function Footer() {
  return (
    <div className="container-fluid mx-0 px-0">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-0 my-0 border-top px-5">
        {/* Left: brand + copyright */}
        <div className="d-flex align-items-center me-auto">
          <span className="mb-0">
            Harvard Suites — Land of the Broken Elevators
          </span>
        </div>

        {/* Right: social icons */}
        <Nav className="ms-auto d-flex flex-row" navbar>
          <NavItem className="ms-3">
            <NavLink
              href="https://www.facebook.com/groups/1191449595443633"
              aria-label="Facebook"
            >
              <FaFacebook size={24} />
            </NavLink>
          </NavItem>
        </Nav>
      </footer>
    </div>
  );
}
