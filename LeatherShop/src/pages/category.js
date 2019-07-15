import React from "react";
import LeftMenu from "../components/layouts/LeftMenu";
import Header from "../components/layouts/Header";
import FormAddNewCategories from "../components/categories/FormAddNewCategories";
import CategoryList from "../components/categories/CategoryList";

const Categories = (props) => {
  const { addNew, update, categories} = props;
  return (
    <>
      <Header />
      <LeftMenu />
      <main className="app-content">
        <div className="container">
          <FormAddNewCategories addNew={addNew} update={update} />
          <CategoryList categories={categories} />
        </div>
      </main>
    </>
  );
};

export default Categories;
