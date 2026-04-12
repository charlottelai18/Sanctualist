import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const footerLinks = [
  { label: 'Shop All', path: '/shop' },
  { label: 'About Us', path: '/about' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Track Order', path: '/track' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20, stiffness: 300 } },
};

export default function MagneticFooter() {
  return (
    <footer className="bg-primary text-primary-foreground py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
        >
          {footerLinks.map(link => (
            <motion.div key={link.label} variants={item}>
              <Link
                to={link.path}
                className="text-sm font-medium text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>
        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary-foreground flex items-center justify-center">
              <span className="text-primary text-[10px] font-bold">S</span>
            </div>
            <span className="text-sm font-semibold tracking-wide">SANCTUARY</span>
          </div>
          <p className="text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} Sanctuary. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}