import * as React from "react";
import Logo from '../assets/images/zfknameservice-logo.svg'; 
import ConnectWalletButton from "../components/ConnectWalletButton"; 
import { Link, NavLink } from 'react-router-dom';
import { useRef } from "react";
import elementmarket from '../assets/images/element-logo-4.png'
import alienswap from '../assets/images/AlienSwap_logo_color.png'
import { Dropdown,NavDropdown } from "react-bootstrap";


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
        return false;
    }
    return ( 
        <header>
            <div className="container-fluid d-flex align-items-center justify-content-between">
            <NavLink to="/">
                <h1 id="logo">
                        <img src={Logo} alt="Zkfair Name Services" />
                        <span>ZKFair Domains</span>
                </h1>
            </NavLink>
            <div className="controls-content">
                <nav>
                    <ul className="d-flex">
                        <li><Link to="/account">My Domains</Link></li>
                        <NavDropdown as={"li"} title="Marketplaces">
                            <NavDropdown.Item className="fs-5" target="_blank" href="https://element.market/collections/zkfair-name-service-56aafc">
                                <img width={100} height={24} src={elementmarket} className="align-center" alt="ZKFair Domains on Element.Market" />
                       
                            </NavDropdown.Item>
                            <NavDropdown.Item target="_blank" href="https://alienswap.xyz/collection/zkfair/zk-fair-name-service-e32d">
                                <img width={100} height={24} src={alienswap} alt="ZKFair Domains on Element.Market" />
                            </NavDropdown.Item>
                        </NavDropdown>
                    </ul>
                </nav>
            </div>
             <ConnectWalletButton></ConnectWalletButton>
             <a onClick={ (e)=> openMobilMenu(e) }  className="mm" href="#"><span></span><span> </span><span></span></a>
            </div> 
        </header>
        
     );
}

export default Header;