import React from "react";
import CustomerListItem from "./CustomerListItem";

export default function CustomerList(props) {
  const { deleteItem, update, customers } = props;
  let listItems = customers.map((item, index) => (
    <CustomerListItem
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
        <h3 className="panel-title">LIST OF CUSTOMER</h3>
      </div>
      <div className="panel-body">
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th>#</th>
                <th>NAME CUSTOMER</th>
                <th>BIRTHDAY</th>
                <th>ADDRESS</th>
                <th>PHONE NUMBER</th>
                <th>CONTROL</th>
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
