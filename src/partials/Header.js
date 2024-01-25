import * as React from "react";
import Logo from '../assets/images/zkfair.svg'; 
import ConnectWalletButton from "./Connectwalletbutton"; 
import { Link, NavLink } from 'react-router-dom';

function Header() {

    function mmFunction(){
        var menuIcon = document.querySelector('.mm');
        var bodytag = document.getElementsByTagName("body")
        var controlsContent = document.querySelector('.controls-content');
        menuIcon.addEventListener('click', function () {
            if (menuIcon.classList.contains("active")) {
                bodytag.classList.remove('menuOn');
                menuIcon.classList.remove('active');
                controlsContent.classList.remove('active');
            } else {
                bodytag.classList.add('menuOn');
                menuIcon.classList.add('active');
                controlsContent.classList.add('active');
            }
    });
    }
    return ( 
        <header>
            <div className="container-fluid d-flex align-items-center justify-content-between">
            <NavLink to="/">
                <h1 id="logo"><a href="/home"><img src={Logo} alt="Zkfair Domains" /></a></h1>
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
             <a onClick={mmFunction()}  class="mm" href="javascript:;"><span></span><span> </span><span></span></a>
            </div> 
        </header>
        
     );
}

export default Header;