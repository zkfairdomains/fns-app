import * as React from "react";
import Logo from '../assets/images/zfknameservice-logo.svg'; 
import ConnectWalletButton from "./Connectwalletbutton"; 
import { Link, NavLink } from 'react-router-dom';
import { useRef } from "react";

function Header() {

    //const menuRef = useRef();

    function openMobilMenu(e) {
        
        var menuIcon = document.getElementsByClassName("mm");
        var bodytag = document.getElementsByTagName("body")
        var controlsContent = document.getElementsByClassName('controls-content');
 
        if (menuIcon[0].className.indexOf("active") != -1) {
            bodytag[0].classList.remove('menuOn');
            menuIcon[0].classList.remove('active');
            controlsContent[0].classList.remove('active');
        } else {
            bodytag[0].classList.add('menuOn');
            menuIcon[0].classList.add('active');
            controlsContent[0].classList.add('active');
        }
    
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
                        <li><Link to="/">Home</Link></li>
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
             <a onClick={ (e)=> openMobilMenu(e) }  class="mm" href="javascript:;"><span></span><span> </span><span></span></a>
            </div> 
        </header>
        
     );
}

export default Header;