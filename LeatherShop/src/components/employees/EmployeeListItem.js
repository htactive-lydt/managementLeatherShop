import React from "react";

export default class EmployeeListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdating: false,
      updateEmployee: this.props.item
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
      updateEmployee: {
        ...prevState.updateEmployee,
        [name]: value
      }
    }));
  };

  saveUpdate = () => {
    this.props.update("employees", this.state.updateEmployee);
    this.hanleUpdate();
  };

  deleteItem = () => {
    this.props.deleteItem("employees", this.state.updateEmployee.id);
  };

  render() {
    const { isUpdating } = this.state;
    const {
      name,
      address,
      email,
      idCard,
      salary
    } = this.props.item;

    return (
      <>
        <tr>
            <td>{this.props.index+1}</td>
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
              name="idCard"
              defaultValue={idCard}
              onChange={this.handleChange}
            />
          </td>
          <td>
            <input
              type="text"
              className={`form-control ${isUpdating ? "" : "disable"}`}
              name="email"
              defaultValue={email}
              onChange={this.handleChange}
            />
          </td>
          <td>
            <input
              type="text"
              className={`form-control ${isUpdating ? "" : "disable"}`}
              name="salary"
              defaultValue={salary}
              onChange={this.handleChange}
            />
          </td>
          <td width="200px">
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
      </>
    );
  }
}
