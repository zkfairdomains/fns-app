function Footer() {
    return ( 
        <footer className="w-100">
            <div className="container-fluid d-flex justify-content-between align-items-center">
            <div className="footNav">
                <ul className="d-flex">
                    <li><a href="">Terms</a></li>
                    <li><a href="">Privacy</a></li>
                    <li><a href="">Zkfair.io</a></li>
                </ul>
            </div>
            <div className="socialMedia">
                <ul>
                    <li><a href=""><img src="/assets/images/twitter.svg" alt="" /></a></li>
                </ul>
            </div>
            </div>
        </footer>
     );
}

export default Footer;