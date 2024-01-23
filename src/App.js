import './assets/styles/style.css';
import Header from './partials/Header';
import Footer from './partials/Footer';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Notfound from "./pages/Notfound";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Register from "./pages/Register";

function App() {
  return (
    <div>
      <main>
        <Header />
        <section>
          <div className='container-fluid'>

            <BrowserRouter forceRefresh={true}>
              <Routes>  
                <Route index element={<Home />} />
                <Route path="/register" element={<Register />} />                
                <Route path="/terms" element={<Terms />} /> 
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/404" element={<Notfound />} />  
                <Route path="*" element={<Navigate replace={true} to="/404" />} />
              </Routes>
            </BrowserRouter>
            <ToastContainer position="bottom-right" autoClose={1000} hideProgressBar={false} theme="light"></ToastContainer>
            {/* <Registrantdomains  /> 
              <Sayac />  */}
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
