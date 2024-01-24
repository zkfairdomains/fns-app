import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function TabsBt() {
  return (
    <Tabs
      defaultActiveKey="registrant"
      transition={false}
      id="noanim-tab-example"
      className="mt-5"
    >
      <Tab eventKey="registrant" title="Registrant">
        Tab content for Home
      </Tab>
      <Tab eventKey="controller" title="Controller">
        Tab content for Profile
      </Tab>
      
    </Tabs>
  );
}

export default TabsBt;