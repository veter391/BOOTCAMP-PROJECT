import { useState } from 'react';
import LogIn from '../../components/login/Login';
import SignUp from '../../components/signup/SignUp';
import './home.scss'

function Home () {
  const [login, setLogin] = useState(true);

  return (
    <section className="home">
      <div className="container home__container">
        <div className="home__left">
          <h2 style={{ marginBottom: '50px' }}>Subtitle</h2>
          <p style={{ lineHeight: '2rem', maxWidth: '600px' }} >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis unde accusamus nihil perferendis fugit eum cupiditate id vel voluptates. Impedit doloribus possimus error commodi quisquam maxime iste iusto distinctio nesciunt!
          </p>
        </div>
        <div className="home__right">

          { (login && <LogIn />) || <SignUp />}
          <button onClick={() => setLogin(!login)} className='home__btn-change btn-reset'>{ login &&'SignUp now' || 'LogIn here' }</button>
        </div>

        <video autoPlay muted loop className='home__video'>
          <source src="/src/assets/files/video2.mp4" type="video/mp4" />
          {/* <source src="movie.ogg" type="video/ogg" /> */}
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}

export default Home;
