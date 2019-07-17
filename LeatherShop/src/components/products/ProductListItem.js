import React from "react";

export default class CategoryListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdating: false,
      updateProduct: this.props.item
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
      updateProduct: {
        ...prevState.updateProduct,
        [name]: value
      }
    }));
  };

  saveUpdate = () => {
    this.props.update("products", this.state.updateProduct);
    this.hanleUpdate();
  };

  deleteItem = () => {
    this.props.deleteItem("products", this.state.updateProduct.id);
  };

  render() {
    const { categories } = this.props;
    const { isUpdating } = this.state;
    const {
      cateID,
      dateAdd,
      image,
      name,
      priceIn,
      priceOut,
      pricePromotion,
      quantity,
      key
    } = this.props.item;

    return (
      <>
        <tr className={`${isUpdating ? "" : "disable"}`}>
          <td key={key} >
            <select
              onChange={this.handleChange}
              defaultValue={cateID}
              name="cateID"
              className={`form-control ${isUpdating ? "" : "disable"}`}
            >
              {categories.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.cateName}
                </option>
              ))}
            </select>
          </td>
          <td width="320px">
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
              type={`${isUpdating ? "image" : "image"}`}
              src={image}
              alt="Not Found"
              height="100px"
              width="100px"
              name="image"
            />
          </td>
          <td width="30px">
            <input
              type="date"
              className="form-control" 
              name="dateAdd"
              defaultValue={dateAdd}
              onChange={this.handleChange}
            />
          </td>
          <td>
            <input
              type="text"
              className="form-control" 
              name="priceIn"
              defaultValue={priceIn}
              onChange={this.handleChange}
            />
          </td>
          <td>
            <input
              type="text"
              className="form-control" 
              name="priceOut"
              defaultValue={priceOut}
              onChange={this.handleChange}
            />
          </td>
          <td>
            <input
              type="text"
              className="form-control" 
              name="pricePromotion"
              defaultValue={pricePromotion}
              onChange={this.handleChange}
            />
          </td>
          <td width="50px">
            <input
              type="number"
              className="form-control" 
              name="quantity"
              defaultValue={quantity}
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
