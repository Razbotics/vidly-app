import React from "react";
import Dropdown from "./common/dropdown";
import auth from "../services/authService";
import { Nav, Navbar } from "react-bootstrap";

const NavBar = () => {
  const user = auth.getCurrentUser();
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Vidly</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {!user && (
          <Nav className="mr-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/logout">Logout</Nav.Link>
          </Nav>
        )}
        {user && (
          <Nav className="mr-auto">
            <Nav.Link href="/movies">Movies</Nav.Link>
            <Nav.Link href="/customers">Customers</Nav.Link>
            <Nav.Link href="/rentals">Rentals</Nav.Link>
            <Dropdown
              label={user.name.split(" ")[0]}
              dropdowns={[
                { label: "Profile", link: "/profile" },
                { label: "Logout", link: "/logout" },
              ]}
            />
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
