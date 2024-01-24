import twittericon from '../assets/images/twitter.svg' ;
import githubicon from '../assets/images/githublogo.svg' ;
import discordicon from '../assets/images/discordicon.svg' ;
import { Link } from 'react-router-dom';

function Footer() {
    return ( 
        <footer className="w-100">
            <div className="container-fluid d-flex justify-content-between align-items-center">
            <div className="footNav">
                <ul className="d-flex">
                    <li><Link to="/terms">Terms</Link></li>
                    <li><Link to="/privacy">Privacy</Link></li>
                </ul>
            </div>
            <div className="socialMedia">
            <ul className='d-flex'>
                <li><a href="https://twitter.com/zkfdomains " target="_blank"><img src={twittericon} alt="Tiwtter x" title="Tiwtter x" /></a></li>
                <li className='ms-3 me-3'><a href="https://github.com/zkfairdomains" target="_blank"><img src={githubicon} alt="Github" title="Github" /></a></li>
                <li><a href="#"><img src={discordicon} alt="Discord" title="Discord" /></a></li>
            </ul>
            </div>
            </div>
        </footer>
     );
}

export default Footer;