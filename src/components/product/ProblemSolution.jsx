// @ts-ignore
import React from 'react';
// @ts-ignore
import { motion } from 'framer-motion';
// @ts-ignore
import { Frown, Smile } from 'lucide-react';

export default function ProblemSolution({ frustration, freedom }) {
  if (!frustration && !freedom) return null;

  return (
    <section className="py-16">
      <div className="grid md:grid-cols-2 gap-4">
        {frustration && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-xl border border-border bg-secondary/50"
          >
            <Frown className="w-6 h-6 text-muted-foreground mb-4" />
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">
              The Frustration
            </p>
            <p className="text-foreground leading-relaxed">{frustration}</p>
          </motion.div>
        )}
        {freedom && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-xl border border-accent bg-accent/20"
          >
            <Smile className="w-6 h-6 text-accent-foreground mb-4" />
            <p className="text-xs font-semibold tracking-widest uppercase text-accent-foreground mb-2">
              The Freedom
            </p>
            <p className="text-foreground leading-relaxed">{freedom}</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}