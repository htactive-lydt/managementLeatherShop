import React from "react";
import FormAddNewEmployee from "../components/employees/FormAddNewEmployee";
import EmployeeList from "../components/employees/EmployeeList";

const Employees = (props) => {
  const { addNew, update, deleteItem, employees} = props;
  return (
    <>
      <main className="app-content">
        <div className="container">
          <FormAddNewEmployee addNew={addNew} update={update} />
          <EmployeeList employees={employees} update={update} deleteItem = {deleteItem} />
        </div>
      </main>
    </>
  );
};

export default Employees;
