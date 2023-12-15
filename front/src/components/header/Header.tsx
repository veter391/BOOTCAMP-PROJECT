import './header.scss';
import { NavLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppProvider';

function Header () {
  const [burgerActive, setBurgerActive] = useState(false);

  const { user }: any = useContext(AppContext);

  return (
    <header className='header'>
      <div className="container header__container">
        <h2 className='header__logo'>ConnectPeople</h2>

        <button onClick={() => setBurgerActive(!burgerActive)}
          className={`burger ${burgerActive && 'burger--active'}`}
          aria-label={(burgerActive && 'Close menu') || 'Open menu'}
          aria-expanded={burgerActive} data-burger>
          <span className='burger__line'></span>
        </button>

        {user && <HeaderNavigation burgerActive={burgerActive} />}
      </div>
    </header>
  );
}

function HeaderNavigation ({ burgerActive }) {
  return (
    <nav className={`header__nav nav ${burgerActive && 'nav--visible'}`} data-nav>
      <ul className='nav__list list-reset'>
        <li className='nav__item'>
          <NavLink className='nav__link' to="/">Home</NavLink>
        </li>

        <li className='nav__item'>
          <NavLink className='nav__link' to="/account">Account</NavLink>
        </li>

        <li className='nav__item'>
          <NavLink className='nav__link' to="/profile">Profile</NavLink>
        </li>

        <li className='nav__item'>
          <NavLink className='nav__link' to="/chat">Chat</NavLink>
        </li>

        <li className='nav__item'>
          <NavLink className='nav__link' to="/discover">Discover</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
