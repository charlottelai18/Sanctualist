import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'About', path: '/about' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Track Order', path: '/track' },
];

export default function Navbar() {
  const location = useLocation();
  const { itemCount, setIsOpen } = useCart();

  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: () => base44.auth.me(),
  });

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-xs font-bold">S</span>
          </div>
          <span className="text-sm font-semibold tracking-wide hidden sm:block">SANCTUARY</span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(({ label, path }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                  active
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-2">
          {/* Profile icon */}
          <button
            onClick={() => !user && base44.auth.redirectToLogin()}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-border hover:bg-secondary transition-colors overflow-hidden"
            title={user ? user.full_name || user.email : 'Login'}
          >
            {user?.profile_picture ? (
              <img src={user.profile_picture} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-4 h-4 text-muted-foreground" />
            )}
          </button>

          {/* Cart icon */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative w-9 h-9 flex items-center justify-center rounded-full border border-border hover:bg-secondary transition-colors"
          >
            <ShoppingBag className="w-4 h-4 text-muted-foreground" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav links */}
      <div className="md:hidden flex items-center gap-1 px-4 pb-2 overflow-x-auto">
        {navItems.map(({ label, path }) => {
          const active = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex-shrink-0 px-3 py-1 rounded-full text-xs transition-all ${
                active
                  ? 'bg-primary text-primary-foreground font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}