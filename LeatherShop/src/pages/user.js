import React from "react";
import LeftMenu from "../components/layouts/LeftMenu";
import Header from "../components/layouts/Header";

const Users = () => {
  return (
    <>
      <Header />
      <LeftMenu />
      <main className="app-content">Users Page</main>
    </>
  );
};

export default Users;
