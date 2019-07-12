import React from "react";
import LeftMenu from "../components/layouts/LeftMenu";
import Header from "../components/layouts/Header";
import FormAddNewCustomer from "../components/customers/FormAddNewCustomer";

const Customers = () => {
  return (
    <>
      <Header />
      <LeftMenu />
      <main className="app-content">
        <div className="container">
          <FormAddNewCustomer />
        </div>
      </main>
    </>
  );
};

export default Customers;
