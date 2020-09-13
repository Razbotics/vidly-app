import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import { toast } from "react-toastify";

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };

  componentDidMount() {}

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    const { username, password } = this.state.data;
    try {
      await auth.login(username, password);
      window.location = "/movies";
    } catch (error) {
      if (error.response && error.response.status === 400)
        toast.error("Invalid email or password");
    }
  };

  render() {
    if (localStorage.getItem("token")) {
      window.location = "/movies";
    }
    return (
      <div className="loginWidth">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", { focus: true })}
          {this.renderInput("password", "Password", { type: "password" })}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
