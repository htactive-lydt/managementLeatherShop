import React from "react";
import LeftMenu from "../components/layouts/LeftMenu";
import Header from "../components/layouts/Header";

const Products = () => {
  return (
    <>
      <Header />
      <LeftMenu />
      <main className="app-content">Products Page</main>
    </>
  );
};

export default Products;
