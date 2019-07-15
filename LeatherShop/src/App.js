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
import { withFirebase } from "./components/Firebase";

import "./App.css";

class AppBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      customers: [],
      employees: [],
      categories: [],
      products: [],
      orders: []
    };
  }

  getTableCall(table, uid) {
    switch (table) {
      case "users": {
        return this.props.firebase.users(uid);
      }
      case "customers": {
        return this.props.firebase.users(uid);
      }
      case "employees": {
        return this.props.firebase.employees(uid);
      }
      case "categories": {
        return this.props.firebase.categories(uid);
      }
      case "products": {
        return this.props.firebase.products(uid);
      }
      case "orders": {
        return this.props.firebase.orders(uid);
      }
      default: {
        return "";
      }
    }
  }

  getData(table) {
    let tableCall = this.getTableCall(table);
    tableCall.on("value", snapshot => {
      const object = snapshot.val();
      if (object) {
        const objectList = Object.keys(object).map(key => ({
          ...object[key],
          id: key
        }));
        this.setState({
          [table]: objectList
        });
      } else {
        this.setState({
          [table]: []
        });
      }
    });
  }

  addNew(table, rowNew) {
    let tableCall = this.getTableCall(table);

    tableCall.push(rowNew);
    this.getData(table);
  }

  update(table, rowUpdate) {
    const { uid, ...rowUpdateSnapshot } = rowUpdate;
    let tableCall = this.getTableCall(table, uid);

    tableCall.set(...rowUpdateSnapshot);
    this.getData(table);
  }

  componentDidMount() {
    this.getData("users");
    this.getData("customers");
    this.getData("employees");
    this.getData("categories");
    this.getData("products");
    this.getData("orders");
  }

  render() {
    const {
      users,
      customers,
      employees,
      categories,
      products,
      orders
    } = this.state;
    console.log(this.state)
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={() => <Home />} />
          <Route
            path="/users"
            component={() => (
              <Users users={users} addNew={this.addNew} update={this.update} />
            )}
          />
          <Route
            path="/customers"
            component={() => (
              <Customers getTableCall={this.getTableCall} customers={customers} addNew={this.addNew} update={this.update} />
            )}
          />
          <Route
            path="/employees"
            component={() => (
              <Employees employees={employees} addNew={this.addNew} update={this.update} />
            )}
          />
          <Route
            path="/categories"
            component={() => (
              <Categories categories={categories} addNew={this.addNew} update={this.update} />
            )}
          />
          <Route
            path="/products"
            component={() => (
              <Products products={products} addNew={this.addNew} update={this.update} />
            )}
          />
          <Route
            path="/orders"
            component={() => (
              <Orders orders={orders} addNew={this.addNew} update={this.update} />
            )}
          />
        </Switch>
      </Router>
    );
  }
}

const App = withFirebase(AppBase);
export default App;
