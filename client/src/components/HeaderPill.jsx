import React from "react";
import {
  NavItem,
  NavLink,
} from "reactstrap";
import { NavLink as RouterNavLink } from "react-router-dom";
import "../styles/header.css"

function HeaderPill(props) {
    return(
        <NavItem key={props.label}>
            {/* Render React Router's NavLink via the `tag` prop */}
            <NavLink
            tag={RouterNavLink}
            to={props.to}
            // v6: className can be a fn to append 'active' when matched
            className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
            }
            >
            {props.label}
            </NavLink>
        </NavItem>
    );
}

export default HeaderPill;
