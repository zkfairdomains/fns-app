import logo from './zkfair.svg';
import comingsoon from './coming-soon-zfair.png';
import bgpattern from './banner-3.8aa010fe.png';
import './App.css';




function App() {
  return (
    <div className="App h-100">
      <div className='container-fluid h-100 d-flex justify-content-center flex-column align-items-center' style={{  
  backgroundImage: "url(" + bgpattern + ")",
  backgroundPosition: 'center',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat'
}}>
        <h1 className='mb-lg-5'><img alt="zkfair Domains" src={logo}  title="zkfair Domains" /></h1>
        <h2><img alt="zkfair Domains" src={comingsoon}  title="zkfair Domains" /></h2>
      </div>
    </div>
  );
}

export default App;
