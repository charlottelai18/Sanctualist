// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Truck, Shield, RotateCcw } from 'lucide-react';

const stats = [
  { icon: Star, value: '4.9', label: 'Avg. Rating' },
  { icon: Truck, value: '12K+', label: 'Orders Shipped' },
  { icon: Shield, value: '100%', label: 'Quality Guaranteed' },
  { icon: RotateCcw, value: '30-Day', label: 'Free Returns' },
];

export default function SocialProofBanner() {
  return (
    <section className="py-16 px-6 border-y border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center"
            >
              <stat.icon className="w-5 h-5 mx-auto mb-3 text-muted-foreground" />
              <p className="text-2xl md:text-3xl font-semibold tracking-tight">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}