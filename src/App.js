import React from "react";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/Homepage";
import { ToastContainer } from "react-toastify";
import { Route, Switch } from "react-router";

function App() {
  return (
    <div>
      <ToastContainer />
      <Switch>
        <Route exact path={"/"} component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
