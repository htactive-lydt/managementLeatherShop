import React from "react";
// import AdminPage from "./pages/admin";
import Home from "./pages/home";
import Users from "./pages/user";
import Customers from "./pages/customer";
import Employees from "./pages/employee";
import Categories from "./pages/category";
import Products from "./pages/product";
import Orders from "./pages/order";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";


import "./App.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <Home />} />
        <Route path="/users" component={() => <Users />} />
        <Route path="/customers" component={() => <Customers />} />
        <Route path="/employees" component={() => <Employees />} />
        <Route path="/categories" component={() => <Categories />} />
        <Route path="/products" component={() => <Products />} />
        <Route path="/orders" component={() => <Orders />} />
      </Switch>
    </Router>
  );
};

export default App;
