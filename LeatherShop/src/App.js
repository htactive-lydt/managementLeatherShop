import React from "react";
// import AdminPage from "./pages/admin";
import Home from "./pages/home";
import Users from "./pages/user";
import Customers from "./pages/customer";
import Employees from "./pages/employee";
import Categories from "./pages/category";
import Products from "./pages/product";
import Orders from "./pages/order";
import LeftMenu from "./components/layouts/LeftMenu";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Login from "./pages/login";
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
      orders: [],
      user: null
    };
  }

  getTableCall = table => {
    switch (table) {
      case "users": {
        return this.props.firebase.users();
      }
      case "customers": {
        return this.props.firebase.customers();
      }
      case "employees": {
        return this.props.firebase.employees();
      }
      case "categories": {
        return this.props.firebase.categories();
      }
      case "products": {
        return this.props.firebase.products();
      }
      case "orders": {
        return this.props.firebase.orders();
      }
      default: {
        return "";
      }
    }
  };

  getTableCallUpdate = (table, id) => {
    switch (table) {
      case "users": {
        return this.props.firebase.updateUsers(id);
      }
      case "customers": {
        return this.props.firebase.updateCustomers(id);
      }
      case "employees": {
        return this.props.firebase.updateEmployees(id);
      }
      case "categories": {
        return this.props.firebase.updateCategories(id);
      }
      case "products": {
        return this.props.firebase.updateProducts(id);
      }
      case "orders": {
        return this.props.firebase.updateOrders(id);
      }
      default: {
        return "ly";
      }
    }
  };

  getData = table => {
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
  };

  addNew = (table, rowNew) => {
    let tableCall = this.getTableCall(table);
    tableCall.push(rowNew);
    this.getData(table);
  };

  update = (table, rowUpdate) => {
    const { id, ...rowUpdateSnapshot } = rowUpdate;
    let tableCall = this.getTableCallUpdate(table, id);
    tableCall.set(rowUpdateSnapshot);
  };

  deleteItem = (table, rowUpdate) => {
    const { id, ...rowUpdateSnapshot } = rowUpdate;
    let date = new Date();
    let deleteDate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    let tableCall = this.getTableCallUpdate(table, id);
    tableCall.set({...rowUpdateSnapshot, deleteAt: deleteDate});
  };

  undoDelete = (table, rowUpdate) => {
    const { id, ...rowUpdateSnapshot } = rowUpdate;
    let tableCall = this.getTableCallUpdate(table, id);
    tableCall.set({...rowUpdateSnapshot, deleteAt: ""});
  }
  componentDidMount() {
    this.getData("users");
    this.getData("customers");
    this.getData("employees");
    this.getData("categories");
    this.getData("products");
    this.getData("orders");
    this.authListener();
  }

  authListener = () => {
    this.props.firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
        localStorage.setItem("user", user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem("user");
      }
    });
  };

  render() {
    const {
      users,
      customers,
      employees,
      categories,
      products,
      orders,
      user
    } = this.state;
    if (user) {
      return (
        <Router>
          <Header />
          <LeftMenu />
          <Switch>
            <Route exact path="/" component={() => <Home />} />
            <Route
              path="/users"
              component={() => (
                <Users
                  users={users}
                  addNew={this.addNew}
                  update={this.update}
                  deleteItem={this.deleteItem}
                  undoDelete={this.undoDelete}
                />
              )}
            />
            <Route
              path="/customers"
              component={() => (
                <Customers
                  customers={customers}
                  addNew={this.addNew}
                  update={this.update}
                  deleteItem={this.deleteItem}
                />
              )}
            />
            <Route
              path="/employees"
              component={() => (
                <Employees
                  employees={employees}
                  addNew={this.addNew}
                  update={this.update}
                  undoDelete={this.undoDelete}
                  deleteItem={this.deleteItem}
                />
              )}
            />
            <Route
              path="/categories"
              component={() => (
                <Categories
                  categories={categories}
                  addNew={this.addNew}
                  update={this.update}
                  deleteItem={this.deleteItem}
                  undoDelete={this.undoDelete}
                />
              )}
            />
            <Route
              path="/products"
              component={() => (
                <Products
                  products={products}
                  categories={categories}
                  addNew={this.addNew}
                  update={this.update}
                  deleteItem={this.deleteItem}
                  undoDelete={this.undoDelete}
                />
              )}
            />
            <Route
              path="/orders"
              component={() => (
                <Orders
                  products={products}
                  orders={orders}
                  addNew={this.addNew}
                  update={this.update}
                />
              )}
            />
          </Switch>
          <Footer />
        </Router>
      );
    } else {
      return (
        <Router>
          <Route path="/login" component={() => <Login users={users} />} />
        </Router>
      );
    }
  }
}

const App = withFirebase(AppBase);
export default App;
