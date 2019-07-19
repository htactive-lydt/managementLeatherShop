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

  render() {
    let years = [2019, 2018, 2017, 2016, 2015, 2014];

    const options = {
      title: {
        text: "Revenue Statistics"
      },
      data: [
        {
          // Change type to "doughnut", "line", "splineArea", etc.
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
        <div className="container">
          <div className="col-md-3">
            <label>Choose Year: </label>
            <select className="form-control" onChange={this.handleChange}>
              {years.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <CanvasJSChart
            options={options}
            /* onRef={ref => this.chart = ref} */
          />
          {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
        </div>
      </main>
    );
  }
}
