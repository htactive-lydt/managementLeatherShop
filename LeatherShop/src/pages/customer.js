import React from "react";
import { FormAddNewCustomer, CustomerList } from "../components/customers";

const Customers = props => {
  const { addNew, update, customers, deleteItem, undoDelete } = props;
  return (
    <>
      <main className="app-content">
        <div className="container">
          <FormAddNewCustomer addNew={addNew} />
          <CustomerList
            customers={customers}
            update={update}
            deleteItem={deleteItem}
            undoDelete={undoDelete}
          />
        </div>
      </main>
    </>
  );
};

export default Customers;
