import React from "react";

export default class CategoryListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { cateName, key } = this.props.item;

    return (
      <>
        <tr key={key}>
            <th>1</th>
          <td>{cateName}</td>
          <td>
            <button
              type="button"
              className="btn btn-success"
              onClick={this.saveUpdateTask}
            >
              <i className="fa fa-floppy-o" />
            </button>&nbsp;&nbsp;
            <button
              type="button"
              className="btn btn-success"
              onClick={this.onClickUpdate}
            >
              <i className="fa fa-pencil" />
            </button>
          </td>
        </tr>
      </>
    );
  }
}
