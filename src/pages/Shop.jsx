// @ts-ignore
import React, { useState, useMemo } from 'react';
// @ts-ignore
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import ProductCard from '@/components/shop/ProductCard';
// @ts-ignore
import MagneticFooter from '@/components/layout/MagneticFooter';
// @ts-ignore
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

const categories = [
  { key: 'all', label: 'All Products' },
  { key: 'small_space_hacks', label: 'Small Space Hacks' },
  { key: 'deep_clean_gadgets', label: 'Deep Clean Gadgets' },
  { key: 'morning_routine', label: 'Morning Routine' },
  { key: 'storage_solutions', label: 'Storage Solutions' },
];

export default function Shop() {
  const urlParams = new URLSearchParams(window.location.search);
  const initialCat = urlParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState(initialCat);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    // @ts-ignore
    queryFn: () => base44.entities.Product.list('-created_date', 50),
  });

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return products;
    return products.filter(p => p.category === activeCategory);
  }, [products, activeCategory]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="px-6 pt-12 pb-8 lg:pt-16 lg:pb-12">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
            The Solution Matrix
          </p>
          <h1 className="font-serif text-3xl md:text-5xl italic mb-8">
            Shop by frustration
          </h1>

          {/* Category filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 border ${
                  activeCategory === cat.key
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {Array(8).fill(0).map((_, i) => (
                <div key={i}>
                  <Skeleton className="aspect-square rounded-lg" />
                  <Skeleton className="h-4 w-3/4 mt-3" />
                  <Skeleton className="h-3 w-1/2 mt-2" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No products found in this category yet.</p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((product, i) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      <MagneticFooter />
    </div>
  );
}