import React, { Component } from "react";

export default class FormAddNewCustomer extends Component {
  state = {
    isOpenForm: false,
    newCustomer: {
      name: "",
      birthday: "",
      phoneNumber: "",
      address: ""
    },
    errors: []
  };

  handleOpenForm = () => {
    this.setState(prevState => ({
      isOpenForm: !prevState.isOpenForm
    }));
  };

  closeError = () => {
    console.log("Ly");
    this.setState({
      errors: []
    });
  };

  checkValid = () => {
    const { name, birthday, address, phoneNumber } = this.state.newCustomer;
    let errors = [];
    if (!name) {
      errors.push("Customer's name is required!");
    }
    if (!birthday) {
      errors.push("Customer's birthday is required!");
    }
    if (!address) {
      errors.push("Customer's address is required!");
    }
    if (!phoneNumber) {
      errors.push("Customer's phone number is required!");
    }
    if (errors.length > 0) {
      this.setState({
        errors
      });
      return 0;
    }
    return 1;
  };

  addNewCustomer = event => {
    event.preventDefault();
    if (this.checkValid()) {
      this.props.addNew("customers", this.state.newCustomer);
      this.setState({
        isOpenForm: false,
        newCustomer: {
          name: "",
          birthday: "",
          phoneNumber: "",
          address: ""
        }
      });
    }
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(prevState => ({
      ...prevState,
      newCustomer: {
        ...prevState.newCustomer,
        [name]: value
      }
    }));
  };

  render() {
    const { isOpenForm, errors } = this.state;
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
                      <a className="close" onClick={this.closeError}>
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
                <div className="form-group col-md-6">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter customer's name"
                    className="form-control"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <input
                    name="birthday"
                    type="date"
                    className="form-control"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <input
                    name="phoneNumber"
                    type="text"
                    placeholder="Enter customer's phone"
                    className="form-control"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <input
                    name="address"
                    type="text"
                    placeholder="Enter customer's address"
                    className="form-control"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-1">
                  <button
                    type="button"
                    className="btn btn-form"
                    onClick={this.addNewCustomer}
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
