import React, { Component } from "react";

export default class FormAddNewEmployee extends Component {
  state = {
    isOpenForm: false,
    newEmployee: {
      name: "",
      address: "",
      email: "",
      idCard: "",
      salary: ""
    },
    errors: []
  };

  handleOpenForm = () => {
    this.setState(prevState => ({
      isOpenForm: !prevState.isOpenForm
    }));
  };

  closeError = () => {
    this.setState({
      errors: []
    });
  };

  checkValid = () => {
    const { name, address, email, idCard, salary } = this.state.newEmployee;
    let errors = [];
    if (!name) {
      errors.push("Customer's name is required!");
    }
    if (!email) {
      errors.push("Customer's birthday is required!");
    }
    if (!address) {
      errors.push("Customer's address is required!");
    }
    if (!idCard) {
      errors.push("Customer's phone number is required!");
    }
    if (!salary) {
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

  addnewEmployee = event => {
    event.preventDefault();
    if (this.checkValid()) {
      this.props.addNew("customers", this.state.newEmployee);
      this.setState({
        isOpenForm: false,
        newEmployee: {
          name: "",
          address: "",
          email: "",
          idCard: "",
          salary: ""
        }
      });
    }
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(prevState => ({
      ...prevState,
      newEmployee: {
        ...prevState.newEmployee,
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
                      <a className="close" onClick={this.closeError} href="gg.com">
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
                    placeholder="Enter employee's name"
                    className="form-control"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <input
                    name="address"
                    type="text"
                    className="form-control"
                    onChange={this.handleChange}
                    placeholder="Enter employee's address"
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter employee's email"
                    className="form-control"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <input
                    name="idCard"
                    type="text"
                    placeholder="Enter employee's card"
                    className="form-control"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <input
                    name="salary"
                    type="text"
                    placeholder="Enter emnployee's salary"
                    className="form-control"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group col-md-1">
                  <button
                    type="button"
                    className="btn btn-form"
                    onClick={this.addnewEmployee}
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
