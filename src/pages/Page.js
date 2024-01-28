import React from "react";
import { Outlet } from "react-router-dom";  

const Page = () => { 
  return (
    <> 
      <div className="container-fluid">
        <Navbar showSearch={true} />
      </div>
    </>
  )
};

export default Page;