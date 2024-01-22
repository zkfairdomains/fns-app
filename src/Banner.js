import Logo from './assets/images/zkfair.svg';
function Banner() {
    return ( 
        <div className="banner">
            <div>
                <h2>Omnichain<br />naming for wallets<br />websites on <span>Zkfair</span></h2>
            </div>
            <div>
                <img src={Logo} alt="" />
            </div>
        </div>
     );
}

export default Banner;