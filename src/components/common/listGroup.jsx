import React from "react";

const getListClass = (item, selectedItem) => {
  let Class = " list-group-item";
  if (selectedItem === item) return (Class += " active");
  return Class;
};

const ListGroup = (props) => {
  const {
    items,
    textProperty,
    valueProperty,
    onItemSelect,
    selectedItem,
  } = props;
  if (items.length === 0) return null;
  //   const keys = Object.keys(items[0]);

  return (
    <ul className="list-group">
      <li
        onClick={() => onItemSelect("All")}
        className={getListClass("All", selectedItem)}
      >
        All Genres
      </li>
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
