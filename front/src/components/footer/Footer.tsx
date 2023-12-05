import { Link } from 'react-router-dom';
import './footer.scss';

function Footer () {
  return (
    <footer className="footer">
      <div className="container footer__container">
        <p className='footer__description'>
          <span style={{ marginRight: '15px' }}>Connect People © 2023</span>
          <Link className="footer__link colored"
            to="/about"
            // target="_blank"
            aria-label="project developer">
            About the team </Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
