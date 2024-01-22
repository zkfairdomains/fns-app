function Sayac() {
    return ( 
        <div className="preloader">
             <div className="countdown">
                <div id="countdown">60</div>
                <div id="cbar"></div>
             </div>
             <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
             <div className="d-none" id="buttons"><button className="green">Approve</button><button className="red">Cancel</button></div>
          </div>
     );
}

export default Sayac;