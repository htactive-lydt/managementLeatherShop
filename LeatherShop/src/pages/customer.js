import React from "react";
import LeftMenu from "../components/layouts/LeftMenu";
import Header from "../components/layouts/Header";
import {FormAddNewCustomer, CustomerList} from "../components/customers";

const Customers = (props) => {
  const {addNew, update, getTableCall, customers} = props;
  return (
    <>
      <Header />
      <LeftMenu />
      <main className="app-content">
        <div className="container">
          <FormAddNewCustomer getTableCall={getTableCall} addNew={addNew} update={update}/>
          <CustomerList customers={customers}/>
        </div>
      </main>
    </>
  );
};

export default Customers;
