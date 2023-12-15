import Creators from '../../components/creators/Creators.tsx';
import './about.scss';

function About () {
  return (
    <section className="about">
      <div className="container about__container">
        <h2 className='about__title colored'>About our team:</h2>
        <Creators />
      </div>
    </section>
  );
}

export default About;
