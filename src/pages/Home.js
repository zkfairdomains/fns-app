import Banner from "../partials/Banner"
import LatestRegistered from "../partials/LatestRegistered";
import Search from "../partials/Search";

function Home() {
    return ( 
        <div className="centercontent">
            <Banner />
            <Search />
            <LatestRegistered />
        </div> 
     );
}

export default Home;