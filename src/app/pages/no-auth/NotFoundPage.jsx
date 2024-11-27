import React from 'react';
import { Link } from 'react-router-dom';
import notFound from '../../assets/errors/404NotFound.gif';

export default function NotFound() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-cente">
      <img src={notFound} alt="Not Found" />
      <h3>Oops, cette page n'existe pas !</h3>
      <Link to="/"><button className='btn btn-primary m-5'>Retour page principale</button></Link>
    </div>
  );
}
