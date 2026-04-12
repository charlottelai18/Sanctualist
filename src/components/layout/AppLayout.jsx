import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import CartDrawer from './CartDrawer';

export default function AppLayout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <CartDrawer />
      <main className="pt-14 md:pt-[calc(3.5rem)]">
        <Outlet />
      </main>
    </div>
  );
}