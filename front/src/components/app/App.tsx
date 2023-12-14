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
import Discover from '../../pages/discover/Discover';
import Chat from '../../pages/chat/Chat';
import AppProvider from '../../context/AppProvider';

function App () {
  return (
    <div className='wrapper'>
      <AppProvider>
        <Header />

        <main className='main'>
          {/* N: Routers to pages */}
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/about' element={<About />} />
            <Route path='/account' element={<Account />} />
            <Route path='/discover' element={<Discover/>} />
            <Route path='/chat' element={<Chat />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </main>

        <Footer />
      </AppProvider>
    </div>
  );
}

export default App;
