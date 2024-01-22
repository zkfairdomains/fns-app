import './assets/styles/style.css';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Registrantdomains from './Registrantdomains';
import Sayac from './Sayac';

function App() {
  return (
    <div>
      <main>
        <Header />
        <section>
          <div className='container-fluid'>
              <Home />
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
