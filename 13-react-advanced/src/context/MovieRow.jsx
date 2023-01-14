import React, { useContext } from "react";
import CartContext from "./cartContext";
import UserContext from "./userContext";

function MovieRow(props) {
  const userContext = useContext(UserContext);
  const cartContext = useContext(CartContext);
  console.log("cart context ", cartContext);
  return (
    <div>
      Movie Row: {userContext.currentUser ? userContext.currentUser.name : ""}
    </div>
  );
}

export default MovieRow;
