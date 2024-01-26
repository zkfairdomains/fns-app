import React, { useState } from "react";

function CustomCounternew() {
    const [counter, setCounter] = useState(1);
 
    const countUp = () => {
        setCounter(counter + 1);
    };
 
    const countDown = () => {
        if(counter>1){
            setCounter(counter - 1);
        }
        
    };
    return ( 
        <>
            <div className="customCounter">
                    <span onClick={countDown} className="countminus">-</span>
                    <div><small className="me-3">{counter}</small> year</div>
                    <span onClick={countUp} className="countplus">+</span>
            </div>
        </>
     );
}

export default CustomCounternew;