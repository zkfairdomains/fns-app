import Accordion from 'react-bootstrap/Accordion';

function AccordionBt() {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Reverse record</Accordion.Header>
        <Accordion.Body>
            <ul className='itemlist'>
                <li className="copy-container"><span className="copy-text">Domain 1</span><span>Status: <em className='color-green'>Active</em></span><button className="red">Click for passive</button></li>
                <li className="copy-container"><span className="copy-text">Domain 2</span><span>Status: <em className='color-red'>Passive</em></span><button className="green">Click for active</button></li>
                <li className="copy-container"><span className="copy-text">Domain 3</span><span>Status: <em className='color-green'>Active</em></span><button className="red">Click for passive</button></li>
            </ul>
            <form action="">
              <div className="frow">
                  <select id="select-domain" className='w-100' name="sd">
                    <option value="">Select Domain</option>
                    <option value="">No Data</option>
                  </select>
              </div>
              <div className="frow d-flex justify-content-end"><button className="cancel me-3">Cancel</button><button className="save">Save</button></div>
            </form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AccordionBt;