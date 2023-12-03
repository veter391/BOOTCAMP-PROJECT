import Creators from '../../components/creators/Creators.tsx';

function About () {
  return (
    <section className="account">
      <div className="container account__container">
        <h2>About our team:</h2>
        <Creators />
      </div>
    </section>
  );
}

export default About;
