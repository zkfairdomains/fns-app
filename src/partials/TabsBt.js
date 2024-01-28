import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function TabsBt() {
  return (
    <div className='tab-outer '>
        <Tabs
      defaultActiveKey="registrant"
      transition={false}
      id="noanim-tab-example"
    >
      <Tab eventKey="registrant" title="Registrant">
          <h2 className='mb-3'>My Domains</h2>
          <ul className='itemlist'>
            <li className="copy-container d-flex">
                <span className="copy-text w-100">Domain 1</span>
                <div className='w-75 d-flex justify-content-end'>
                  <span>Status: <em className='color-red'>Passive</em></span><span className='me-3 ms-3'>4$/year</span><button className="green">Click for active</button>
                </div>
                </li>
            </ul>
      </Tab>
      <Tab eventKey="controller" title="Controller">
        Tab content for Profile
      </Tab>
    </Tabs>
    </div>
    
  );
}

export default TabsBt;