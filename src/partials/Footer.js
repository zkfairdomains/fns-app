import twittericon from '../assets/images/twitter.svg' ;
import githubicon from '../assets/images/githublogo.svg' ;
import discordicon from '../assets/images/discordicon.svg' ;
import etherscann from '../assets/images/etherscan-logo.png' ;
import MetaMaskLogo from '../assets/images/metamask.svg';

import { useSwitchChain } from 'wagmi';

import { Link } from 'react-router-dom';

function Footer() {
    const { switchChain } = useSwitchChain() 

    return ( 
        <footer className="w-100">
            <div className="container-fluid">
            <div className="footNav">
                <ul className="d-flex">
                    <li><Link to="/terms">Terms</Link></li>
                    <li><Link to="/privacy">Privacy</Link></li>
                </ul>
            </div>
            <div className='footerRight'>
            <button className="wallet-connect" onClick={() => switchChain({ chainId: Number(process.env.REACT_APP_SUPPORTED_CHAIN_ID) }) }>Add to Metamask <img src={MetaMaskLogo} /></button>
            
            <div className="socialMedia">
            <ul className='d-flex'>
                <li><a href="https://twitter.com/zkfdomains " target="_blank"><img src={twittericon} alt="Tiwtter x" title="Tiwtter x" /></a></li>
                <li className='ms-3 me-3'><a href="https://github.com/zkfairdomains" target="_blank"><img src={githubicon} alt="Github" title="Github" /></a></li>
                <li><a target="_blank" href="https://discord.com/invite/QzFsgTpQ"><img src={discordicon} alt="Discord" title="Discord" /></a></li>
                <li className='ms-3'><a target='_blank' href="https://goerli.etherscan.io/address/0xC805e17Dc9D3845374ed5E126180138CA250a581" className='imgwhiteredbg'><img className='imgwhite' src={etherscann} alt="Discord" title="Discord" /></a></li>
            </ul>
            </div>
            </div>
            </div>
        </footer>
     );
}

export default Footer;