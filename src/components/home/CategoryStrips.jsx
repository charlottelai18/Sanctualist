// @ts-ignore
import React from 'react';
// @ts-ignore
import { Link } from 'react-router-dom';
// @ts-ignore
import { motion } from 'framer-motion';
// @ts-ignore
import { Maximize2, Sparkles, Clock } from 'lucide-react';

const categories = [
  {
    key: 'small_space_hacks',
    icon: Maximize2,
    title: 'Small Space Hacks',
    description: 'Maximize every inch of your bathroom with clever storage that fits anywhere.',
  },
  {
    key: 'deep_clean_gadgets',
    icon: Sparkles,
    title: 'Deep Clean Gadgets',
    description: 'Power tools for spotless surfaces without the scrubbing fatigue.',
  },
  {
    key: 'morning_routine',
    icon: Clock,
    title: 'Morning Routine Speed-ups',
    description: 'Streamline your daily ritual from chaos to calm in under 10 minutes.',
  },
];

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function CategoryStrips() {
  return (
    <section className="py-20 lg:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3"
        >
          Shop by solution
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-2xl md:text-4xl italic mb-12"
        >
          What's your frustration?
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="grid md:grid-cols-3 gap-4"
        >
          {categories.map(cat => (
            <motion.div key={cat.key} variants={item}>
              <Link
                to={`/shop?category=${cat.key}`}
                className="group block p-8 rounded-lg border border-border bg-card hover:border-accent hover:bg-accent/10 transition-all duration-500"
              >
                <cat.icon className="w-6 h-6 mb-4 text-muted-foreground group-hover:text-accent-foreground transition-colors" />
                <h3 className="text-base font-semibold mb-2">{cat.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{cat.description}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}