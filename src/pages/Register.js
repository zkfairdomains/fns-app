import React from "react";
import Search from "../partials/Search";
import AccordionBt from '../partials/AccordionBt';
import TabsBt from '../partials/TabsBt';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Register = () => { 
  return (
    <> 
      <div className="centercontent">
            <Search />
            <AccordionBt />
            <p className="text-white">
              This is register page.
            </p>
        </div> 
    </>
  )
};

export default Register;