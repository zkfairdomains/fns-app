import React, { useRef, useState } from "react";  
import { useAccount } from "wagmi";
import { GET_MY_DOMAINS } from "../graphql/Domain";
import { apolloClient } from "../config";
import { useLazyQuery, useQuery } from "@apollo/client";
import { getExpires, getTimeAgo, isExpiring, obscureName } from "../helpers/String";
import moment from "moment";
import ConnectWalletButton from "../partials/ConnectWalletButton";
import RenewModal from "../components/RenewModal";
import { Modal } from "react-bootstrap";

const Account = () => { 
  
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
          <h2>My Domains</h2> 
          {data.domains == null || data.domains.length < 1 ? <div className="alert alert-info">No domain(s) found</div>: <></>}
          <p>
              Please note that sometimes it takes time to view your domain in this page because of data indexer delay.
          </p> 
          <div className="tableContent">
            <table className="tabletype2">
                <thead>
                  <tr>
                    <th width="35%">Name</th>
                    <th width="20%">Registered</th>
                    <th width="30%">Expires</th>
                    <th width="15%">Action</th>
                  </tr>
                </thead>
                <tbody>
                { data.domains.map((domain) => (
                    <tr key={domain.id}>
                      <td>
                        {obscureName(domain.name, 25)}
                      </td>
                      <td>
                        {getTimeAgo (domain.registeredAt)}
                      </td>
                      <td>
                        {getExpires(domain.expiryDate)}
                      </td>
                      <td> 
                        <RenewModal domain={domain} owner={owner} key={domain.id} /> 
                      </td>
                    </tr>
                  )) } 
                </tbody>
            </table>
          </div>
      </div> 
    </>
  )
};

export default Account;