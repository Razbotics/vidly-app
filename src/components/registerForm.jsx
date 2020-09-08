import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required()
      .label("Username"),
    password: Joi.string().min(5).max(30).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = () => {
    console.log("Submitted");
    this.setState({
      data: {
        username: "",
        password: "",
        name: "",
      },
    });
  };

  render() {
    return (
      <div className="loginWidth">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", { focus: true })}
          {this.renderInput("password", "Password", { type: "password" })}
          {this.renderInput("name", "Name", {})}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
