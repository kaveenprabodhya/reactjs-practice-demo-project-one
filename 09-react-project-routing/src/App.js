import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navbar";
import Home from "./components/home";
import Posts from "./components/posts";
import Products from "./components/products";
import Dashboard from "./components/Admin/dashboard";
import ProductDetails from "./components/productDetails";
import NotFound from "./components/notFound";

function App() {
  return (
    <div>
      <NavBar />
      <div className="content">
        <Switch>
          <Route path="/products/:id" component={ProductDetails} />
          {/* <Route path="/products" component={Products} /> */}
          {/* you can pass props to routing */}
          <Route
            path="/products"
            render={(props) => <Products sortBy="newest" {...props} />}
          />
          <Route path="/posts/:year?/:month?" component={Posts} />
          <Route path="/admin" component={Dashboard} />
          <Redirect path="/message" to="/posts" />
          <Route path="/not-found" component={NotFound} />
          {/* <Route path="/" exact component={Home} /> */}
          {/* we can use Switch instead of exact */}
          <Route path="/" exact component={Home} />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
