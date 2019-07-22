import React, { Component } from "react";
import { CanvasJSChart } from "../assets/canvasjs.react";

export default class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: 2019
    };
  }

  handleChange = event => {
    this.setState({
      year: event.target.value
    });
  };


  calRevenue = monthInput => {
    const { year: yearInput } = this.state;
    const { orders, products } = this.props;
    if (orders.length > 0 && products.length > 0) {
      let listOrder = orders.filter(order => {
        let dateOrder = new Date(order.orderDate);
        let month = dateOrder.getMonth() + 1;
        let year = dateOrder.getFullYear();
        if (
          month === monthInput &&
          year === Number(yearInput) &&
          !order.deleteAt
        ) {
          return order;
        }
        return "";
      });

      let totalPrice = listOrder.reduce(
        (total, item) => total + item.amount,
        0
      );

      let totalPriceIn = listOrder.reduce((priceIn, order) => {
        let total = order.products.reduce((price, product) => {
          let prod = products.find(item => item.id === product.id);
          price += prod.priceIn * product.quantity;
          return price;
        }, 0);
        priceIn += total;
        return priceIn;
      }, 0);
      return totalPrice - totalPriceIn;
    }
  };

  calTotalAmountCus = () => {
    const { orders } = this.props;
    let array = [];
    if (orders.length > 0) {
      let listCus = orders.map(order => order.idCus).filter(item => item);

      listCus = [...new Set(listCus)];

      array = listCus.map(idCus => {
        let total = orders.reduce((total, item) => {
          if (item.idCus === idCus) {
            total += item.amount;
          }

          return total;
        }, 0);
        return { idCus, total };
      });
    }
    array.sort((a, b) => b.total - a.total);
    return array.slice(0, 8);
  };

  render() {
    let years = [2019, 2018, 2017, 2016, 2015, 2014];

    let listCustomer = this.calTotalAmountCus();

    const options = {
      title: {
        text: "Revenue Statistics"
      },
      data: [
        {
          type: "column",
          dataPoints: [
            { label: "Tháng 1", y: this.calRevenue(1) },
            { label: "Tháng 2", y: this.calRevenue(2) },
            { label: "Tháng 3", y: this.calRevenue(3) },
            { label: "Tháng 4", y: this.calRevenue(4) },
            { label: "Tháng 5", y: this.calRevenue(5) },
            { label: "Tháng 6", y: this.calRevenue(6) },
            { label: "Tháng 7", y: this.calRevenue(7) },
            { label: "Tháng 8", y: this.calRevenue(8) },
            { label: "Tháng 9", y: this.calRevenue(9) },
            { label: "Tháng 10", y: this.calRevenue(10) },
            { label: "Tháng 11", y: this.calRevenue(11) },
            { label: "Tháng 12", y: this.calRevenue(12) }
          ]
        }
      ]
    };
    return (
      <main className="app-content">
        <div className="row">
          <div className="col-md-8">
            <div className="tile">
              <div className="col-md-3 panel-body">
                <label>Choose Year: </label>
                <select className="form-control" onChange={this.handleChange}>
                  {years.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <CanvasJSChart options={options} />
            </div>
          </div>
          <div className="col-md-4 tile">
            <h3>TOP CUSTOMER</h3>
            <ul className="list-group">
              {listCustomer.map(item => {
                let { name } = this.props.customers.find(
                  customer => customer.id === item.idCus
                );
                return (
                  <li key={item.idCus} className="list-group-item">
                    <div className="row">
                      <div className="col-md-9">{name}</div>
                      <div className="col-md-3">$&nbsp;{item.total}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </main>
    );
  }
}
