import React from "react";
import LeftMenu from "../components/layouts/LeftMenu";
import Header from "../components/layouts/Header";

const Orders = () => {
  return (
    <>
      <Header />
      <LeftMenu />
      <main className="app-content">Orders Page</main>
    </>
  );
};

export default Orders;
