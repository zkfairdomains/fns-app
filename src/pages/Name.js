import React, { useEffect } from "react";
import searchIcon from '../assets/images/search-icon.svg';
import loadericon from '../assets/images/loader-icon.svg';
import { Navigate, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { isAvailable, isValidDomain } from "../helpers/String";
import DomainPrice from '../components/DomainPrice';
import zkfRegisterControllerABI from '../abi/ZKFRegisterController.json'
import { useAccount, useChainId, useReadContract, useReadContracts, useWriteContract } from 'wagmi'
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import randomString from 'randomstring';
import { ethers, keccak256 } from "ethers";
import { hexToBytes, stringToBytes, toBytes } from "viem";
import { wagmiConfig } from "../config";
import { readContract, writeContract } from '@wagmi/core'
import Register from "../components/Register";
import ConnectWalletButton from "../partials/ConnectWalletButton";
import { useLazyQuery } from "@apollo/client";
import { GET_DOMAIN } from "../graphql/Domain";

const zkfRegisterControllerConfig = {
    address: process.env.REACT_APP_ZKFREGISTERCONTROLLER,
    abi: zkfRegisterControllerABI
};
 
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
                       { !isConnected || SUPPORTED_CHAIN_ID !== chainId ?  <div className="mt-3"> <ConnectWalletButton /> </div> : <Register name={name} duration={3156600} owner={registrar} /> }
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
                <b>{name}</b> is invalid!
            </h3> 
        </>
    ) 
}
 
export default Name;