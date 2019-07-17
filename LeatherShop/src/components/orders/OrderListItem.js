import React, { Component } from "react";

export default class OrderListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUpdating: false,
      updateOrder: this.props.item
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
      updateOrder: {
        ...prevState.updateOrder,
        [name]: value
      }
    }));
  };

  saveUpdate = () => {
    this.props.update("customers", this.state.updateOrder);
    this.hanleUpdate();
  };

  deleteItem = () => {
    this.props.deleteItem("orders", this.state.updateOrder.id);
  };

  render() {
    const {item, customers, listProducts} = this.props;
    
    const { products, orderDate, amount, idCus } = item;
    let nameCustomer = "Guest";
    if(idCus){
      let customer = customers.find(item => item.id === idCus);
      nameCustomer = customer.name;
    }
    const { isUpdating } = this.state;

    let productsOrder = products.map(item => {
      let {name} = listProducts.find(product => product.id === item.id);
      return <p key={item.id}>{name} &nbsp; x &nbsp; {item.quantity}</p>
    })
    return (
      <tr className={`${isUpdating ? "" : "disable"}`}>
        <td>{this.props.index + 1}</td>
        <td>{nameCustomer}</td>
        <td>{orderDate}</td>
        <td>
          {productsOrder}
        </td>
        <td>{amount}</td>
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
