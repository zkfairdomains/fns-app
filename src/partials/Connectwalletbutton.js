import { useAccount, useSwitchChain } from 'wagmi';
import MetaMaskLogo from '../assets/images/metamask.svg';
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { obscureAddress } from "../helpers/String";
import { useChainId } from 'wagmi'

export default function Connectwalletbutton() {

  const { open, close } = useWeb3Modal()
  const { address, isConnected  } = useAccount() 
  const { switchChain } = useSwitchChain() 
  const chainId = useChainId()

  const SUPPORTED_CHAIN_ID = Number(process.env.REACT_APP_SUPPORTED_CHAIN_ID);
 
  // prod ise default chain zkfair olucak <Web3Modal defaultChain={optimism} />
  
  if(isConnected) { 
    return (<>  { SUPPORTED_CHAIN_ID !== chainId ?
        <button className="wallet-connect" onClick={() => switchChain({ chainId: SUPPORTED_CHAIN_ID })}> Wrong Network</button>  
        : 
        <button className="wallet-connect" onClick={() => open()}><span> {obscureAddress( address) } </span><img src={MetaMaskLogo} /> </button>  
    }</>)
  } else {
    return (
        <>
          <button className="wallet-connect" onClick={() => open()}><span>Connect Wallet</span><img src={MetaMaskLogo} /></button>
        </>
      )
  }
  
}