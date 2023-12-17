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
import PrivateRoute from '../PrivateRoute';

// !!! dont toch it !!!
import { useEffect, useRef, useState } from 'react';
import GLOBE from 'vanta/dist/vanta.globe.min';

function App () {
  // !!! dont toch it !!!
  // const [vantaEffect, setVantaEffect] = useState(null);
  const canvasRef = useRef(null);
  // !!! dont toch it !!!
  // useEffect(() => {
  //   if (!vantaEffect) {
  //     setVantaEffect(GLOBE({
  //       el: canvasRef.current,
  //       mouseControls: false,
  //       touchControls: false,
  //       gyroControls: false,
  //       minHeight: 200.00,
  //       minWidth: 200.00,
  //       scale: 0.5,
  //       scaleMobile: 0.5,
  //       size: 1,
  //       color: 0x009d57,
  //       color2: 0x1a1a1a00,
  //       backgroundColor: 0x1a1a1a00
  //       // mouseControls: true,
  //       // touchControls: true,
  //       // gyroControls: false,
  //       // minHeight: 200.00,
  //       // minWidth: 200.00,
  //       // scale: 1.00,
  //       // scaleMobile: 1.00,
  //       // color: 0x1a1a1a,
  //       // color: 0x009d57,
  //       // showLines: false
  //     }));
  //   }
  //   return () => {
  //     if (vantaEffect) vantaEffect.destroy();
  //   };
  // }, [vantaEffect]);

  return (
    <div ref={canvasRef} className='wrapper'>
      {/* <div ref={canvasRef} className='canvas'></div> */}
      <AppProvider>
        <Header />

        <main className='main'>
          {/* N: Routers to pages */}
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/about' element={<About />} />
            <Route path='/account' element={
            <PrivateRoute>
              <Account />
            </PrivateRoute>
            } />
            <Route path='/discover' element={
            <PrivateRoute>
              <Discover/>
            </PrivateRoute>
            } />
            <Route path='/chat' element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
            } />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </main>

        <Footer />
      </AppProvider>
    </div>
  );
}

export default App;
