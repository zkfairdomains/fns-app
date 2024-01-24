import searchIcon from '../assets/images/search-icon.svg';
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
         
    return ( 
        <div className="search-content">
            { isPending ? "Loading": ""}
            <form onSubmit={(e)=> { e.preventDefault(); return false; }}>
                <img src={searchIcon} alt="" /><input type="text" ref={inputRef} placeholder="Search your domain name" />
                <select id="domain-choise" disabled name="">
                    <option value="zkfair">.zkf</option>
                </select>
                <button onClick={(e)=> setName(inputRef.current.value) }>SEARCH</button>
            </form>
            {name != "" ? <> 
            <div className="search-result-content">
                <ul>
                    <li className="copy-container"><span className="copy-text">{name}.zkf</span><button className={available ? "green": "red"}>{ available ? "Available": "Not Available"}</button></li>:  
                </ul>
            </div></>
            : <></>
            }
        </div>
     );
}

export default Search;