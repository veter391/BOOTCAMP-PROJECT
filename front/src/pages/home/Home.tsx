import { useState } from 'react';
import LogIn from '../../components/login/Login';
import SignUp from '../../components/signup/SignUp';
import './home.scss';

function Home () {
  const [login, setLogin] = useState(true);

  const scrolling = (e : any) => {
    e.preventDefault();
    const id = e.target.getAttribute('href');

    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <>
      <section className="hero">
        <div className="container hero__container">
          <h1 className='hero__title'>Connect People Workbench that will Work</h1>
          <p className='hero__descr' >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis unde accusamus nihil perferendis fugit eum cupiditate id vel voluptates. Impedit doloribus possimus error commodi quisquam maxime iste iusto distinctio nesciunt!
          </p>

          <a onClick={scrolling} className='btn hero__btn' href="#user-place">SCROLL DOWN</a>

        </div>
      </section>

      <section id='user-place' className="user-place">
        <div className="container user-place__container">
          <div className="user-place__box">
            { (login && <LogIn />) || <SignUp />}

            <div className="user-place__join">
              {(login && 'New to Connect People? ') || 'Already registered? '}
              <button onClick={() => setLogin(!login)} className='user-place__btn-change btn-reset'>{(login && 'Join now') || 'Log in' }</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
