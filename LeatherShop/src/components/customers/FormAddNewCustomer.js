import React, { Component } from "react";

export default class FormAddNewCustomer extends Component {
  state = {
    isOpenForm: false,
    newCustomer: {
      name: "",
      birthday: "",
      phoneNumber: "",
      address: ""
    }
  };

  handleOpenForm = () => {
    this.setState(prevState => ({
      isOpenForm: !prevState.isOpenForm
    }));
  };

  addNewCustomer = event => {
    event.preventDefault();
    const { name, birthday, phoneNumber, address } = this.state.newCustomer;
    console.log("new cus: ", this.state.newCustomer);
    this.props.addNew("customers", this.state.newCustomer);
    this.setState({
      isOpenForm: false,
      newCustomer: {
        name,
        birthday,
        phoneNumber,
        address
      }
    });
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState((prevState) => ({
      ...prevState,
      newCustomer: {
        ...prevState.newCustomer,
        [name]: value
      }
    }));
  };

  render() {
    const { isOpenForm } = this.state;
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
                    className="btn"
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
