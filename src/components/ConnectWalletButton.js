import { useAccount, useSwitchChain } from 'wagmi';
import MetaMaskLogo from '../assets/images/metamask.svg';
import WarningLogo from '../assets/images/warning-icon.svg';
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { obscureAddress } from "../helpers/String";
import { useChainId } from 'wagmi'

export default function ConnectWalletButton({props}) {

  const { open, close } = useWeb3Modal()
  const { address, isConnected  } = useAccount() 
  const { switchChain } = useSwitchChain() 
  const chainId = useChainId()

  const SUPPORTED_CHAIN_ID = Number(process.env.REACT_APP_SUPPORTED_CHAIN_ID);
  
  if(isConnected) { 
    return (<>  { SUPPORTED_CHAIN_ID !== chainId ?
        <button {...props} className="wallet-connect wrongAlert" onClick={() => switchChain({ chainId: SUPPORTED_CHAIN_ID })}> Wrong Network <img src={WarningLogo} /></button>  
        : 
        <button {...props} className="wallet-connect" onClick={() => open()}><span> {obscureAddress( address) } </span><img src={MetaMaskLogo} /> </button>  
    }</>)
  } else {
    return (
        <>
          <button {...props} className="wallet-connect" onClick={() => open()}><span>Connect Wallet</span><img src={MetaMaskLogo} /></button>
        </>
      )
  }
  
}