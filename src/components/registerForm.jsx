import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { register } from "../services/userService";
import { toast } from "react-toastify";

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

  doSubmit = async () => {
    try {
      await register(this.state.data);
      toast.success("Registration successfull");
      this.setState({
        data: {
          username: "",
          password: "",
          name: "",
        },
      });
    } catch (error) {
      if (error.response && error.response.status === 400)
        toast.warn("User already registered");
    }
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
