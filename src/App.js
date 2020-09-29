import React from "react";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/Homepage";
import SearchRestaurants from "./pages/SearchRestaurants";
import { ToastContainer } from "react-toastify";
import { Route, Switch, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

function App() {
  return (
    <div>
      <AppBar>
        <Toolbar>
          <Typography variant="h6">
            <Link style={{ textDecoration: "none" }} to="/">
              <span style={{ color: "white" }}>Restaurant Finder</span>
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
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
