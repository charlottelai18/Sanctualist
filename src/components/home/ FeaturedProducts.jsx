import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import ProductCard from '@/components/shop/ProductCard';
import { ArrowRight } from 'lucide-react';

export default function FeaturedProducts() {
  const { data: products = [] } = useQuery({
    queryKey: ['products-featured'],
    queryFn: () => base44.entities.Product.list('-created_date', 4),
  });

  if (products.length === 0) return null;

  return (
    <section className="py-20 lg:py-28 px-6 bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
              Curated picks
            </p>
            <h2 className="font-serif text-2xl md:text-4xl italic">
              Best sellers
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden md:flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            View all
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <div className="md:hidden mt-8 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            View all products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}