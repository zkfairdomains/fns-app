import React, { useEffect } from "react";  
import { useAccount } from "wagmi";
import { GET_MY_DOMAINS } from "../graphql/Domain";
import { apolloClient } from "../config";
import { useLazyQuery, useQuery } from "@apollo/client";
import { getExpires, getTimeAgo, isExpiring } from "../helpers/String";
import moment from "moment";

const Account = () => { 
  
  const { address: owner } = useAccount();

  const now = moment().utc().unix();
  const { data, loading, error } = useQuery(GET_MY_DOMAINS, { variables: { owner, now }});
  
  console.log(data);
  
  if (loading) return  <div className="container text-white"> Loading... </div>
  if (error) return <div className="container alert alert-danger"> {error.message} </div>

  return (
    <>  
     
      <div className="container text-white ">
      <h2>My Domains</h2>
        {loading ? <>Loading...</>: <> </>}
        {error ? <div className="alert alert-danger">{error.message}</div>: <> </>}
        {data.domains == null || data.domains.length < 1 ? <div className="alert alert-info">No domain(s) found</div>: <></>}
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
                  <td>
                    {domain.name}
                  </td>
                  <td>
                  {getTimeAgo (domain.registeredAt)}
                  </td>
                  <td>
                  {getExpires(domain.expiryDate)}
                  </td>
                  <td>
                  <button className="green">Renew</button>
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