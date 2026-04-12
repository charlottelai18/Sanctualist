// @ts-ignore
import React from 'react';
// @ts-ignore
import { motion } from 'framer-motion';
// @ts-ignore
import { Droplets, Leaf, Heart, ArrowRight } from 'lucide-react';
// @ts-ignore
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
// @ts-ignore
import MagneticFooter from '@/components/layout/MagneticFooter';

const values = [
  {
    icon: Droplets,
    title: 'Effortless Clean',
    description: 'Every product we curate is tested to save you time, effort, and frustration in your daily cleaning routine.',
  },
  {
    icon: Leaf,
    title: 'Mindful Living',
    description: 'We believe a tidy space creates a tidy mind. Our tools help you build sustainable habits without the overwhelm.',
  },
  {
    icon: Heart,
    title: 'Made for Small Spaces',
    description: 'Whether it\'s a studio apartment or a shared bathroom, every product is designed to maximize minimal space.',
  },
];

export default function About() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
            Our philosophy
          </p>
          <h1 className="font-serif text-3xl md:text-5xl italic leading-tight mb-8">
            Your bathroom is a sanctuary,<br />not a storage closet.
          </h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mb-16">
            We started Sanctuary because we were tired of bathrooms that felt chaotic, cluttered, and stressful. 
            We curate clever gadgets and organization tools that transform your most-used room into a place of calm 
            and efficiency — especially for those of us in compact living spaces.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {values.map((val, i) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl border border-border"
            >
              <val.icon className="w-5 h-5 mb-4 text-accent-foreground" />
              <h3 className="text-sm font-semibold mb-2">{val.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{val.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Shipping & Returns */}
        <div className="space-y-12 mb-20">
          <div>
            <h2 className="font-serif text-2xl italic mb-4">Shipping</h2>
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>We offer free standard shipping on all orders over $75. Standard delivery takes 5–10 business days.</p>
              <p>Express shipping is available at checkout for an additional fee, with delivery in 2–4 business days.</p>
              <p>All orders include tracking information sent to your email once your package ships.</p>
            </div>
          </div>
          <div>
            <h2 className="font-serif text-2xl italic mb-4">Returns</h2>
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>We offer a 30-day hassle-free return policy. If you're not satisfied with your purchase, simply reach out to our team.</p>
              <p>Items must be in their original condition and packaging. We'll provide a prepaid return label for your convenience.</p>
            </div>
          </div>
        </div>

        <div className="text-center py-12 border-t border-border">
          <h3 className="font-serif text-2xl italic mb-4">Ready to transform your space?</h3>
          <Link to="/shop">
            <
// @ts-ignore
            Button size="lg" className="rounded-full h-12 px-8 gap-2 group">
              Browse Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>

      <MagneticFooter />
    </div>
  );
}