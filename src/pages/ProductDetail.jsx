// @ts-ignore
import React from 'react';
// @ts-ignore
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import ProductHero from '@/components/product/ProductHero';
import ProblemSolution from '@/components/product/ProblemSolution';
import StickyBuyBar from '@/components/product/StickyBuyBar';
// @ts-ignore
import MagneticFooter from '@/components/layout/MagneticFooter';
import { Skeleton } from '@/components/ui/skeleton';
// @ts-ignore
import { ArrowLeft } from 'lucide-react';
// @ts-ignore
import { Link } from 'react-router-dom';

export default function ProductDetail() {
  // @ts-ignore
  const urlParams = new URLSearchParams(window.location.search);
  const path = window.location.pathname;
  const productId = path.split('/product/')[1];

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => base44.entities.Product.filter({ id: productId }),
    select: (data) => data?.[0],
    enabled: !!productId,
  });

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-16">
          <Skeleton className="aspect-square rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <p className="text-muted-foreground mb-4">Product not found.</p>
        <Link to="/shop" className="text-sm font-medium underline underline-offset-2">
          Back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-8 lg:py-16">
        <Link
          to="/shop"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to shop
        </Link>

        <ProductHero product={product} />
        <ProblemSolution frustration={product.frustration} freedom={product.freedom} />

        {/* Long description */}
        {product.long_description && (
          <div className="py-12 border-t border-border">
            <h3 className="font-serif text-xl italic mb-4">Details</h3>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">{product.long_description}</p>
          </div>
        )}
      </div>

      <StickyBuyBar product={product} />
      <MagneticFooter />
    </div>
  );
}