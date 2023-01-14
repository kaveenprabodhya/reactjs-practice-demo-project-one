import React from "react";
import { Route, Switch } from "react-router-dom";
import Posts from "./posts";
import SideBar from "./sidebar";
import Users from "./users";
const Dashboard = ({ match }) => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <SideBar />
      <Switch>
        <Route path="/admin/users" component={Users} />
        <Route path="/admin/posts" component={Posts} />
      </Switch>
    </div>
  );
};

export default Dashboard;
