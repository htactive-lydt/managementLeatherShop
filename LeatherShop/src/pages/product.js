import React from "react";
import LeftMenu from "../components/layouts/LeftMenu";
import Header from "../components/layouts/Header";
import FormAddNewProduct from "../components/products/FormAddProduct";
import ProductList from "../components/products/ProductList";

const Products = props => {
  const { addNew, update, categories, products } = props;
  return (
    <>
      <Header />
      <LeftMenu />
      <main className="app-content">
        <div className="container">
          <FormAddNewProduct
            addNew={addNew}
            update={update}
            categories={categories}
          />
          <ProductList products={products} categories={categories} />
        </div>
      </main>
    </>
  );
};

export default Products;
