import React from "react";
import LeftMenu from "../components/layouts/LeftMenu";
import Header from "../components/layouts/Header";
import FormAddNewProduct from "../components/products/FormAddProduct";
import ProductList from "../components/products/ProductList";

const Products = props => {
  const { addNew, update, categories, products, deleteItem } = props;
  return (
    <>
      <main className="app-content">
        <FormAddNewProduct
          addNew={addNew}
          update={update}
          categories={categories}
        />
        <ProductList
          products={products}
          categories={categories}
          update={update}
          deleteItem={deleteItem}
        />
      </main>
    </>
  );
};

export default Products;
