import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "./components/movies";
import "./App.css";
import NavBar from "./components/navBar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";

function App() {
  return (
    <div>
      <NavBar />
      <div className="content m-4 p-5">
        <Switch>
          <Route path="/movies" component={Movies} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
