import React from "react";

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
}) => {
  if (items.length === 0) return null;
  //   const keys = Object.keys(items[0]);

  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          onClick={() => onItemSelect(item[textProperty])}
          key={item[valueProperty]}
          className={getListClass(item[textProperty], selectedItem)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
