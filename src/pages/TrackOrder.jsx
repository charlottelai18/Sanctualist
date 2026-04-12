// @ts-ignore
import React, { useState } from 'react';
// @ts-ignore
import { motion, AnimatePresence } from 'framer-motion';
// @ts-ignore
import { Search, Package, Truck, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { base44 } from '@/api/base44Client';
// @ts-ignore
import MagneticFooter from '@/components/layout/MagneticFooter';

const statusSteps = [
  { key: 'pending', label: 'Order Placed', icon: Clock },
  { key: 'confirmed', label: 'Confirmed', icon: CheckCircle },
  { key: 'shipped', label: 'Shipped', icon: Truck },
  { key: 'delivered', label: 'Delivered', icon: Package },
];

const statusIndex = { pending: 0, confirmed: 1, shipped: 2, delivered: 3 };

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!orderId.trim() || !email.trim()) return;
    setLoading(true);
    setError('');
    setOrder(null);

    const results = await base44.entities.Order.filter({ id: orderId.trim() });
    const found = results?.[0];

    if (!found) {
      setError('No order found with that ID. Please double-check and try again.');
    } else if (found.shipping_address?.email?.toLowerCase() !== email.trim().toLowerCase()) {
      setError('The email address does not match our records for this order.');
    } else {
      setOrder(found);
    }
    setLoading(false);
  };

  const currentStep = order ? statusIndex[order.status] ?? 0 : 0;

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-6 py-16 lg:py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
            Order Status
          </p>
          <h1 className="font-serif text-3xl md:text-5xl italic mb-4">
            Track your order
          </h1>
          <p className="text-muted-foreground text-sm mb-12 leading-relaxed">
            Enter your order ID and the email address used at checkout to see your order status.
          </p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleTrack} className="space-y-4 mb-10">
          <div>
            <label className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2 block">
              Order ID
            </label>
            <Input
              // @ts-ignore
              value={orderId}
              onChange={e => setOrderId(e.target.value)}
              placeholder="e.g. abc123def456"
              className="h-12 rounded-lg text-sm"
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2 block">
              Email Address
            </label>
            <Input
              // @ts-ignore
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-12 rounded-lg text-sm"
              required
            />
          </div>
          <
// @ts-ignore
          Button type="submit" disabled={loading} className="w-full h-12 rounded-full text-sm font-semibold gap-2">
            <Search className="w-4 h-4" />
            {loading ? 'Searching...' : 'Track Order'}
          </Button>
        </form>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-3 p-4 rounded-xl border border-destructive/30 bg-destructive/5 text-sm text-destructive mb-8"
            >
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result */}
        <AnimatePresence>
          {order && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-xl border border-border bg-card overflow-hidden"
            >
              {/* Order header */}
              <div className="p-6 border-b border-border">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-1">Order ID</p>
                    <p className="text-sm font-mono font-semibold">{order.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground font-medium mb-1">Total</p>
                    <p className="text-sm font-semibold">${order.total?.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Status tracker */}
              <div className="p-6 border-b border-border">
                <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-6">
                  Delivery Status
                </p>
                <div className="relative">
                  {/* Progress line */}
                  <div className="absolute top-4 left-4 right-4 h-0.5 bg-border" />
                  <div
                    className="absolute top-4 left-4 h-0.5 bg-accent-foreground transition-all duration-700"
                    style={{ width: `${(currentStep / (statusSteps.length - 1)) * 100}%` }}
                  />
                  <div className="relative flex justify-between">
                    {statusSteps.map((step, i) => {
                      const done = i <= currentStep;
                      const Icon = step.icon;
                      return (
                        <div key={step.key} className="flex flex-col items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 z-10 ${
                            done
                              ? 'bg-primary border-primary text-primary-foreground'
                              : 'bg-background border-border text-muted-foreground'
                          }`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <span className={`text-[10px] font-medium text-center leading-tight ${done ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Items */}
              {order.items && order.items.length > 0 && (
                <div className="p-6">
                  <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
                    Items
                  </p>
                  <div className="space-y-3">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        {item.image_url && (
                          <img src={item.image_url} alt={item.name} className="w-10 h-10 rounded-lg object-cover border border-border flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <MagneticFooter />
    </div>
  );
}