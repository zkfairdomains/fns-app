import React from "react";  

const Favorites = () => { 
  return (
    <div className="container-fluid">
      <div className="white-content">
          <h2>Favorites</h2>
          <ul className='itemlist'>
              <li className="copy-container">
                  <span className="domainName">kamil.zkf</span>
                  <div className="pricing"><span className="me-3">Status: <em className='color-green'>Avaible</em></span></div>
                  <div className="resultbutton"><button className="green">Claim</button></div>
              </li>
              <li className="copy-container">
                  <span className="domainName">hayriye.zkf</span>
                  <div className="pricing"><span className="me-3">Status: <em className='color-red'>Not Avaible</em></span></div>
                  <div className="resultbutton"><button className="red" disabled>Claim</button></div>
              </li>
             
              
              
          </ul>
      </div>
      
    </div>
  )
};

export default Favorites;