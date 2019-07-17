import React from "react";
import FormAddUser from "../components/users/FormAddUser";
import UserList from "../components/users/UserList";

const Users = (props) => {
  const { addNew, update, deleteItem, users} = props;
  return (
    <>
      <main className="app-content">
        <div className="container">
          <FormAddUser addNew={addNew} update={update} />
          <UserList users={users} update={update} deleteItem = {deleteItem} />
        </div>
      </main>
    </>
  );
};

export default Users;
