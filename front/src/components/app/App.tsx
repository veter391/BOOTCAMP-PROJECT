// styles
import './app.scss';

// scripts / components
import { Route, Routes } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Home from '../../pages/home/Home';
import About from '../../pages/about/About';
import ErrorPage from '../../pages/error/ErrorPage';
import Account from '../../pages/account/Account';

function App () {
  return (
    <div className='wrapper'>
      <Header />

      <main className='main'>
        <h1 className='visually-hidden'> Connect Peaple </h1>

        {/* N: Routers to pages */}
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about' element={<About />} />
          <Route path='/account' element={<Account />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>

      </main>

      <Footer />
    </div>
  );
}

export default App;
