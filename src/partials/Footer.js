import twittericon from '../assets/images/twitter.svg' ;
import githubicon from '../assets/images/githublogo.svg' ;
import discordicon from '../assets/images/discordicon.svg' ;
import etherscann from '../assets/images/etherscan-logo.png' ;
import elementmarket from '../assets/images/element.svg' ;
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
                    <button className="wallet-connect" onClick={() => switchChain({ chainId: Number(process.env.REACT_APP_SUPPORTED_CHAIN_ID) }) }>Add to Metamask <img src={MetaMaskLogo} alt="loading..." /></button>
                
                    <div className="zkfsocialMedia">
                        <ul className='d-flex'>
                            <li>
                                <a href={process.env.REACT_APP_TWITTER_URL} target="_blank" rel="noreferrer">
                                    <img src={twittericon} alt="Tiwtter x" />
                                </a>
                            </li>
                            <li className='ms-3 me-3'>
                                <a href={process.env.REACT_APP_GITHUB_URL} target="_blank" rel="noreferrer">
                                    <img src={githubicon} alt="Github"   /></a>
                                </li>
                            <li>
                                <a href={process.env.REACT_APP_DISCORD_URL} target="_blank" rel="noreferrer">
                                    <img src={discordicon} alt="Discord" />
                                </a>
                            </li>
                            <li className='ms-3'>
                                <a href={process.env.REACT_APP_CONTRACT_URL} target="_blank" rel="noreferrer" className='imgwhiteredbg'>
                                    <img className='imgwhite' src={etherscann} alt="Contracts" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
     );
}

export default Footer;