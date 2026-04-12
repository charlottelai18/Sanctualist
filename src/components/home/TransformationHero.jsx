// @ts-nocheck
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BEFORE_IMG = 'https://media.base44.com/images/public/69d359d545cce55cd5beff20/d8d10daed_generated_ff705958.png';
const AFTER_IMG = 'https://media.base44.com/images/public/69d359d545cce55cd5beff20/8ba773229_generated_61b41ba3.png';

export default function TransformationHero() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(5, Math.min(95, x)));
  };

  const handleMouseDown = () => { dragging.current = true; };
  const handleMouseUp = () => { dragging.current = false; };
  const handleMouseMove = (e) => { if (dragging.current) handleMove(e.clientX); };
  const handleTouchMove = (e) => { handleMove(e.touches[0].clientX); };

  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-screen flex flex-col">
      {/* Slider area */}
      <div
        ref={containerRef}
        className="relative flex-1 overflow-hidden cursor-col-resize select-none"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        onTouchMove={handleTouchMove}
      >
        {/* After image (full) */}
        <img
          src={AFTER_IMG}
          alt="Organized bathroom"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Before image (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={BEFORE_IMG}
            alt="Messy bathroom"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ width: `${(100 / sliderPos) * 100}%`, maxWidth: 'none' }}
          />
          {/* Before label */}
          <div className="absolute top-8 left-6 bg-foreground/80 backdrop-blur-md text-background px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase">
            Before
          </div>
        </div>

        {/* After label */}
        <div className="absolute top-8 right-6 bg-accent/90 backdrop-blur-md text-accent-foreground px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase">
          After
        </div>

        {/* Slider handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-background/90 shadow-lg"
          style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background shadow-xl flex items-center justify-center border-2 border-border">
            <div className="flex gap-0.5">
              <div className="w-0.5 h-4 bg-muted-foreground rounded-full" />
              <div className="w-0.5 h-4 bg-muted-foreground rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Content overlay */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/90 to-transparent pt-20 pb-8 lg:pb-12 px-6"
      >
        <div className="max-w-2xl">
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl italic leading-tight mb-4">
            Transform your<br />bathroom sanctuary
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-md mb-6 leading-relaxed">
            Clever organization and cleaning gadgets for people who believe a tidy space is a tidy mind.
          </p>
          <Link to="/shop">
            <Button size="lg" className="h-12 px-8 rounded-full text-sm font-semibold gap-2 group">
              Shop the Solution
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}