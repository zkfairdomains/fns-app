import React, { useState } from "react";  
import { useAccount } from "wagmi";
import { GET_MY_DOMAINS } from "../graphql/Domain";
import { apolloClient } from "../config";
import { useLazyQuery, useQuery } from "@apollo/client";
import { getExpires, getTimeAgo, isExpiring, obscureName } from "../helpers/String";
import moment from "moment";
import ConnectWalletButton from "../partials/ConnectWalletButton";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Account = () => { 
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { address: owner, isConnected } = useAccount();

  const now = moment().utc().unix();
  const { data, loading, error } = useQuery(GET_MY_DOMAINS, { variables: { owner, now }});
  
  if (!isConnected)
    return ( <div className="alert alert-warning container">You need to connect wallet first to see your domain. <ConnectWalletButton></ConnectWalletButton></div> )


  if (loading) return  <div className="container text-white"> Loading... </div>
  if (error) return <div className="container alert alert-danger"> {error.message} </div>
  
 

  return (
    <>  
     
      <div className="container text-white ">
      
      <Modal
        show={show}
        size="lg"
        onHide={handleClose}
        backdrop="static"
        dialogClassName="modal-90w"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>RENEW</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="tableContent">
              <table className="w-100 tabletype2">
                  <thead>
                      <tr>
                          <th width="35%">Domain Name</th>
                          <th width="35%">Year Select</th>
                          <th width="30%">Price</th>
                      </tr>
                  </thead>
                  <tbody>
                    <tr>
                        <td>asdasd.zkf</td>
                        <td><div className="customCounter">
                              {/* <button onClick={(e)=> this.handleDurationDown(e)} className="countminus"><em></em></button> */}
                              <button className="countminus"></button>
                              <div><small>
                                {/* {this.state.duration} year  */}
                                1 year
                                </small></div>
                              <button  className="countplus"></button>
                              {/* <button onClick={(e)=> this.handleDurationUp(e)} className="countplus"><em></em><em></em></button> */}
                          </div></td>
                        <td>
                            0.0025eth
                        </td>
                    </tr>
                  </tbody>
              </table>
              
              
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <button className="green">RENEW</button>
        </Modal.Footer>
      </Modal>
      <h2>My Domains</h2>
        {loading ? <>Loading...</>: <> </>}
        {error ? <div className="alert alert-danger">{error.message}</div>: <> </>}
        {data.domains == null || data.domains.length < 1 ? <div className="alert alert-info">No domain(s) found</div>: <></>}

        <p>
            Please note that sometimes it takes time to view your domain in this page because of data indexer delay.
        </p>

        <div className="tableContent">
        <table className="tabletype2">
            <thead>
              <td width="35%">Name</td>
              <td width="20%">Registered</td>
              <td width="30%">Expires</td>
              <td width="15%">Action</td>
            </thead>
             { data.domains.map((domain) => (
                <tr id={domain.id}>
                  <th>
                    {obscureName(domain.name, 25)}
                  </th>
                  <td>
                  {getTimeAgo (domain.registeredAt)}
                  </td>
                  <td>
                  {getExpires(domain.expiryDate)}
                  </td>
                  <td>
                  <button className="green f-19" onClick={handleShow}>RENEW</button>
                  </td>
                </tr>
              )) } 
        </table>
        </div>
      </div>
    </>
  )
};

export default Account;