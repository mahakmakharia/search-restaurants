import React from "react";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/Homepage";
import SearchRestaurants from "./pages/SearchRestaurants";
import { ToastContainer } from "react-toastify";
import { Route, Switch } from "react-router";

function App() {
  return (
    <div>
      <ToastContainer />
      <Switch>
        <Route exact path={"/"} component={HomePage} />
        <Route
          exact
          path={"/location/:locationId"}
          component={SearchRestaurants}
        />
      </Switch>
    </div>
  );
}

export default App;
