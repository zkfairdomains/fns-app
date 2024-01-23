import React from "react";
import Search from "../partials/Search";
import Accordion from '../partials/Accordion';
import Tabs from '../partials/Tabs';
import Connectwalletbutton from "../partials/ConnectWalletButton";

const Page = () => { 
  return (
    <> 
      <div className="centercontent">
            <Search />
            <Accordion />
            <Tabs />
            <Connectwalletbutton />
        </div>
        
    </>
  )
};

export default Page;