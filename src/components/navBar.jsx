import React from "react";
import { Link, NavLink } from "react-router-dom";
import Dropdown from "./common/dropdown";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">
        Vidly
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="true"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          {!user && (
            <React.Fragment>
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink className="nav-link" to="/movies">
                Movies
              </NavLink>
              <NavLink className="nav-link" to="/customers">
                Customers
              </NavLink>
              <NavLink className="nav-link" to="/rentals">
                Rentals
              </NavLink>
              <Dropdown
                label={user.name.split(" ")[0]}
                dropdowns={[
                  { label: "Profile", link: "/profile" },
                  { label: "Logout", link: "/logout" },
                ]}
              />
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
