import zkfRegisterControllerABI from '../abi/ZKFRegisterController.json'
import loadericon from '../assets/images/loader-icon.svg';
import { useReadContract } from 'wagmi'
import { toast } from 'react-toastify'; 
import { fromWei } from '../helpers/String';
import { goerli, sepolia, zkFair } from 'wagmi/chains'

function DomainPrice({available, name, duration}) { 
 
    const zkfRegisterControllerConfig = {
        address: process.env.REACT_APP_ZKFREGISTERCONTROLLER,
        abi: zkfRegisterControllerABI
    };

    const { data: price, error, isPending } = useReadContract({
        ...zkfRegisterControllerConfig,
        functionName: 'rentPrice',
        args: [name, duration],
        chainId: process.env.REACT_APP_NODE_ENV === "production" ? zkFair.id: sepolia.id
    });
  
    if(error) toast.error(error.message)
    if(!available) return <></>

    if(isPending) {
        <span className='me-3'><img src={loadericon} alt="" /></span>
    } else {
        return ( 
            <> 
                <span className='me-3'>{ fromWei(  price.base.toString() ).toString() } {process.env.REACT_APP_NATIVE_TOKEN} / YEAR</span>
            </>
         );
    }
}

export default DomainPrice;