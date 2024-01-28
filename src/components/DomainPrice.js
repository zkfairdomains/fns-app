import zkfRegisterControllerABI from '../abi/ZKFRegisterController.json'

import { useReadContract } from 'wagmi'
import { toast } from 'react-toastify'; 
import { fromWei } from '../helpers/String';
import { goerli, zkFair } from 'wagmi/chains'

function DomainPrice({available, name, duration}) { 
 
    const zkfRegisterControllerConfig = {
        address: process.env.REACT_APP_ZKFREGISTERCONTROLLER,
        abi: zkfRegisterControllerABI
    };

    const { data: price, error, isPending } = useReadContract({
        ...zkfRegisterControllerConfig,
        functionName: 'rentPrice',
        args: [name, duration],
        chain: process.env.REACT_APP_NODE_ENV === "production" ? zkFair.id: goerli.id,
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