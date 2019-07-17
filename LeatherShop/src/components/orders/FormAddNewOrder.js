import React, { Component } from "react";
import ProductSearchItem from "./ProductSearchItem";
import ProductChoosedList from "./ProductChoosedList";
import CustomerSearchItem from "./CustomerSearchItem";

export default class FormAddNewOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenForm: false,
      step: 1,
      readyToOrder: false,
      errors: [],
      resultSearchProd: [],
      resultSearchCus: [],
      productChoosed: [],
      valueSearch: "",
      name: "",
      address: "",
      birthday: "",
      phoneNumber: "",
      isMember: "normal"
    };
  }

  changeStateProductChoosed = () => {
    let productChoosed = JSON.parse(localStorage.getItem("items"));
    if (productChoosed && productChoosed.length !== 0) {
      this.setState({
        productChoosed,
        readyToOrder: true
      });
    } else {
      this.setState({
        productChoosed: [],
        readyToOrder: false
      });
    }
  };

  componentDidMount() {
    this.changeStateProductChoosed();
  }

  nextStep = () => {
    this.setState({
      step: 2
    });
  };

  backStep = () => {
    this.setState({
      step: 1
    });
  };

  addToCart = item => {
    let data = JSON.parse(localStorage.getItem("items")) || [];

    const { id } = item;
    let index = data.findIndex(item => item.id === id);
    if (index !== -1) {
      data[index].quantity += 1;
    } else {
      data.push({
        id,
        quantity: 1
      });
    }
    localStorage.setItem("items", JSON.stringify(data));
    this.changeStateProductChoosed();
  };

  deleteCart = id => {
    let data = JSON.parse(localStorage.getItem("items")) || [];

    let index = data.findIndex(item => item.id === id);

    data.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(data));
    this.changeStateProductChoosed();
  };

  handleOpenForm = () => {
    this.setState(prevState => ({
      isOpenForm: !prevState.isOpenForm
    }));
  };

  handleChange = event => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  handleChangeIsMember = type => {
    this.setState({
      isMember: type
    });
  };

  searchProduct = () => {
    const { listProducts } = this.props;
    let searchValue = this.state.valueSearchProd;
    if (listProducts.length > 0) {
      let resultSearchProd = listProducts.filter(
        item => item.name.search(searchValue) !== -1
      );
      this.setState({
        searchValue,
        resultSearchProd
      });
    }
  };

  searchCustomer = () => {
    const { customers } = this.props;

    let { valueSearchCus, optionSearchCus } = this.state;
    if (customers.length > 0) {
      let resultSearchCus = [];
      if (optionSearchCus === "name") {
        resultSearchCus = customers.filter(
          item => item.name.search(valueSearchCus) !== -1
        );
      } else {
        resultSearchCus = customers.filter(
          item => item.phoneNumber.search(valueSearchCus) !== -1
        );
      }
      this.setState({
        resultSearchCus
      });
    }
  };

  showListSearchProd = () => {
    const { resultSearchProd } = this.state;
    let listProductSearch = "";

    if (resultSearchProd) {
      listProductSearch = resultSearchProd.map(item => (
        <ProductSearchItem
          item={item}
          key={item.id}
          addToCart={this.addToCart}
        />
      ));
    }
    return listProductSearch;
  };

  showListSearchCus = () => {
    const { resultSearchCus } = this.state;
    let listCustomerSearch = "";

    if (resultSearchCus) {
      listCustomerSearch = resultSearchCus.map(item => (
        <CustomerSearchItem key={item.id} item={item} />
      ));
    }
    return listCustomerSearch;
  };

  changeQuantity = (id, quantity, type) => {
    let data = JSON.parse(localStorage.getItem("items")) || [];

    let index = data.findIndex(item => item.id === id);

    if (type === "minus") {
      data[index].quantity -= 1;
    } else if (type === "plus") {
      data[index].quantity += 1;
    } else {
      data[index].quantity = +quantity;
    }
    localStorage.setItem("items", JSON.stringify(data));
    this.changeStateProductChoosed();
  };

  calTotalPrice = () => {
    let data = JSON.parse(localStorage.getItem("items")) || [];
    const { listProducts } = this.props;
    let totalPrice = 0;
    if (data.length > 0 && listProducts.length > 0) {
      totalPrice = data.reduce((total, item) => {
        let { priceOut } = listProducts.find(product => product.id === item.id);
        return total + Number(priceOut) * Number(item.quantity);
      }, 0);
    }
    return totalPrice;
  };

  addNewOrder = () => {
    let products = JSON.parse(localStorage.getItem("items")) || [];
    let date = new Date();
    let orderDate =
      date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
    const { name, address, phoneNumber, birthday, isMember } = this.state;
    let infoOrder = {
      orderDate: orderDate,
      amount: this.calTotalPrice(),
      products
    };
    if (isMember === "normal") {
      this.props.addNew("orders", {
        ...infoOrder
      });
    }
    if (isMember === "addNew") {
      let idCus = this.props.addNew("customers", {
        name,
        address,
        phoneNumber,
        birthday
      });
      this.props.addNew("orders", {
        ...infoOrder,
        idCus
      });
    }
    localStorage.clear();
    this.setState({
      isOpenForm: false
    });
  };

  render() {
    const {
      isOpenForm,
      errors,
      step,
      readyToOrder,
      productChoosed,
      isMember
    } = this.state;
    const { listProducts } = this.props;

    const totalPrice = this.calTotalPrice();
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <button
              type="button"
              className="btn btn-form"
              onClick={this.handleOpenForm}
            >
              {isOpenForm ? "CANCEL" : "ADD NEW"}
            </button>
          </div>
          {isOpenForm ? (
            <div className="panel-body row" id="form-add">
              {errors.length > 0 ? (
                <>
                  <div className="col-md-1" />
                  <div className="alert alert-danger col-md-10">
                    <a
                      className="close"
                      onClick={this.closeError}
                      href="gg.com"
                    >
                      ×
                    </a>
                    <ul>
                      {errors.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                ""
              )}
              {step === 1 ? (
                <>
                  <div className="choose-product form-group col-md-5">
                    <div className="solugan">
                      <div className="box-product-head">
                        <span className="box-title">CHOOSE PRODUCT</span>
                        <span className="af-ter" />
                      </div>
                    </div>
                    <div className="row search-product">
                      <div className="offset-md-2 col-md-6 input-search">
                        <input
                          type="text"
                          placeholder="Search.."
                          name="valueSearchProd"
                          className="form-control"
                          onChange={this.handleChange}
                          onKeyPress={this.searchProduct}
                        />
                      </div>
                      <div className="col-md-1">
                        <button
                          type="button"
                          className="btn btn-form"
                          onClick={this.searchProduct}
                        >
                          <i className="fa fa-search" />
                        </button>
                      </div>
                      <div className="searchResult col-md-12">
                        <ul className="list-group col-md-11 offset-md-1">
                          {this.showListSearchProd()}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="solugan">
                      <div className="box-product-head">
                        <span className="box-title">LIST PRODUCT</span>
                        <span className="af-ter" />
                      </div>
                      <ProductChoosedList
                        listProducts={listProducts}
                        productChoosed={productChoosed}
                        deleteCart={this.deleteCart}
                        step={step}
                        changeQuantity={this.changeQuantity}
                      />
                      {readyToOrder ? (
                        <div className="offset-md-10">
                          <button
                            className="btn btn-form"
                            onClick={this.nextStep}
                          >
                            NEXT
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-md-12">
                    <div className="box-product-head">
                      <span className="box-title">CUSTOMER INFORMATION</span>
                      <span className="af-ter" />
                    </div>
                    <div className="row">
                      <div className="col-sm-2">
                        <button
                          type="button"
                          className="btn btn-info"
                          onClick={() => this.handleChangeIsMember("member")}
                        >
                          MEMBER
                        </button>
                      </div>
                      <div className="col-sm-2">
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => this.handleChangeIsMember("addNew")}
                        >
                          ADD NEW
                        </button>
                      </div>
                    </div>
                    {isMember === "addNew" && (
                      <form className="form-add-customer row">
                        <div className="form-group col-md-6">
                          <label>Customer's name:</label>
                          <input
                            className="form-control"
                            type="text"
                            name="name"
                            placeholder="Enter customer's name"
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label>Customer's birthday:</label>
                          <input
                            className="form-control"
                            type="date"
                            name="birthday"
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label>Customer's address:</label>
                          <input
                            className="form-control"
                            type="text"
                            name="address"
                            placeholder="Enter customer's address"
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label>Customer's phone number:</label>
                          <input
                            className="form-control"
                            type="text"
                            name="phoneNumber"
                            placeholder="Enter customer's phone number"
                            onChange={this.handleChange}
                          />
                        </div>
                      </form>
                    )}
                    {isMember === "member" && (
                      <div className="row search-customer">
                        <div className="col-md-2">
                          <select
                            className="form-control"
                            name="optionSearchCus"
                            onChange={this.handleChange}
                          >
                            <option value="phoneNumber">Phone Number</option>
                            <option value="name">Name</option>
                          </select>
                        </div>
                        <div className="col-md-4 input-search">
                          <input
                            type="text"
                            placeholder="Search.."
                            name="valueSearchCus"
                            className="form-control"
                            onKeyPress={this.searchCustomer}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="col-md-1">
                          <button
                            type="button"
                            className="btn btn-form"
                            onClick={this.searchCustomer}
                          >
                            <i className="fa fa-search" />
                          </button>
                        </div>
                        <div className="searchResult col-md-12">
                          <ul className="list-group col-md-10 offset-md-1">
                            {this.showListSearchCus()}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-md-12">
                    <div className="box-product-head">
                      <span className="box-title">LIST PRODUCT</span>
                      <span className="af-ter" />
                    </div>
                    <ProductChoosedList
                      listProducts={listProducts}
                      productChoosed={productChoosed}
                      step={step}
                      deleteCart={this.deleteCart}
                      changeQuantity={this.changeQuantity}
                    />
                    <div className="offset-md-8">
                      <h3>Total price: {totalPrice}</h3>
                    </div>
                    <button className="btn btn-form" onClick={this.backStep}>
                      BACK
                    </button>
                    <button
                      className="btn btn-form offset-md-10"
                      onClick={this.addNewOrder}
                    >
                      ORDER
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
