import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getCurrentUser } from "../../services/authService";

const ProtectectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        console.log(props);
        if (!getCurrentUser())
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    ></Route>
  );
};

export default ProtectectedRoute;
