import searchIcon from './assets/images/search-icon.svg';
function Search() {
    return ( 
        <div className="search-content">
            <form action="">
                <img src={searchIcon} alt="" /><input type="text" placeholder="Search your domain name" />
                <select id="domain-choise" name="">
                    <option value="zkfair">.zkf</option>
                    <option value="other">.other</option>
                </select>
                <button>SEARCH</button>
            </form>
            <div className="search-result-content d-none">
            <ul>
                <li className="copy-container"><span className="copy-text">search result 1</span><button className="green">Avaible</button></li>
                <li className="copy-container"><span className="copy-text">search result 2</span><button className="red" disabled="disabled">Not Avaible</button></li>
                <li className="copy-container"><span className="copy-text">search result 3</span><button className="green">Avaible</button></li>
            </ul>
            </div>
        </div>
     );
}

export default Search;