import React, { Component } from "react";

export default class CustomerListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUpdating: false,
      updateCustomer: this.props.item
    };
  }

  hanleUpdate = () => {
    this.setState(prevState => ({
      isUpdating: !prevState.isUpdating
    }));
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(prevState => ({
      ...prevState,
      updateCustomer: {
        ...prevState.updateCustomer,
        [name]: value
      }
    }));
  };

  saveUpdate = () => {
    this.props.update("customers", this.state.updateCustomer);
    this.hanleUpdate();
  };

  deleteItem = () => {
    this.props.deleteItem("customers", this.state.updateCustomer.id);
  };

  render() {
    const { name, birthday, address, phoneNumber } = this.props.item;
    const { isUpdating } = this.state;
    return (
      <tr>
        <td>{this.props.index + 1}</td>
        <td>
          <input
            type="text"
            className={`form-control ${isUpdating ? "" : "disable"}`}
            name="name"
            defaultValue={name}
            onChange={this.handleChange}
          />
        </td>
        <td>
          <input
            type="date"
            className={`form-control ${isUpdating ? "" : "disable"}`}
            name="birthday"
            defaultValue={birthday}
            onChange={this.handleChange}
          />
        </td>
        <td>
          <input
            type="text"
            className={`form-control ${isUpdating ? "" : "disable"}`}
            name="address"
            defaultValue={address}
            onChange={this.handleChange}
          />
        </td>
        <td>
          <input
            type="text"
            className={`form-control ${isUpdating ? "" : "disable"}`}
            name="phoneNumber"
            defaultValue={phoneNumber}
            onChange={this.handleChange}
          />
        </td>
        <td>
          {isUpdating ? (
            <span>
              <button
                className="btn btn-success btn-control"
                onClick={this.saveUpdate}
              >
                <i className="fa fa-floppy-o" />
              </button>
              <button
                className="btn btn-secondary btn-control"
                onClick={this.hanleUpdate}
              >
                <i className="fa fa-ban" />
              </button>
            </span>
          ) : (
            <button
              className="btn btn-warning margin btn-control"
              onClick={this.hanleUpdate}
            >
              <i className="fa fa-pencil" />
            </button>
          )}
          <button
            className="btn btn-danger"
            onClick={() =>
              window.confirm("Do you want to delete this task?")
                ? this.deleteItem()
                : ""
            }
          >
            <i className="fa fa-trash-o" />
          </button>
          &nbsp;
        </td>
      </tr>
    );
  }
}
