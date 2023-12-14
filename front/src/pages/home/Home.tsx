import { useContext, useState } from 'react';
import LogIn from '../../components/login/Login';
import SignUp from '../../components/signup/SignUp';
import './home.scss';
import { AppContext } from '../../context/AppProvider';

function Home () {
  const { token }: any = useContext(AppContext);

  const scrolling = (e : any) => {
    e.preventDefault();
    const id = e.target.getAttribute('href');

    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const heroStyle = token ? { minHeight: 'calc(100vh - 109px - 72px)' } : {};

  return (
    <>
      <section className='hero' style={heroStyle}>
        <div className='container hero__container'>
          <h1 className='hero__title'>Connect People Workbench that will Work</h1>
          <p className='hero__descr' >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis unde accusamus nihil perferendis fugit eum cupiditate id vel voluptates. Impedit doloribus possimus error commodi quisquam maxime iste iusto distinctio nesciunt!
          </p>

          { !token &&
            <a onClick={scrolling} className='btn hero__btn' href='#user-place'>SCROLL DOWN</a>
          }

        </div>
      </section>

      { !token &&
        <section id='user-place' className='user-place'>
          <div className='container user-place__container'>
            <div className='user-place__box'>
            {/* {(token && <IsLogedMessage />) || <FormBox />} */}
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

function IsLogedMessage () {
  return (
    <h2>You are loged {':)'}</h2>
  );
}

export default Home;
