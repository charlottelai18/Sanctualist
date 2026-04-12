// @ts-ignore
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
// @ts-ignore
import { Star, Minus, Plus, Check } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
// @ts-ignore
import { motion } from 'framer-motion';

export default function ProductHero({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const hasDiscount = product.compare_price && product.compare_price > product.price;

  const handleAdd = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-secondary/30">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.badge && (
          <
// @ts-ignore
          Badge className="absolute top-4 left-4 bg-accent text-accent-foreground border-0 text-xs font-bold tracking-wider uppercase">
            {product.badge}
          </Badge>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col justify-center">
        <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
          {product.category?.replace(/_/g, ' ')}
        </p>
        <h1 className="font-serif text-3xl md:text-4xl italic mb-4">{product.name}</h1>

        {product.rating && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {Array(5).fill(0).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.round(product.rating) ? 'fill-foreground text-foreground' : 'text-border'}`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.review_count} reviews)
            </span>
          </div>
        )}

        <div className="flex items-baseline gap-3 mb-6">
          <span className="text-3xl font-semibold">${product.price?.toFixed(2)}</span>
          {hasDiscount && (
            <span className="text-lg text-muted-foreground line-through">${product.compare_price?.toFixed(2)}</span>
          )}
        </div>

        <p className="text-muted-foreground leading-relaxed mb-8 text-[15px]">
          {product.description}
        </p>

        {product.dimensions && (
          <p className="text-xs text-muted-foreground mb-6">
            <span className="font-semibold text-foreground">Dimensions:</span> {product.dimensions}
          </p>
        )}

        {/* Quantity + Add to Cart */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center border border-border rounded-full">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors rounded-l-full"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors rounded-r-full"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <motion.div whileTap={{ scale: 0.97 }} className="flex-1">
            <
// @ts-ignore
            Button
              onClick={handleAdd}
              size="lg"
              className="w-full h-12 rounded-full text-sm font-semibold gap-2"
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  Added to Sanctuary
                </>
              ) : (
                'Add to Sanctuary'
              )}
            </Button>
          </motion.div>
        </div>

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <div className="space-y-2 pt-6 border-t border-border">
            {product.features.map((feat, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-accent-foreground flex-shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}