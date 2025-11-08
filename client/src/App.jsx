import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import UsedMachinery from './pages/UsedMachinery';
import NewMachinery from './pages/NewMachinery';
import About from './pages/About';
import SellMachinery from './pages/SellMachinery';
import Offers from './pages/Offers';
import ScrollToTop from './components/common/ScrollToTop';
import Footer from './components/layout/Footer';

function App() {
  return (
      <div className="App-container">
        <Navbar />
        <main className='content'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-machinery" element={<NewMachinery />} />
          <Route path="/used-machinery" element={<UsedMachinery />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/about" element={<About />} />
          <Route path="/sell-machinery" element={<SellMachinery />} />
        </Routes>
        </main> 
      <ScrollToTop />
      <Footer />
    </div>
  );
}

export default App;