import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './common/Header';
import Footer from './common/Footer';
import bgImg from '../assets/rocklee-bg.png';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Background cố định ở đây - chỉ render 1 lần */}
      <div 
        className="fixed inset-0 z-[-1]" 
        style={{ 
          backgroundImage: `url('${bgImg}')`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' ,
          backgroundRepeat: 'no-repeat'
        }}
      />
      <div className="fixed inset-0 z-[-1] bg-black/70" />

      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}