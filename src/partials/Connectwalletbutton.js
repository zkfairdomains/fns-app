import { useAccount } from 'wagmi';
import MetaMaskLogo from '../assets/images/metamask.svg';
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { obscureAddress } from "../helpers/String";

export default function Connectwalletbutton() {

  const { open, close } = useWeb3Modal()
  const { address, isConnected  } = useAccount() 

  if(isConnected) {

    return (
        <> <span> {obscureAddress( address) } </span> </> 
    )
  } else {
    return (
        <>
          <button className="wallet-connect" onClick={() => open()}><span>Connect Wallet</span><img src={MetaMaskLogo} /></button>
        </>
      )
  }
  
}