import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const { data } = this.state;
    const option = { abortEarly: false };
    const { error } = Joi.validate(data, this.schema, option);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const { errors, data } = this.state;
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  renderButton = (label) => {
    return (
      <button disabled={this.validate()} onClick={this.handleSubmit} className="btn btn-primary">
        {label}
      </button>
    );
  };

  renderSelect(name, label, options, { placeholder }) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        errors={errors[name]}
        placeholder={placeholder}
      />
    );
  }

  renderInput = (name, label, { focus, type, placeholder }) => {
    const { data, errors } = this.state;
    return (
      <Input
        autoFocus={focus}
        placeholder={placeholder}
        name={name}
        value={data[name]}
        type={type}
        label={label}
        onChange={this.handleChange}
        errors={errors ? errors[name] : null}
      />
    );
  };
}

export default Form;
