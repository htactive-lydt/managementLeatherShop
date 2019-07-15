import React from "react";

export default class CategoryListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log("213434", this.props.item, 1111);
    console.log(this.props.categories,"cate");
    const {categories} = this.props;
    const {
      cateID,
      dateAdd,
      deleteAt,
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
        <tr key={key}>
          <td>
          <select className="form-control" onChange={this.handleChange}>
                    {categories.map((item, index) => (
                      <option key={index} value="item.id" selected={item.id==cateID ? "selected" : ""}>
                        {item.cateName}
                      </option>
                    ))}
                  </select>
            {/* <select className="form-control">
                <option selected>{cateID}</option>
            </select> */}
          </td>
          <td>{dateAdd}</td>
          <td>{deleteAt}</td>
          <td>
            <img src={image} alt="Not Found" height="250px" width="250px" />
          </td>
          <td>{name}</td>
          <td>{priceIn}</td>
          <td>{priceOut}</td>
          <td>{pricePromotion}</td>
          <td>{quantity}</td>
          <td>
            <button
              type="button"
              className="btn btn-success"
              onClick={this.saveUpdateTask}
            >
              <i className="fa fa-floppy-o" />
            </button>
            &nbsp;&nbsp;
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
