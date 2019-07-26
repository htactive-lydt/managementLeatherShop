import React from "react";
import FormAddNewEmployee from "../components/employees/FormAddNewEmployee";
import EmployeeList from "../components/employees/EmployeeList";

const Employees = props => {
  const { addNew, update, deleteItem, employees, undoDelete } = props;
  return (
    <>
      <main className="app-content">
        <FormAddNewEmployee
          addNew={addNew}
          update={update}
          employees={employees}
        />
        <EmployeeList
          employees={employees}
          update={update}
          deleteItem={deleteItem}
          undoDelete={undoDelete}
        />
      </main>
    </>
  );
};

export default Employees;
