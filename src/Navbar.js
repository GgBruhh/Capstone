import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

function NavBar() {
  return (
    <div>
      <Navbar expand="md">
        <NavLink exact to="/" className="navbar-brand">
          Anime Watchlist
        </NavLink>
        <NavLink exact to="/favorites" className="navbar-brand">
          Favorites
        </NavLink>
      </Navbar>
    </div>
  );
}

export default NavBar;
