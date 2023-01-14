import React from "react";
import { Link } from "react-router-dom";

// with link you can create this a single page instead using anchor tag link doesnt reload page

const NavBar = () => {
  return (
    <ul>
      <li>
        {/* <a href="/">Home</a> */}
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/products">Products</Link>
      </li>
      <li>
        <Link to="/posts/2018/06">Posts</Link>
      </li>
      <li>
        <Link to="/admin">Admin</Link>
      </li>
    </ul>
  );
};

export default NavBar;
