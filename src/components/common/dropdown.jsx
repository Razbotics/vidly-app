import React from "react";
import { NavDropdown } from "react-bootstrap";

const Dropdown = ({ label, dropdowns }) => {
  return (
    <NavDropdown title={label} id="basic-nav-dropdown">
      {dropdowns.map((dropdown) => (
        <NavDropdown.Item key={dropdown.label} href={dropdown.link}>
          {dropdown.label}
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  );
};

export default Dropdown;
