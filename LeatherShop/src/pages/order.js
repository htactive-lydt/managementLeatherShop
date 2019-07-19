import React from "react";
import FormAddNewOrder from "../components/orders/FormAddNewOrder";
import OrderList from "../components/orders/OrderList";

const Orders = props => {
  const { addNew, listProducts, orders, customers, deleteItem, update, undoDelete } = props;
  return (
    <>
      <main className="app-content">
        <div className="container">
          <FormAddNewOrder addNew={addNew} listProducts={listProducts} customers={customers} update={update}/>
          <OrderList
            orders={orders}
            listProducts={listProducts}
            customers={customers}
            deleteItem={deleteItem}
            undoDelete={undoDelete}
          />
        </div>
      </main>
    </>
  );
};

export default Orders;
