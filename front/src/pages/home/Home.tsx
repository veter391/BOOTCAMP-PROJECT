import { useContext, useState } from 'react';
import LogIn from '../../components/login/Login';
import SignUp from '../../components/signup/SignUp';
import './home.scss';
import { AppContext } from '../../context/AppProvider';

function Home () {
  const { user } = useContext(AppContext);

  const scrolling = (e) => {
    e.preventDefault();
    const id = e.target.getAttribute('href');

    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const heroStyle = user ? { minHeight: 'calc(100vh - 109px - 72px)' } : { minHeight: 'calc(100vh - 109px)' };

  return (
    <>
      <section className='hero' style={heroStyle}>
        <div className='container hero__container'>
          <h1 className='hero__title'>Connect People</h1>
          <h1 className='hero__title'>Make a change</h1>
          <p className='hero__descr' >En Connect People, creamos puentes de solidaridad, conectando personas dispuestas a ayudar con aquellas que más la necesitan, dando forma a un mundo donde cada conexión es una oportunidad para marcar la diferencia.
          </p>

          { !user &&
            <a onClick={scrolling} className='btn hero__btn' href='#user-place'>SCROLL DOWN</a>
          }

        </div>
      </section>

      { !user &&
        <section id='user-place' className='user-place'>
          <div className='container user-place__container'>
            <div className='user-place__box'>
            <FormBox />
            </div>
          </div>
        </section>
      }
    </>
  );
}

function FormBox () {
  const [login, setLogin] = useState(true);

  return (
    <>
      <h2 className='colored'>{(login && 'Log in') || 'Sign up'}</h2>
      {(login && <LogIn />) || <SignUp />}

      <div className='user-place__join'>
        {(login && 'Nuevo en Connect People? ') || 'Ya tienes una cuenta? '}
        <button onClick={() => setLogin(!login)} className='user-place__btn-change btn-reset'>{(login && 'Registarme') || 'Iniciar sesión'}</button>
      </div>
    </>
  );
}

export default Home;
