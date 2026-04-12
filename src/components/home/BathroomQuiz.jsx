// @ts-ignore
import React, { useState } from 'react';
// @ts-ignore
import { motion, AnimatePresence } from 'framer-motion';
// @ts-ignore
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
// @ts-ignore
import { Link } from 'react-router-dom';
// @ts-ignore
import { ArrowRight, RotateCcw, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/CartContext';

const questions = [
  {
    id: 'problem',
    question: "What's your biggest bathroom frustration?",
    options: [
      { value: 'clutter', label: 'Everything is scattered everywhere', emoji: '🌪️' },
      { value: 'cleaning', label: 'Cleaning takes way too long', emoji: '🧹' },
      { value: 'space', label: 'I have almost no storage space', emoji: '📦' },
      { value: 'routine', label: 'My morning routine is chaotic', emoji: '⏰' },
    ],
  },
  {
    id: 'living',
    question: 'How would you describe your bathroom?',
    options: [
      { value: 'tiny', label: 'Tiny — barely fits one person', emoji: '🏠' },
      { value: 'shared', label: 'Shared with family or roommates', emoji: '👥' },
      { value: 'medium', label: 'Medium sized but still messy', emoji: '🚿' },
      { value: 'rental', label: "Renting — can't drill walls", emoji: '🔑' },
    ],
  },
  {
    id: 'priority',
    question: 'What matters most to you?',
    options: [
      { value: 'speed', label: 'Getting ready faster in the morning', emoji: '⚡' },
      { value: 'clean', label: 'Surfaces that stay spotless longer', emoji: '✨' },
      { value: 'organised', label: 'A tidy, organised look', emoji: '🗂️' },
      { value: 'easy', label: 'Less effort when cleaning', emoji: '😌' },
    ],
  },
  {
    id: 'budget',
    question: "What's your budget for a bathroom upgrade?",
    options: [
      { value: 'low', label: 'Under $25 — quick fix', emoji: '💚' },
      { value: 'mid', label: '$25–$50 — solid investment', emoji: '💛' },
      { value: 'high', label: '$50+ — full transformation', emoji: '🏆' },
      { value: 'any', label: "Price doesn't matter, I want the best", emoji: '👑' },
    ],
  },
];

// Scoring map: each answer boosts certain categories
const categoryScores = {
  // problem
  clutter:     { storage_solutions: 3, small_space_hacks: 2 },
  cleaning:    { deep_clean_gadgets: 3, morning_routine: 1 },
  space:       { small_space_hacks: 3, storage_solutions: 2 },
  routine:     { morning_routine: 3, storage_solutions: 1 },
  // living
  tiny:        { small_space_hacks: 3, storage_solutions: 1 },
  shared:      { storage_solutions: 2, morning_routine: 2 },
  medium:      { storage_solutions: 2, deep_clean_gadgets: 1 },
  rental:      { small_space_hacks: 3 },
  // priority
  speed:       { morning_routine: 3, storage_solutions: 1 },
  clean:       { deep_clean_gadgets: 3 },
  organised:   { storage_solutions: 3, small_space_hacks: 1 },
  easy:        { deep_clean_gadgets: 2, morning_routine: 2 },
  // budget
  low:         { morning_routine: 1, storage_solutions: 1 },
  mid:         { small_space_hacks: 1, deep_clean_gadgets: 1 },
  high:        { small_space_hacks: 2, deep_clean_gadgets: 2 },
  any:         { storage_solutions: 2, deep_clean_gadgets: 2 },
};

const whyItHelps = {
  clutter:   'Directly tackles your clutter problem by giving every item its own place.',
  cleaning:  'Cuts your cleaning time dramatically with smart design.',
  space:     'Designed to make the most out of limited space.',
  routine:   'Streamlines your morning so you can get ready faster.',
  tiny:      'Built specifically for small bathrooms with tight dimensions.',
  shared:    "Great for shared bathrooms — keeps everyone's things separate.",
  medium:    'Transforms a medium bathroom into something that actually works.',
  rental:    'No drilling needed — perfect for renters.',
  speed:     'Speeds up your daily routine instantly.',
  clean:     'Keeps surfaces cleaner for longer with minimal effort.',
  organised: 'Brings visual order and calm to your bathroom.',
  easy:      'Less scrubbing, less effort — same (better) result.',
  low:       'Exceptional value — big impact on a small budget.',
  mid:       'A smart mid-range upgrade that pays for itself in time saved.',
  high:      'A serious investment in your daily comfort and sanity.',
  any:       'The best of the best, exactly what your bathroom deserves.',
};

function getRecommendations(answers, products) {
  const scores = {};
  products.forEach(p => { scores[p.id] = 0; });

  Object.values(answers).forEach(answer => {
    const boosts = categoryScores[answer] || {};
    products.forEach(p => {
      if (boosts[p.category]) {
        scores[p.id] = (scores[p.id] || 0) + boosts[p.category];
      }
    });
  });

  return [...products]
    .sort((a, b) => (scores[b.id] || 0) - (scores[a.id] || 0))
    .slice(0, 3);
}

function getTopAnswer(answers) {
  // Return the most "impactful" answer for the why-it-helps label
  return Object.values(answers)[0] || 'organised';
}

export default function BathroomQuiz() {
  const [step, setStep] = useState(0); // 0 = intro, 1-4 = questions, 5 = results
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const { addItem } = useCart();

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    // @ts-ignore
    queryFn: () => base44.entities.Product.list('-created_date', 50),
  });

  const currentQ = questions[step - 1];
  const isResults = step === questions.length + 1;
  const recommendations = isResults ? getRecommendations(answers, products) : [];
  const topAnswer = getTopAnswer(answers);

  const handleSelect = (value) => setSelected(value);

  const handleNext = () => {
    if (!selected) return;
    const newAnswers = { ...answers, [currentQ.id]: selected };
    setAnswers(newAnswers);
    setSelected(null);
    setStep(s => s + 1);
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({});
    setSelected(null);
  };

  const progress = step === 0 ? 0 : Math.min(((step) / questions.length) * 100, 100);

  return (
    <section className="py-20 lg:py-28 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
            Personalised for you
          </p>
          <h2 className="font-serif text-2xl md:text-4xl italic">
            Find your bathroom solution
          </h2>
        </motion.div>

        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
          {/* Progress bar */}
          {step > 0 && !isResults && (
            <div className="h-0.5 bg-secondary">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
          )}

          <div className="p-8 md:p-10">
            <AnimatePresence mode="wait">

              {/* INTRO */}
              {step === 0 && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-accent/30 flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl">🛁</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">4 questions. Perfect products.</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-sm mx-auto">
                    Tell us about your bathroom situation and we'll recommend the 3 products that'll make the biggest difference for you.
                  </p>
                  <
// @ts-ignore
                  Button
                    onClick={() => setStep(1)}
                    size="lg"
                    className="rounded-full h-12 px-8 gap-2 group"
                  >
                    Start the quiz
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              )}

              {/* QUESTIONS */}
              {step > 0 && !isResults && currentQ && (
                <motion.div
                  key={`q-${step}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
                    Question {step} of {questions.length}
                  </p>
                  <h3 className="text-lg md:text-xl font-semibold mb-6">{currentQ.question}</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {currentQ.options.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => handleSelect(opt.value)}
                        className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-200 ${
                          selected === opt.value
                            ? 'border-primary bg-primary/5 ring-1 ring-primary'
                            : 'border-border bg-background hover:border-foreground/30 hover:bg-secondary/50'
                        }`}
                      >
                        <span className="text-xl flex-shrink-0">{opt.emoji}</span>
                        <span className="text-sm font-medium leading-snug">{opt.label}</span>
                        {selected === opt.value && (
                          <Check className="w-4 h-4 ml-auto text-primary flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    {step > 1 ? (
                      <button
                        onClick={() => { setStep(s => s - 1); setSelected(answers[questions[step - 2]?.id] || null); }}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        ← Back
                      </button>
                    ) : <div />}
                    <
// @ts-ignore
                    Button
                      onClick={handleNext}
                      disabled={!selected}
                      className="rounded-full h-10 px-6 gap-2 group"
                    >
                      {step === questions.length ? 'See my results' : 'Next'}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* RESULTS */}
              {isResults && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="text-center mb-8">
                    <div className="w-12 h-12 rounded-full bg-accent/30 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">✨</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Your personalised picks</h3>
                    <p className="text-sm text-muted-foreground">
                      Based on your answers, these 3 products will transform your bathroom.
                    </p>
                  </div>

                  <div className="space-y-4 mb-8">
                    {recommendations.map((product, i) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex gap-4 p-4 rounded-xl border border-border bg-background hover:border-accent transition-colors"
                      >
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded-lg border border-border flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="text-sm font-semibold leading-snug">{product.name}</h4>
                            <span className="text-sm font-semibold flex-shrink-0">${product.price?.toFixed(2)}</span>
                          </div>
                          <p className="text-xs text-accent-foreground font-medium mb-1.5">
                            Why it helps: {whyItHelps[topAnswer]}
                          </p>
                          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                            {product.description}
                          </p>
                          <div className="flex items-center gap-2">
                            <Link to={`/product/${product.id}`}>
                              <
// @ts-ignore
                              Button size="sm" variant="outline" className="h-7 px-3 text-xs rounded-full">
                                View Details
                              </Button>
                            </Link>
                            <
// @ts-ignore
                            Button
                              size="sm"
                              className="h-7 px-3 text-xs rounded-full gap-1"
                              onClick={() => addItem(product)}
                            >
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="text-center">
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Retake the quiz
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}