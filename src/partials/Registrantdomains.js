import Search from "./Search";
import Accordion from './Accordion';
import Tabs from './Tabs';
import ConnectWalletButton from "./ConnectWalletButton";
function Registrantdomains() {
    return ( 
        <div className="centercontent">
            <Search />
            <Accordion />
            <Tabs />
            <ConnectWalletButton />
        </div>
     );
}

export default Registrantdomains;