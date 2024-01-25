import React from "react";
import searchIcon from '../assets/images/search-icon.svg';
import loadericon from '../assets/images/loader-icon.svg';
import { Navigate, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { isAvailable, isValidDomain } from "../helpers/String";
import DomainPrice from '../components/DomainPrice';
import zkfRegisterControllerABI from '../abi/ZKFRegisterController.json'
import { useAccount, useReadContract } from 'wagmi'
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import randomString from 'randomstring';

const zkfRegisterControllerConfig = {
    address: process.env.REACT_APP_ZKFREGISTERCONTROLLER,
    abi: zkfRegisterControllerABI
};

const Name = () => { 
 
    const {name} = useParams(); 
    const [isCommitted, setIsCommitted] = useState(false);
  
    return (
        <>  
            <div className="centercontent">
                <Search name={name} /> 
                {!isValidDomain(name) ?  <IsInvalid name={name} /> 
                    : 
                    <>
                    <Available name={name} config={zkfRegisterControllerConfig} />
                    <Commit name={name} duration={3156600} config={zkfRegisterControllerConfig} />   
                    <Register name={name} isCommitted={isCommitted} config={zkfRegisterControllerConfig} /> 
                    </> 
                } 
            </div>
        </>
    ) 
};


function Search({name}) {
 
    const inputRef = useRef("");
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
        <>
            <div className="search-content container p-0"> 
                <form onSubmit={(e) => handleSubmit(e)}>
                    <img src={searchIcon} alt="" />
                    <input type="text" ref={inputRef} onChange={handleOnChange} value={_name} placeholder="Search your .zkf domain" />
                    <span className='chainText'>.zkf</span>
                    <button >SEARCH</button>
                </form>
            </div>
        </>
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

function Available({ name, config }) {
  
    const { data: available, error, isPending } = useReadContract({
        ...zkfRegisterControllerConfig,
        functionName: 'available',
        args: [name],
        onError: (err) => { console.error(err) }
    });
 
    if(error) toast.error(error.message);

    return (
        <> 
            {isPending ? 
                <> 
                    <div className="alert alert-info text-center container mt-3">
                        <h3> Searching...</h3>
                    </div>
                </>
                : 
                <> 
                    <div className={available ? "alert alert-success text-center container mt-3": "alert alert-danger text-center container mt-3" }>
                        <h3>  
                            <>
                                { available ? <> <b>{name}.zkf</b> is available to claim 🥳 </>: <><b>{name}.zkf</b> is not available to claim 🙁</>}
                            </> 
                        </h3>
                    </div>
                </>
            } 
        </>
    )
}

function Commit({ name, duration, config }) {
 
    const _name = name;
    const _owner = useAccount().address;  
    const _duration = duration;
    const _secret = randomString.generate();
    const _resolver = process.env.REACT_APP_PUBLICRESOLVER;
    const _data = [];
    const _reverseRecord = true;

    const { data: commitment, error, isPending } = useReadContract({
        ...config,
        functionName: 'makeCommitment',
        args: [_name, _owner, _duration, _secret, _resolver, _data, _reverseRecord ],
        onError: (err) => { console.error(err) }
    });
 
    if(error) toast.error("Make Commitment: "+ error.message);

    return (
        <>
            <button className="btn btn-danger btn-bg">Request to Register</button>
        </>
    )
}

function Register({ name, isCommitted, config }) {
    if(!isCommitted) return (
        <>
        </>
    )
    return (
        <>
            <button className="btn btn-danger btn-bg">Complete Register</button>
        </>
    )
}

export default Name;