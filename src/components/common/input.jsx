import React from "react";

const Input = ({ name, label, value, errors, onChange, autoFocus, type }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        autoFocus={autoFocus}
        value={value}
        onChange={onChange}
        id={name}
        type={type ? type : "text"}
        name={name}
        placeholder={label}
        autoComplete="on"
        className="form-control"
      />
      {errors && <div className="alert alert-danger">{errors}</div>}
    </div>
  );
};

export default Input;
