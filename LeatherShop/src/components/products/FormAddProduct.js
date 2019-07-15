import React, { Component } from "react";

export default class FormAddProduct extends Component {
  state = {
    isOpenForm: false,
    newProduct: {
      cateID: "",
      dateAdd: "",
      dateAt: "",
      description: "",
      image: "",
      name: "",
      priceIn: "",
      priceOut: "",
      pricePromotion: "",
      quantity: ""
    }
  };

  handleOpenForm = () => {
    this.setState(prevState => ({
      isOpenForm: !prevState.isOpenForm
    }));
  };

  addNewProduct = event => {
    event.preventDefault();
    console.log("new product: ", this.state.newProduct);
    this.props.addNew("products", this.state.newProduct);
    this.setState({
      isOpenForm: false
    });
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(prevState => ({
      ...prevState,
      newProduct: {
        ...prevState.newProduct,
        [name]: value
      }
    }));
  };

  render() {
    const { isOpenForm } = this.state;
    const { categories } = this.props;

    return (
      <div>
        <form>
          <div className="panel panel-default">
            <div className="panel-heading">
              <button
                type="button"
                className="btn"
                onClick={this.handleOpenForm}
              >
                {isOpenForm ? "CANCEL" : "ADD NEW"}
              </button>
            </div>
            {isOpenForm ? (
              <div className="panel-body row" id="form-add">
                <div className="form-group col-md-6">
                  <label>Product's name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter product's name"
                    className="form-control"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Date Add Product</label>
                  <input
                    name="dateAdd"
                    type="date"
                    className="form-control"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Product's Description</label>
                  <input
                    name="description"
                    type="text"
                    placeholder="Enter product's description"
                    className="form-control"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Product's image</label>
                  <input
                    name="image"
                    type="file"
                    placeholder="Please choose a product's image"
                    className="form-control"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Product's Price In</label>
                  <input
                    name="priceIn"
                    type="text"
                    placeholder="Enter price in's product"
                    className="form-control"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Product's Price Out</label>
                  <input
                    name="priceOut"
                    type="text"
                    placeholder="Enter price out's product"
                    className="form-control"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                <label>Product's Price Promotion</label>
                  <input
                    name="pricePromotion"
                    type="text"
                    placeholder="Enter price promotion's product"
                    className="form-control"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                <label>Product's Category</label>
                  <select className="form-control" onChange={this.handleChange}>
                    {categories.map((item, index) => (
                      <option key={index} value="item.id">
                        {item.cateName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-md-6">
                <label>Product's Delete At</label>
                  <input
                    name="dateAt"
                    type="date"
                    placeholder="Enter customer's address"
                    className="form-control"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                <label>Product's quantity</label>
                  <input
                    name="quantity"
                    type="number"
                    placeholder="Enter product's quantity"
                    className="form-control"
                    onChange={this.handleChange}
                    required
                    min="0"
                  />
                </div>
                <div className="form-group col-md-1">
                  <button
                    type="button"
                    className="btn"
                    onClick={this.addNewProduct}
                  >
                    ADD
                  </button>
                </div>
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
