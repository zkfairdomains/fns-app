import { useQuery } from "@apollo/client";
import { LATEST_REGISTERED } from "../graphql/Domain";
import { getTokenId, obscureName } from "../helpers/String";
import { Link } from "react-router-dom";

function LatestRegistered() {
    const { data, loading, error, refetch } = useQuery(LATEST_REGISTERED, { notifyOnNetworkStatusChange: true });
   
    if (error) return <div className="container alert alert-danger"> {error.message} </div>

    return ( 
        <>
        { loading ? <div className="tableContent text-white"> Loading... </div> : 
            <ul className="list-inline">
                { data.domains && data.domains.map( (domain) => (
                    <li className="list-inline-item ">
                        <img src={process.env.REACT_APP_METADATA_URL + "/"+ getTokenId(domain.labelName) + "/image"} alt={domain.name} />
                        <Link to={"/name/"+ domain.name } className="text-white fs-4">
                            {obscureName(domain.name, 20)}
                        </Link>
                    </li>
                ))}
            </ul>
        } 
       </>
     );
}

export default LatestRegistered;