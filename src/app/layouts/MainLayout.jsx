import React from 'react';
import Header from '../components/generic/Header.jsx';
import Footer from '../components/generic/Footer.jsx';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function MainLayout() {
  return (
    <div className="min-w-screen min-h-screen flex flex-col bg-background dark:bg-background-darker">



      <Header />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
