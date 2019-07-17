import React from "react";
import LeftMenu from "../components/layouts/LeftMenu";
import Header from "../components/layouts/Header";
import FormAddNewCategories from "../components/categories/FormAddNewCategories";
import CategoryList from "../components/categories/CategoryList";

const Categories = (props) => {
  const { addNew, update, categories, deleteItem} = props;
  return (
    <>
      <main className="app-content">
        <div className="container">
          <FormAddNewCategories addNew={addNew} update={update} />
          <CategoryList categories={categories} update={update} deleteItem = {deleteItem} />
        </div>
      </main>
    </>
  );
};

export default Categories;
