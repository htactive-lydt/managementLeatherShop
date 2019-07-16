import React from "react";
import LeftMenu from "../components/layouts/LeftMenu";
import Header from "../components/layouts/Header";

const Employees = () => {
  return (
    <>
      <Header />
      <LeftMenu />
      <main className="app-content">Employees Page</main>
    </>
  );
};

export default Employees;
