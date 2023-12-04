import './footer.scss';

function Footer () {
  return (
    <footer className="footer">
      <div className="container footer__container">
        <p className='footer__description'>
          <span style={{ marginRight: '15px' }}>Connect People © 2023</span>
          <a className="footer__link colored"
            href=""
            target="_blank"
            aria-label="project developer">
            About the team
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
