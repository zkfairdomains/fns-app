function Tabs() {
    return ( 
        <div className="tab-content">
             <ul className="tab-nav">
                <li><a href="#tab1">Registrant</a></li>
                <li><a href="#tab2">Controller</a></li>
             </ul>
             <div className="tab-pane-content">
                <div className="pane" id="tab1">
                   <h2>My Domains</h2>
                   <ul className="list">
                      <li>egeninpipisini.zkf</li>
                      <li>ramazanyesin.zkf</li>
                      <li>emredeizlesin.zkf</li>
                   </ul>
                </div>
                <div className="pane" id="tab2">Controller</div>
             </div>
          </div>
     );
}

export default Tabs;