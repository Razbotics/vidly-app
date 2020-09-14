import React from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";

const getListClass = (item, selectedItem) => {
  let Class = "clickable list-group-item";
  if (selectedItem === item) return (Class += " active");
  return Class;
};

const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  onItemSelect,
  selectedItem,
  title
}) => {
  if (items.length === 0) return null;
  //   const keys = Object.keys(items[0]);

  return (
    <DropdownButton id="dropdown-split-variants-Success" variant="success" title={title}>
      {items.map((item) => (
        <Dropdown.Item
          onClick={() => onItemSelect(item[textProperty])}
          key={item[valueProperty]}
          className={getListClass(item[textProperty], selectedItem)}
        >
          {item[textProperty]}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
