import React from "react";

import OrderListItem from "./OrderListItem";

export default function OrderList(props) {
  const { orders, listProducts, customers, deleteItem, undoDelete } = props;
  let orderList = "";
  if (orders.length > 0) {
    orderList = orders.filter(item => !item.deleteAt).map((item, index) => {
      return (
        <OrderListItem
          item={item}
          listProducts={listProducts}
          customers={customers}
          index={index}
          deleteItem={deleteItem}
          undoDelete={undoDelete}
          key={item.id}
        />
      );
    });
  }
  return (
    <div className="panel panel-primary">
      <div className="panel-heading">
        <h3 className="panel-title">LIST OF ORDER</h3>
      </div>
      <div className="panel-body">
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th>#</th>
                <th>NAME CUSTOMER</th>
                <th>ORDER DATE</th>
                <th>PRODUCTS</th>
                <th>AMOUNT</th>
                <th>CONTROL</th>
              </tr>
            </thead>
            {orderList.length > 0 && <tbody>{orderList}</tbody>}
          </table>
        </div>
      </div>
    </div>
  );
}
