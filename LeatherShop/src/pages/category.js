import React from "react";
import FormAddNewCategories from "../components/categories/FormAddNewCategory";
import CategoryList from "../components/categories/CategoryList";

const Categories = (props) => {
  const { addNew, update, categories, deleteItem, undoDelete} = props;
  return (
    <>
      <main className="app-content">
        <div className="container">
          <FormAddNewCategories addNew={addNew} update={update} />
          <CategoryList categories={categories} update={update} deleteItem = {deleteItem} undoDelete={undoDelete}/>
        </div>
      </main>
    </>
  );
};

export default Categories;
