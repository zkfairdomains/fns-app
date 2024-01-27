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
      <div className="container text-white">

        {loading ? <>Loading...</>: <> </>}
        {error ? <div className="alert alert-danger">{error.message}</div>: <> </>}
        {data.domains == null || data.domains.length < 1 ? <div className="alert alert-info">No domain(s) found</div>: <></>}
       
        <table class="table table-responsive">
            <thead>
              <td>Name</td>
              <td>Registered</td>
              <td>Expires</td>
              <td>Action</td>
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
                  <button className="btn btn-success">Renew</button>
                  </td>
                </tr>
              )) } 
        </table>
          
      </div>
    </>
  )
};

export default Account;