import React from "react";

export default class UserListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdating: false,
      updateUser: this.props.item,
      roleUser: ["administrator", "customer"]
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
      updateUser: {
        ...prevState.updateUser,
        [name]: value
      }
    }));
  };

  saveUpdate = () => {
    this.props.update("users", this.state.updateUser);
    this.hanleUpdate();
  };

  deleteItem = () => {
    this.props.deleteItem("users", this.state.updateUser.id);
  };

  render() {
    const { isUpdating } = this.state;
    const { username, password, role } = this.props.item;
    const { roleUser } = this.state;

    return (
      <>
        <tr className={`${isUpdating ? "" : "disable"}`}>
          <td>{this.props.index + 1}</td>
          <td>
            <input
              type="text"
              className="form-control" 
              name="username"
              defaultValue={username}
              onChange={this.handleChange}
            />
          </td>
          <td>
            <input
              type="text"
              className="form-control" 
              name="password"
              defaultValue={password}
              onChange={this.handleChange}
            />
          </td>
          <td>
            <select
              onChange={this.handleChange}
              defaultValue={role}
              name="role"
              className="form-control" 
            >
              {roleUser.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
              ))}
            </select>
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
