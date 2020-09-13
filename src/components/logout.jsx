import { Component } from "react";
import auth from "../services/authService";
import { toast } from 'react-toastify';

class Logout extends Component {
  componentDidMount() {
    auth.logout();
    this.props.history.replace("/login")
    toast.warn("You are logged out!")
  }
  render() {
    return null;
  }
}

export default Logout;
