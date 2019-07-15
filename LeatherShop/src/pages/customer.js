import React from "react";
import LeftMenu from "../components/layouts/LeftMenu";
import Header from "../components/layouts/Header";
import {FormAddNewCustomer, CustomerList} from "../components/customers";

const Customers = (props) => {
  const {addNew, update, getTableCall} = props;
  return (
    <>
      <Header />
      <LeftMenu />
      <main className="app-content">
        <div className="container">
          <FormAddNewCustomer getTableCall={getTableCall} addNew={addNew} update={update}/>
          <CustomerList />
        </div>
      </main>
    </>
  );
};

export default Customers;
