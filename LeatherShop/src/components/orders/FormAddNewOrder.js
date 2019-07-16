import React, { Component } from "react";
import ProductSearchItem from "./ProductSearchItem";
import ProductChoosedItem from "./ProductChoosedItem";
import ProductChoosedList from "./ProductChoosedList";

export default class FormAddNewOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenForm: false,
      step: 1,
      readyToOrder: false,
      errors: [],
      resultSearch: [],
      productChoosed: [],
      valueSearch: ""
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
    this.setState({
      valueSearch: event.target.value
    });
  };

  searchProduct = () => {
    const { products } = this.props;
    let searchValue = this.state.valueSearch;
    let resultSearch = products.filter(
      item => item.name.search(searchValue) !== -1
    );
    this.setState({
      searchValue,
      resultSearch
    });
  };

  showListSearch = () => {
    const { resultSearch } = this.state;
    let listProductSearch = "";

    if (resultSearch) {
      listProductSearch = resultSearch.map(item => (
        <ProductSearchItem
          item={item}
          key={item.id}
          addToCart={this.addToCart}
        />
      ));
    }
    return listProductSearch;
  };

  showProductChoosed = () => {
    const { productChoosed } = this.state || [];
    const { products } = this.props;
    let productChoosedList = "";

    if (productChoosed) {
      productChoosedList = productChoosed.map(cartItem => {
        const { id, quantity } = cartItem;
        let { name, priceOut } = products.find(product => product.id === id);
        let item = {
          id,
          quantity,
          name,
          priceOut
        };
        return (
          <ProductChoosedItem
            item={item}
            key={item.id}
            changeQuantity={this.changeQuantity}
            deleteCart={this.deleteCart}
          />
        );
      });
    }
    return productChoosedList;
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

  render() {
    const {
      isOpenForm,
      errors,
      step,
      readyToOrder,
      productChoosed
    } = this.state;
    const { products } = this.props;
    return (
      <div>
        <form>
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
                            {this.showListSearch()}
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
                          products={products}
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
                              ORDER
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
                    </div>
                    <div className="col-md-12">
                      <div className="box-product-head">
                        <span className="box-title">LIST PRODUCT</span>
                        <span className="af-ter" />
                      </div>
                      <ProductChoosedList
                        products={products}
                        productChoosed={productChoosed}
                        step={step}
                        deleteCart={this.deleteCart}
                        changeQuantity={this.changeQuantity}
                      />
                      <button className="btn btn-form" onClick={this.backStep}>
                        BACK
                      </button>
                      <button className="btn btn-form offset-md-10">
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
        </form>
      </div>
    );
  }
}
