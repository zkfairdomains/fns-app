import React from "react";
import Search from "../partials/Search";
import AccordionBt from '../partials/AccordionBt';
import TabsBt from '../partials/TabsBt';
import 'bootstrap/dist/css/bootstrap.min.css';
import Connectwalletbutton from "../partials/Connectwalletbutton";

const Page = () => { 
  return (
    <> 
      <div className="centercontent">
            <Search />
            <AccordionBt />
            <TabsBt />
            <Connectwalletbutton />
        </div>
        
    </>
  )
};

export default Page;