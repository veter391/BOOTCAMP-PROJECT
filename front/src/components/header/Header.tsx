import { NavLink } from 'react-router-dom';
import './header.scss';

function Header () {
  return (
    <header className='header'>
      <div className="container header__container">
        <h2 className='header__logo'>ConnectPeople</h2>
        <nav className='header__nav'>
          <NavLink className='header__link' to="/">Home</NavLink>
          {/* <NavLink className='header__link' to="/about">About</NavLink> */}
          <NavLink className='header__link' to="/account">Account</NavLink>
          <NavLink className='header__link' to="/discover">Discover</NavLink>
          <NavLink className='header__link' to="/chat">Chat</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
