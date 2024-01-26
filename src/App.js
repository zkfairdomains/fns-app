import './assets/styles/style.css';
import 'react-toastify/dist/ReactToastify.css';

import Header from './partials/Header';
import Footer from './partials/Footer';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Notfound from "./pages/Notfound";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Register from "./pages/Register";
import Name from "./pages/Name";
import Account from "./pages/Account";
import Favorites from "./pages/Favorites";
import { Web3Modal } from './components/Web3Modal';
import Layouts from "./layouts";    

 

function App() {
  return ( 
        <Web3Modal>
          <BrowserRouter forceRefresh={true}>
                <Routes>  
                  <Route path='/' element={<Layouts.Home />}>
                    <Route index element={<Home />}  />
                  </Route>
                  <Route path="/" element={<Layouts.Page />}>
                    <Route path="/account" element={<Account />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/name/:name.zkf" element={<Name />} />
                    <Route path="/terms" element={<Terms />} /> 
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/404" element={<Notfound />} />  
                    <Route path="*" element={<Navigate replace={true} to="/404" />} />
                  </Route>
                </Routes> 
          </BrowserRouter>
        </Web3Modal> 
  );
}

export default App;
