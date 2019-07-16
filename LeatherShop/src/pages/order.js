import React from "react";
import FormAddNewOrder from "../components/orders/FormAddNewOrder";

const Orders = props => {
  const { addNew, update, customers, deleteItem, products } = props;
  return (
    <>
      <main className="app-content">
        <div className="container">
          <FormAddNewOrder addNew={addNew} products={products} />
          {/* <CustomerList
            customers={customers}
            update={update}
            deleteItem={deleteItem}
          /> */}
        </div>
      </main>
    </>
  );
};

export default Orders;
