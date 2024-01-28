import searchIcon from '../assets/images/search-icon.svg';
import loadericon from '../assets/images/loader-icon.svg';
import zkfRegisterControllerABI from '../abi/ZKFRegisterController.json'

import { useReadContract } from 'wagmi'
import { toast } from 'react-toastify'; 
import { toGwei, fromWei } from '../helpers/String';

function DomainPrice({available, name, duration}) { 
 
    const zkfRegisterControllerConfig = {
        address: process.env.REACT_APP_ZKFREGISTERCONTROLLER,
        abi: zkfRegisterControllerABI
    };

    const { data: price, error, isPending } = useReadContract({
        ...zkfRegisterControllerConfig,
        functionName: 'rentPrice',
        args: [name, duration],
        onError: (err) => { console.error(err) }
    });
 
    if(error) toast.error(error.message)
    if(!available) return <></>

    if(isPending) {
        <span className='me-3'>...</span>
    } else {
        return ( 
            <> 
                <span className='me-3'>{ fromWei(  price.base.toString() ).toString() } {process.env.REACT_APP_NATIVE_TOKEN} / YEAR</span>
            </>
         );
    }
}

export default DomainPrice;