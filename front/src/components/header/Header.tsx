import { NavLink } from 'react-router-dom';
import './header.scss';
import { useState } from 'react';

function Header () {
  const [burgerActive, setBurgerActive] = useState(false);

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

        <nav className={`header__nav nav ${burgerActive && 'nav--visible'}`} data-nav>
          <ul className='nav__list list-reset'>
            <li className='nav__item'>
              <NavLink className='nav__link' to="/">Home</NavLink>
            </li>

            <li className='nav__item'>
              <NavLink className='nav__link' to="/about">About</NavLink>
            </li>

            <li className='nav__item'>
              <NavLink className='nav__link' to="/account">Account</NavLink>
            </li>

            <li className='nav__item'>
              <NavLink className='nav__link' to="/profile">Profile</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}



export default Header;
