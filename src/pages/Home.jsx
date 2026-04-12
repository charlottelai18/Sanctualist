// @ts-ignore
import React from 'react';
import TransformationHero from '@/components/home/TransformationHero';
import CategoryStrips from '@/components/home/CategoryStrips';
// @ts-ignore
import FeaturedProducts from '@/components/home/FeaturedProducts';
import SocialProofBanner from '@/components/home/SocialProofBanner';
import BathroomQuiz from '@/components/home/BathroomQuiz';
// @ts-ignore
import MagneticFooter from '@/components/layout/MagneticFooter';

export default function Home() {
  return (
    <div>
      <TransformationHero />
      <SocialProofBanner />
      <CategoryStrips />
      <BathroomQuiz />
      <FeaturedProducts />
      <MagneticFooter />
    </div>
  );
}