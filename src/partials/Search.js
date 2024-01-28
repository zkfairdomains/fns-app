import searchIcon from '../assets/images/search-icon.svg';
import loadericon from '../assets/images/loader-icon.svg';
import zkfRegisterControllerABI from '../abi/ZKFRegisterController.json'
import { goerli, zkFair } from 'wagmi/chains'

import { useReadContract } from 'wagmi'
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { isValidDomain, obscureName } from "../helpers/String";
import DomainPrice from '../components/DomainPrice';
import { Link } from 'react-router-dom'; 

function Search() {
     
    const yearInSeconds = 31556926; 
    const inputRef = useRef("")
    const [name, setName] = useState(""); 
    const [valid, setValid] = useState(false); 

    function handleSearch(e) {
        e.preventDefault();
        let label = inputRef.current.value.toLowerCase();
         
        if(isValidDomain(label)) {
            setValid(true);
            setName(label);
        } else {
            
            setValid(false);
            setName(label);
        }
    } 

    const zkfRegisterControllerConfig = {
        address: process.env.REACT_APP_ZKFREGISTERCONTROLLER,
        abi: zkfRegisterControllerABI
    };

    console.log("NODE_ENV:" + process.env.NODE_ENV);
    console.log("REACT_APP_NODE_ENV:" + process.env.REACT_APP_NODE_ENV);

    const { data: available, error, isPending } = useReadContract({
        ...zkfRegisterControllerConfig,
        functionName: 'available',
        args: [name],
        chainId: process.env.REACT_APP_NODE_ENV === "production" ? zkFair.id: goerli.id,
        onError: (err) => { console.error(err) }
    });
 
    if(error) toast.error(error.message)
     
    return ( 
        <div className="search-content"> 
            <form onSubmit={(e)=> { e.preventDefault(); return false; }}>
                <img src={searchIcon} alt="" /><input type="text" ref={inputRef} placeholder="Search your domain name" />
                <span className='chainText'>.zkf</span>
                <button onClick={(e)=> handleSearch(e) }>{isPending ? <><img src={loadericon} /></> : "SEARCH" }</button>
            </form>
            { name != "" & !valid ?
                <>
               
                <div className="search-result-content">
                    <ul>
                        <li className="copy-container">
                            <span className='alert alert-danger container-fluid'>{obscureName(name, 50)} is invalid!</span>
                        </li>
                    </ul>
                </div>
                 
                </>
                : <></>
            }
            {name != "" && valid && !isPending ? 
                <> 
                <div className="search-result-content">
                    <ul>
                        <li className="copy-container">
                            <span className="domainName ">{obscureName(name, 30)}.zkf </span>
                            <div className='pricing'>
                                <DomainPrice available={available} name={name} duration={yearInSeconds} />
                            </div>
                            <div className='resultbutton d-flex justify-content-end'> 
                                <Link to={"/name/"+ name +".zkf"}>
                                    <button  className={available ? "green": "red"}>{ available ? "Available to Register": "Not Available"}</button>
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
                </>
            : <></>
            }
        </div>
     );
}

export default Search;