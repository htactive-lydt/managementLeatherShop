import React from "react";
import EmployeeListItem from "./EmployeeListItem";

export default function EmployeeList(props) {
  const { deleteItem, update, employees } = props;
  let listItems = employees.map((item, index) => (
    <EmployeeListItem
      key={item.id}
      item={item}
      index={index}
      deleteItem={deleteItem}
      update={update}
    />
  ));
  return (
    <div className="panel panel-primary">
      <div className="panel-heading">
        <h3 className="panel-title">LIST OF EMPLOYEES</h3>
      </div>
      <div className="panel-body">
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th>#</th>
                <th>NAME EMPLOYEE</th>
                <th>ADDRESS</th>
                <th>ID CARD</th>
                <th>EMAIL</th>
                <th>SALARY</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody id="studentList">
            {listItems}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
