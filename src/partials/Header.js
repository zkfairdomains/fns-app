import Logo from '../assets/images/zkfair.svg';
import MetaMaskLogo from '../assets/images/metamask.svg';
import Connectwalletbutton from './ConnectWalletButton';
function Header() {
    return ( 
        <header>
            <div className="container-fluid d-flex align-items-center justify-content-between">
            <h1 id="logo"><img src={Logo} alt="" /></h1>
            <div className="controls-content">
                <nav>
                    <ul className="d-flex">
                        <li><a href="/">Domains</a></li>
                        <li><a href="/register">My Profile</a></li>
                        <li className="dropdown d-none">
                        <a className="d-block w-100 h-100 dropdown-toggle" href="javascript:;"><span class="tripledot"><em></em><em> </em><em></em></span></a>
                        <ul className="dropdown-menu">
                            <li><a href="">favorites</a></li>
                            <li><a href="">star</a></li>
                            <li><a href="">blog</a></li>
                        </ul>
                        </li>
                    </ul>
                </nav>
                <div className="network-select dropdown">
                    <a className="dropdown-toggle w-100 d-block" href="javascript:;">Zkfair Mainnet</a>
                    <ul className="dropdown-menu">
                        <li><span className="color-red">Select Network</span></li>
                        <li><a href="">Zkfair Mainnet</a></li>
                    </ul>
                </div>
            </div>
             <Connectwalletbutton></Connectwalletbutton>
            </div>
        </header>
     );
}

export default Header;