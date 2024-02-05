import searchIcon from '../assets/images/search-icon.svg'; 
import { useNavigate,  useParams } from "react-router-dom";
import { isValidDomain, obscureName } from "../helpers/String"; 
import { useAccount, useChainId } from 'wagmi'
import Register from "../components/Register";
import ConnectWalletButton from "../components/ConnectWalletButton";
import React, { useState } from "react";  
import Domain from '../components/Domains';
 
const Name = () => { 
 
    const SUPPORTED_CHAIN_ID = Number(process.env.REACT_APP_SUPPORTED_CHAIN_ID);

    const {name} = useParams(); 
    const { address: registrar, isConnected }  = useAccount();
    const chainId = useChainId()
     
    return (
        <>  
            <div className="centercontent">
                <Search name={name}  /> 
                
                {!isValidDomain(name) ?  <IsInvalid name={name} /> 
                    : 
                    <> 
                        <Domain name={name} />
                        { !isConnected || SUPPORTED_CHAIN_ID !== chainId ?  
                            <ConnectWalletButton /> 
                            : 
                            <>
                            <Register name={name} duration={3156600} owner={registrar} /> 
                            </>
                        }
                    </> 
                } 
            </div>
        </>
    ) 
};


function Search({name}) {
  
    const [_name, setName] = useState(name);
    const navigate = useNavigate();
    
    function handleOnChange(e) {
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        navigate("/name/"+ _name+ ".zkf")
        return false;
    }

    return (
        <div className="container">
            <div className="search-content  "> 
                <form onSubmit={(e) => handleSubmit(e)}>
                    <img src={searchIcon} alt="" />
                    <input type="text" onChange={handleOnChange} value={_name} placeholder="Search your .zkf domain" />
                    <span className='chainText'>.zkf</span>
                    <button >SEARCH</button>
                </form>
            </div>
        </div>
    )
}

function IsInvalid({name}) {
    return (
        <>  
            <h3 className="alert alert-danger text-center container mt-3">
                <b>{obscureName(name, 50)}</b> is invalid!
            </h3> 
        </>
    ) 
}
 
export default Name;