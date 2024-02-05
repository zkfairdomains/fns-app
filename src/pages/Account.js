import React, { useRef, useState } from "react";  
import { useAccount } from "wagmi";
import { GET_MY_DOMAINS } from "../graphql/Domain";
import { apolloClient } from "../config";
import { useLazyQuery, useQuery } from "@apollo/client";
import { getExpires, getTimeAgo, isExpiring, obscureName } from "../helpers/String";
import moment from "moment";
import ConnectWalletButton from "../components/ConnectWalletButton";
import RenewModal from "../components/RenewModal";
import { Modal, Spinner } from "react-bootstrap";
import spinner from '../assets/images/spinner.svg';

const Account = () => { 
  
  const { address: owner, isConnected } = useAccount();

  const now = moment().utc().unix();
  const { data, loading, error, refetch } = useQuery(GET_MY_DOMAINS, { variables: { owner, now }, notifyOnNetworkStatusChange: true });
  
  if (!isConnected)
    return ( <div className="alert alert-warning container d-flex justify-content-between align-items-center">You need to connect wallet first to see your domains. <ConnectWalletButton></ConnectWalletButton></div> )

 
  if (error) return <div className="container alert alert-danger"> {error.message} </div>
 
  return (
    <>  
     
      <div className="container myAccount ">
          <h2>My Domains</h2> 
          <div className="d-flex justify-content-between mb-3 align-items-center">
            <p>
              Please note that sometimes it takes time to view/update your domains in this page because of data indexer delay.
            </p>
            <button disabled={ loading ? "disabled": ""} className="btn btn-sm btn-secondary" onClick={() => refetch()}>{ loading ? <img width={25} src={spinner} /> : <> Refresh </>} </button>
          </div> 
          { loading ? <div className="tableContent"> <span>Loading...</span></div> 
          :
          <div className="tableContent">
             {data.domains == null || data.domains.length < 1 ? <div className="alert alert-info">No domain(s) found</div>: <></>}

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
                          {obscureName(domain.name, 30)}
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
          }
      </div> 
    </>
  )
};

export default Account;