import React, { Component } from "react";
import Input from "./common/input";
import Joi from "joi-browser";

class LoginForm extends Component {
  state = {
    account: {
      username: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  validate = () => {
    const { account } = this.state;
    const option = { abortEarly: false };
    const { error } = Joi.validate(account, this.schema, option);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const {error} = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const { errors, account } = this.state;

    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors });
    if (Object.keys(errors).length > 0) return;
    console.log("Submitted");
    this.setState({
      account: {
        username: "",
        password: "",
      },
    });
  };
  render() {
    const { account, errors } = this.state;
    return (
      <div className="loginWidth">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            autoFocus={true}
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
            errors={errors ? errors.username : null}
          />

          <Input
            name="password"
            value={account.password}
            label="Password"
            type="password"
            onChange={this.handleChange}
            errors={errors ? errors.password : null}
          />
          <button
          disabled={this.validate()} 
          className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
