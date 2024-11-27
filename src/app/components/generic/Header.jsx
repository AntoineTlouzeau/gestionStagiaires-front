import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as URL from '../../constants/url/urlFront.js';
import logo from '../../assets/images/Logo-gestionnaire.svg';
import DarkmodeSlider from '../settings/DarkmodeSlider.jsx';

import { logout } from '../../store/accountSlice';
import { loginWithFakeUser } from '../../store/accountSlice';
import { toast } from 'react-toastify';


function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const closeMenuOnResize = () => {
    if (window.innerWidth > 768) { 
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', closeMenuOnResize);
    return () => {
      window.removeEventListener('resize', closeMenuOnResize);
    };
  }, []);

  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  };
  const handleLoginFakeUser = () => {
    // Mock user est le suivant :
    // {
    //     "token": "fake_token",
    //     "isAuthenticated": true,
    //     "lastname": "Johnson",
    //     "email": "bob@example.com",
    // }
    toast.success("Fake log success !");
    dispatch(loginWithFakeUser());
  };

  // useEffect(() => {
  //   if (user.isAuthenticated) {
  //     navigate(URL.URL_MANAGER_PROFIL);
  //   }
  // }, [user.isAuthenticated]);

  return (
    <header className="sticky top-0 z-50 bg-background-lightest dark:bg-background-dark dark:text-white text-center
                        flex items-center px-5 shadow-md font-semibold">
      {/* Burger menu icon */}
      <div className="md:hidden relative">
      <button className={`text-black dark:text-white transition-transform transform h-6 w-6 ${menuOpen ? 'rotate-90' : 'ml-0'}`}
        onClick={toggleMenu}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      </div>
      {/* Logo */}
      <div><NavLink to={URL.URL_HOME}><img src={logo} alt="logo" className="py-2 min-w-max" /></NavLink></div>
      {/* Navigation links */}
      <div className='relative'>
      <nav className={`transform transition-transform  duration-300 overflow-hidden bg-white md:bg-transparent flex text-lg flex-col md:flex-row absolute md:relative dark:text-white dark:bg-background-dark -right-20 md:right-0 px-11 py-1 top-11 md:top-0 shadow-xl md:shadow-none items-start md:space-x-6 ml-6 md:items-center ${menuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
          <div className='my-2 md:my-0'><NavLink to={URL.URL_MANAGERS} onClick={toggleMenu}>Responsables</NavLink></div>
          <div className='my-2 md:my-0'><NavLink to={URL.URL_INTERNS} onClick={toggleMenu}>Stagiaires</NavLink></div>
          <div className='my-2 md:my-0'><NavLink to={URL.URL_TEAMS} onClick={toggleMenu}>Equipes</NavLink></div>
          <div className='my-2 md:my-0'><NavLink to={URL.URL_REVIEWS} onClick={toggleMenu}>Reviews</NavLink></div>
          <div className='my-2 md:my-0'><NavLink to={URL.URL_DAILIES} onClick={toggleMenu}>Dailies</NavLink></div>
        </nav>
      </div>
      <div className='w-full flex justify-end py-2'>
      {user.isAuthenticated ? (
        <div className='flex flex-col lg:flex-row gap-1 lg:gap-5 justify-center items-center text-center text-sm font-extralight'>
          <div className='italic hidden lg:block'>Bonjour, {user.lastname}</div>
          <button className="btn btn-primary"><NavLink to={URL.URL_MANAGER_PROFIL}>Mon profil</NavLink></button>
          <button className="btn btn-secondary" onClick={handleLogout}>Se déconnecter</button>
        </div>
      ) : (
        <NavLink to={URL.URL_LOGIN}><button className="btn btn-primary" onClick={handleLoginFakeUser}>Se connecter</button></NavLink>
      )}
      <div className="ml-6 mr-2 flex"><DarkmodeSlider /></div>   

      </div>
    </header>
  );
}

export default Header;
