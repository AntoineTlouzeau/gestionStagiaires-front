import React from 'react';
import { NavLink } from 'react-router-dom';

function Footer() {
  return (
    <footer className="mt-auto bg-primary dark:bg-primary-darker text-white h-20 flex items-center justify-between px-5 border-t-8 border-secondary dark:border-secondary-darker">
      <NavLink to={"/contact"} className={"underline"}>Contacter l'administrateur</NavLink>
      <span>V1.0 - Insy2s - 2023</span>
    </footer>
  );
}

export default Footer;
