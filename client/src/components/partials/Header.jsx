import React from "react";
import {
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
} from "reactstrap";
import { NavLink as RouterNavLink } from "react-router-dom";
import HeaderPill from "../HeaderPill";
import "../../styles/header.css"

import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export default function Header() {
  const [open, setOpen] = React.useState(false);

  // label-to-path mapping
  const links = [
    { label: "Home", to: "/", icon: (<HomeIcon/>) },
    { label: "Freedom Wall", to: "/freedomWall", icon: (<PeopleAltIcon/>) },
    { label: "AgentToReview", to: "/agentWall", icon: (<AccountBoxIcon/>)},
  ];

  return (
    <>
      {/* navbar classes so the toggler icon styles apply */}
      <header className="navbar navbar-dark bg-dark d-flex justify-content-center py-2 px-0 w-100 sticky-top">
        {/* desktop pills */}
        <Nav pills className="nav-pills d-none d-md-flex">
          {links.map(({ label, to }) => (
            <HeaderPill 
              key={label}
              label={label}
              to={to}
            />
          ))}
        </Nav>

        {/* mobile hamburger (right side) */}
        <NavbarToggler
          className="d-md-none ms-auto me-2 p-1"
          onClick={() => setOpen(true)}
        >
          <span className="navbar-toggler-icon" />
        </NavbarToggler>

        {/* mobile offcanvas menu (slides from the right) */}
        <Offcanvas
            direction="end"
            isOpen={open}
            toggle={() => setOpen(false)}
            className="offcanvas-dark"            // apply dark theme styles
        >
            <OffcanvasHeader
              toggle={() => setOpen(false)}
              className="text-white border-bottom" // keep header readable + separated
              closeClassName="btn-close-white"     // white close (X) icon on dark bg
            >
              Menu
            </OffcanvasHeader>

            <OffcanvasBody>
              <Nav pills vertical>
                {links.map(({ label, to, icon }) => (
                  <NavItem key={label}>
                    <NavLink
                      tag={RouterNavLink}
                      to={to}
                      className={({ isActive }) =>
                        "nav-link" + (isActive ? " active" : "")
                      }
                      onClick={() => setOpen(false)} // close after click
                    >
                      {icon}
                      {label}
                    </NavLink>
                  </NavItem>
                ))}
              </Nav>
            </OffcanvasBody>
          </Offcanvas>
      </header>
    </>
  );
}
