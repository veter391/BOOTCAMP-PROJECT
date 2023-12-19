import './header.scss';
import { useLocation, NavLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppProvider';

function Header () {
  const [burgerActive, setBurgerActive] = useState(false);

  const { user, userLogOut }: any = useContext(AppContext);
  const location = useLocation();

  return (
    <header className='header'>
      <div className="container header__container">
        <div className="logo_text">
        <img className="logo" src="./img/connectPeople.png" alt="" />
        Connect People
        </div>
        {user &&
          <button onClick={() => setBurgerActive(!burgerActive)}
            className={`burger ${burgerActive && 'burger--active'}`}
            aria-label={(burgerActive && 'Close menu') || 'Open menu'}
            aria-expanded={burgerActive} data-burger>
            <span className='burger__line'></span>
          </button>
        }

        {user && <HeaderNavigation burgerActive={burgerActive} userLogOut={userLogOut}/>}
        {location.pathname === '/about' && !user && <AboutNoUser burgerActive={burgerActive}/>}
      </div>
    </header>
  );
}

function HeaderNavigation ({ burgerActive, userLogOut }) {
  return (
    <nav className={`header__nav nav ${burgerActive && 'nav--visible'}`} data-nav>
      <ul className='nav__list list-reset'>
        <li className='nav__item'>
          <NavLink className='nav__link' to="/">Home</NavLink>
        </li>

        {/* <li className='nav__item'>
          <NavLink className='nav__link' to="/account">Account</NavLink>
        </li> */}

        <li className='nav__item'>
          <NavLink className='nav__link' to="/profile">Profile</NavLink>
        </li>

        {/* <li className='nav__item'>
          <NavLink className='nav__link' to="/chat">Chat</NavLink>
        </li> */}

        <li className='nav__item'>
          <NavLink className='nav__link' to="/discover">Explorar</NavLink>
        </li>

        <li className='nav__item'>
          <a className='nav__link nav-log-out' onClick={userLogOut}>Cerrar sesión</a>
        </li>

      </ul>
    </nav>
  );
}
function AboutNoUser ({ burgerActive }) {
  return (
    <nav className={`header__nav nav noUserNav ${burgerActive && 'nav--visible'}`} data-nav>
      <ul className='nav__list list-reset noUserList'>
      <li className='nav__item'>
          <NavLink className='nav__link' to="/">Home</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
