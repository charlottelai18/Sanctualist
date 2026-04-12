// @ts-nocheck
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/lib/CartContext';
import { Plus, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const { addItem } = useCart();

  const hasDiscount = product.compare_price && product.compare_price > product.price;
  const discount = hasDiscount
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : 0;

  return (
    <div
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-secondary/30">
          <img
            src={hovered && product.image_hover_url ? product.image_hover_url : product.image_url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full">
              {product.badge}
            </span>
          )}
          {hasDiscount && (
            <span className="absolute top-3 right-3 bg-foreground text-background text-[10px] font-bold px-2 py-1 rounded-full">
              -{discount}%
            </span>
          )}
        </div>
      </Link>

      <div className="mt-3 flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <Link to={`/product/${product.id}`}>
            <h3 className="text-sm font-medium truncate hover:underline underline-offset-2">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center gap-1.5 mt-1">
            {product.rating && (
              <div className="flex items-center gap-0.5">
                <Star className="w-3 h-3 fill-foreground text-foreground" />
                <span className="text-xs font-medium">{product.rating}</span>
              </div>
            )}
            {product.review_count && (
              <span className="text-xs text-muted-foreground">({product.review_count})</span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-semibold">${product.price?.toFixed(2)}</span>
            {hasDiscount && (
              <span className="text-xs text-muted-foreground line-through">${product.compare_price?.toFixed(2)}</span>
            )}
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.preventDefault();
            addItem(product);
          }}
          className="mt-1 w-8 h-8 flex items-center justify-center rounded-full border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
        >
          <Plus className="w-3.5 h-3.5" />
        </motion.button>
      </div>
    </div>
  );
}