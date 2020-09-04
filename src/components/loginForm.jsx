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
    username: Joi.string().required(),
    password: Joi.string().required(),
  };

  validate = () => {
    const errors = {};
    const { account } = this.state;
    const result = Joi.validate(account, this.schema, { abortEarly: false });
    console.log(result);

    if (account.username.trim() === "")
      errors.username = "Username is required";
    if (account.password.trim() === "")
      errors.password = "Password is required";

    return Object.keys(errors).length === 0 ? {} : errors;
  };

  validateProperty = ({ name, value }) => {
    if (name === "username") {
      if (value.trim() === "") return "Username is required.";
    }
    if (name === "password") {
      if (value.trim() === "") return "Password is required.";
    }
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
            errors={errors.username}
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            type="password"
            onChange={this.handleChange}
            errors={errors.password}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
