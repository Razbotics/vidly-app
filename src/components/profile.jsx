import React, { Component } from "react";
import auth from "../services/authService";

class Profile extends Component {
  render() {
    const user = auth.getCurrentUser();
    return <h1>Hello {user.name}!</h1>;
  }
}

export default Profile;
