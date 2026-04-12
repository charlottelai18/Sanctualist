import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Sparkles, HelpCircle, MapPin } from 'lucide-react';
import { useCart } from '@/lib/CartContext';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: ShoppingBag, label: 'Shop', path: '/shop' },
  { icon: Sparkles, label: 'About', path: '/about' },
  { icon: HelpCircle, label: 'FAQ', path: '/faq' },
  { icon: MapPin, label: 'Track Order', path: '/track' },
];

export default function Sidebar() {
  const location = useLocation();
  const { itemCount, setIsOpen } = useCart();

  return (
    <>
      {/* Desktop vertical sidebar */}
      <nav className="hidden lg:flex fixed left-0 top-0 bottom-0 w-16 bg-background/80 backdrop-blur-xl border-r border-border z-40 flex-col items-center py-8 justify-between">
        <div className="flex flex-col items-center gap-1">
          <Link to="/" className="mb-8">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-xs font-bold">S</span>
            </div>
          </Link>
          {navItems.map(({ icon: Icon, label, path }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`group relative w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 ${
                  active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="absolute left-full ml-3 px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="relative w-10 h-10 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-300"
        >
          <ShoppingBag className="w-4 h-4" />
          {itemCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
      </nav>

      {/* Mobile bottom bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-t border-border z-40 px-1 py-1.5">
        <div className="flex items-center justify-around">
          {navItems.map(({ icon: Icon, label, path }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg transition-all ${
                  active ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[9px] font-medium">{label}</span>
              </Link>
            );
          })}
          <button
            onClick={() => setIsOpen(true)}
            className="relative flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-muted-foreground"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="text-[9px] font-medium">Cart</span>
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </nav>
    </>
  );
}