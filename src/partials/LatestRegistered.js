import { useQuery } from "@apollo/client";
import { LATEST_REGISTERED } from "../graphql/Domain";
import { getTokenId, obscureName } from "../helpers/String";
import { Link } from "react-router-dom";
import Slider from "react-slick";

function LatestRegistered() {
    const { data, loading, error, refetch } = useQuery(LATEST_REGISTERED, { notifyOnNetworkStatusChange: true });
   
    if (error) return <div className="container alert alert-danger"> {error.message} </div>
    var settings = {
        autoplay: true,
        dots: false,
        infinite: true,
        arrows:true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplaySpeed: 2000,
        responsive: [
            {
              breakpoint: 1024,
              settings: { slidesToShow: 2, slidesToScroll: 2 }
            },
            {
              breakpoint: 600,
              settings: { slidesToShow: 1, slidesToScroll: 1 }
            }
          ]
      };
    return ( 
        <>
        { loading ? <div className="tableContent text-white"> Loading... </div> : 
            <div className="container text-white pt-4">
                <h2 className="mb-3">Latest Registered</h2>
                <Slider {...settings}>
                            { data.domains && data.domains.map( (domain) => (
                                <div className="p-3">
                                <Link to={"/name/"+ domain.name } className="text-white fs-4">
                                <img className="w-100" src={process.env.REACT_APP_METADATA_URL + "/"+ getTokenId(domain.labelName) + "/image"} alt={domain.name} />
                                    {/* {obscureName(domain.name, 20)} */}
                                </Link>
                                </div>
                        ))}
                    
                </Slider> 
            </div>
        } 
       </>
     );
}

export default LatestRegistered;