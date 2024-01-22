function Accordion() {
    return ( 
        <div className="accordion">
             <div className="accItem">
                <div className="accHead"><span>Reverse record</span><em></em></div>
                <div className="accBody d-none">
                   <p>This designates one of your names to represent your account and act as your cross-platform web3 username and profile. You can only have one Primary Name per account and can change it at any time</p>
                   <form action="">
                      <div className="frow">
                         <select id="select-domain" name="sd">
                            <option value="">Select Domain</option>
                            <option value="">No Data</option>
                         </select>
                      </div>
                      <div className="frow d-flex justify-content-end"><button className="cancel me-3">Cancel</button><button className="save">Save</button></div>
                   </form>
                </div>
             </div>
          </div>
     );
}

export default Accordion;