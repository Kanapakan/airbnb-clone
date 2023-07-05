// import React from 'react'
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="px-8 md:px-10 lg:px-20">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
