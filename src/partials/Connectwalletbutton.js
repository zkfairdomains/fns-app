import MetaMaskLogo from './assets/images/metamask.svg';

function Connectwalletbutton() {
    return ( 
        <button className="wallet-connect"><span>Connect Wallet</span><img src={MetaMaskLogo} alt="" /></button>
     );
}

export default Connectwalletbutton;