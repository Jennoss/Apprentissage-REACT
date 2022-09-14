import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light navbarOpacity">
      <NavLink to="/" className="navbar-brand">
        <img className="logo-navbar" src="./logo.png" alt="" />
      </NavLink>
    </nav>
  );
};

export default Navbar;
