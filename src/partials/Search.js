import searchIcon from '../assets/images/search-icon.svg';
function Search() {
    return ( 
        <div className="search-content">
            <form action="">
                <img src={searchIcon} alt="" /><input type="text" placeholder="Search your domain name" />
                <select id="domain-choise" name="">
                    <option value="zkfair">.zkf</option>
                </select>
                <button>SEARCH</button>
            </form>
            <div className="search-result-content">
             
            </div>
        </div>
     );
}

export default Search;