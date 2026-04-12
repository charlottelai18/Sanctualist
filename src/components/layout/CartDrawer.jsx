import React from 'react';
import { useCart } from '@/lib/CartContext';
import { X, Plus, Minus, Trash2, Truck, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

export default function CartDrawer() {
  const {
    items, removeItem, updateQuantity, total, isOpen, setIsOpen,
    shippingProgress, freeShipping, FREE_SHIPPING_THRESHOLD
  } = useCart();

  const remaining = FREE_SHIPPING_THRESHOLD - total;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-background/95 backdrop-blur-xl border-l border-border z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-serif text-xl italic">Your Sanctuary</h2>
              <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="px-6 py-4 border-b border-border">
              <div className="flex items-center gap-2 mb-2">
                {freeShipping ? <Gift className="w-4 h-4 text-accent-foreground" /> : <Truck className="w-4 h-4 text-muted-foreground" />}
                <span className="text-xs font-medium">
                  {freeShipping
                    ? 'You unlocked free shipping!'
                    : `$${remaining.toFixed(2)} away from free shipping`
                  }
                </span>
              </div>
              <Progress value={shippingProgress} className="h-1.5" />
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <p className="text-muted-foreground text-sm">Your sanctuary awaits.</p>
                  <p className="text-muted-foreground text-xs mt-1">Add items to begin your transformation.</p>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.product_id} className="flex gap-4 p-3 rounded-lg border border-border bg-card">
                    <img src={item.image_url} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">{item.name}</h4>
                      <p className="text-sm font-semibold mt-0.5">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center rounded border border-border hover:bg-secondary transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center rounded border border-border hover:bg-secondary transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeItem(item.product_id)}
                          className="ml-auto w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Subtotal</span>
                  <span className="text-lg font-semibold">${total.toFixed(2)}</span>
                </div>
                {freeShipping && (
                  <p className="text-xs text-accent-foreground font-medium">Free shipping included</p>
                )}
                <Button className="w-full h-12 text-sm font-semibold rounded-lg" size="lg">
                  Checkout — ${total.toFixed(2)}
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}