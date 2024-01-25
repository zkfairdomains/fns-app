import * as React from "react";
import Logo from '../assets/images/zkfair.svg'; 
import ConnectWalletButton from "./ConnectWalletButton"; 
import { Link, NavLink } from 'react-router-dom';

function Header() {
    return ( 
        <header>
            <div className="container-fluid d-flex align-items-center justify-content-between">
            <NavLink to="/">
                <h1 id="logo"><img src={Logo} alt="" /></h1>
            </NavLink>
            <div className="controls-content">
                <nav>
                    <ul className="d-flex">
                        <li><Link to="/register">My Domains</Link></li>
                        <li><Link to="/favorites">Favorites</Link></li>
                        <li className="dropdown d-none">
                            <a className="d-block w-100 h-100 dropdown-toggle" href="javascript:;"><span class="tripledot"><em></em><em> </em><em></em></span></a>
                            <ul className="dropdown-menu">
                                <li><a href="">favorites</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                <div className="network-select dropdown">
                    
                </div>
            </div>
             <ConnectWalletButton></ConnectWalletButton>
            </div> 
        </header>
        
     );
}

export default Header;