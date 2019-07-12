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
    const {name, birthday, phoneNumber, address} = this.state.newCustomer;
    // this.props.addNewTask(newTask);
    this.setState({
      isOpenForm: false,
      newCustomer: {
        name: "",
        birthday: "",
        phoneNumber: "",
        address: ""
      }
    });
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { isOpenForm } = this.state;
    return (
      <div>
        <form>
          <div className="panel panel-default">
            <div className="panel-heading">
              <button type="button" className="btn btn-success" onClick={this.handleOpenForm}>
                {isOpenForm ? "CANCEL" : "ADD NEW"}
              </button>
            </div>
            {isOpenForm ? (
              <div className="panel-body row" id="form-add">
                <div className="form-group col-md-6">
                  <input
                    type="text"
                    placeholder="Enter customer's name"
                    className="form-control"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <input
                    type="date"
                    className="form-control"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <input
                    type="text"
                    placeholder="Enter customer's phone"
                    className="form-control"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <input
                    type="text"
                    placeholder="Enter customer's address"
                    className="form-control"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-1">
                  <button type="button" className="btn btn-primary" onClick={this.addNewTask}>
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
