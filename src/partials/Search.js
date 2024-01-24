import searchIcon from '../assets/images/search-icon.svg';
import loadericon from '../assets/images/loader-icon.svg';
import zkfRegisterControllerABI from '../abi/ZKFRegisterController.json'

import { useReadContract } from 'wagmi'
import { useRef, useState } from 'react';

function Search() {
 
    // en az 2 karakter
    // bosluk olmayacak.


    const inputRef = useRef("")
    const [name, setName] = useState("");
    const [isAvailable, setIsAvailable] = useState(false);

    const zkfRegisterControllerConfig = {
        address: process.env.REACT_APP_ZKFREGISTERCONTROLLER,
        abi: zkfRegisterControllerABI
    };

    const { data: available, error, isPending } = useReadContract({
        ...zkfRegisterControllerConfig,
        functionName: 'available',
        args: [name],
        onError: (err) => { console.error(err) }
    });   

    if (error) {
        return (
            <div>
                Error: {error.message}
            </div>
        )
    }
         console.log(isPending)
    return ( 
        <div className="search-content">
            { isPending ? "Loading": ""}
            <form onSubmit={(e)=> { e.preventDefault(); return false; }}>
                <img src={searchIcon} alt="" /><input type="text" ref={inputRef} placeholder="Search your domain name" />
                <span className='chainText'>.zkf</span>
                <button onClick={(e)=> setName(inputRef.current.value) }>{isPending ? <><img src={loadericon} /></> : "SEARCH" }</button>
            </form>
            {name != "" ? <> 
            <div className="search-result-content">
                <ul>
                    <li className="copy-container">
                        <span className="copy-text w-100">{name}.zkf </span>
                        <div className='w-50 d-flex justify-content-end'>
                            
                            <span className='me-3'>{available ? "4$/year": ""}</span>
                            <button disabled={ available ? '':  'disabled' }  className={available ? "green": "red"}>{ available ? "Available to Register": "Not Available"}</button>
                        </div>
                        </li>
                </ul>
            </div></>
            : <></>
            }
        </div>
     );
}

export default Search;