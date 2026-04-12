import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/CartContext';
// @ts-ignore
import { motion, AnimatePresence } from 'framer-motion';

export default function StickyBuyBar({ product }) {
  const [visible, setVisible] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 lg:bottom-0 left-0 lg:left-16 right-0 bg-background/80 backdrop-blur-xl border-t border-border z-30 px-6 py-3 mb-[60px] lg:mb-0"
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-10 h-10 rounded-lg object-cover border border-border flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{product.name}</p>
                <p className="text-sm font-semibold">${product.price?.toFixed(2)}</p>
              </div>
            </div>
            <
// @ts-ignore
            Button
              onClick={() => addItem(product)}
              size="sm"
              className="rounded-full px-6 h-9 text-xs font-semibold whitespace-nowrap"
            >
              Add to Sanctuary
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}