import Logo from '../assets/images/zkfair.svg';
import MetaMaskLogo from '../assets/images/metamask.svg';
import Connectwalletbutton from './Connectwalletbutton';
function Header() {
    return ( 
        <header>
            <div className="container-fluid d-flex align-items-center justify-content-between">
            <h1 id="logo"><img src={Logo} alt="" /></h1>
            <div className="controls-content">
                <nav>
                    <ul className="d-flex">
                        <li><a href="/account">My Domains</a></li>
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
                    
                </div>
            </div>
             <Connectwalletbutton></Connectwalletbutton>
            </div>
        </header>
     );
}

export default Header;