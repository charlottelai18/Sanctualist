// @ts-ignore
import React, { useState } from 'react';
// @ts-ignore
import { motion, AnimatePresence } from 'framer-motion';
// @ts-ignore
import { Plus, Minus } from 'lucide-react';
// @ts-ignore
import MagneticFooter from '@/components/layout/MagneticFooter';

const faqs = [
  {
    category: 'Orders & Shipping',
    items: [
      {
        q: 'How long does shipping take?',
        a: 'Standard shipping takes 5–10 business days. Express shipping (2–4 business days) is available at checkout for an additional fee. All orders are processed within 1–2 business days.',
      },
      {
        q: 'Do you offer free shipping?',
        a: 'Yes! All orders over $75 qualify for free standard shipping. Your cart will automatically show the progress toward your free shipping threshold.',
      },
      {
        q: 'Can I change or cancel my order after placing it?',
        a: 'We process orders quickly, but if you need to make a change, contact us within 2 hours of placing your order. After that, we cannot guarantee modifications as your order may already be in fulfillment.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'Currently we ship within the United States only. We are working on expanding to Canada and the UK — stay tuned!',
      },
    ],
  },
  {
    category: 'Returns & Refunds',
    items: [
      {
        q: 'What is your return policy?',
        a: 'We offer a 30-day hassle-free return policy. If you are not completely satisfied with your purchase, contact us and we will arrange a return. Items must be in their original, unused condition and packaging.',
      },
      {
        q: 'How do I start a return?',
        a: 'Email us at returns@sanctuary.store with your order number and reason for return. We will send you a prepaid return shipping label within 24 hours.',
      },
      {
        q: 'When will I receive my refund?',
        a: 'Once we receive your returned item, refunds are processed within 3–5 business days. You will receive a confirmation email when your refund is issued. It may take an additional 5–7 days to appear on your statement depending on your bank.',
      },
    ],
  },
  {
    category: 'Products',
    items: [
      {
        q: 'Are your products safe for all bathroom surfaces?',
        a: 'Yes. All our cleaning gadgets are tested and certified safe for porcelain, ceramic tile, glass, chrome, acrylic, and natural stone. Always check the individual product page for specific surface compatibility.',
      },
      {
        q: 'Do the adhesive or magnetic products damage walls?',
        a: 'Our magnetic and suction-based products are designed to be renter-friendly and remove cleanly without leaving marks. We do not recommend any products that require permanent drilling unless otherwise stated.',
      },
      {
        q: 'How do I know which products are right for my bathroom size?',
        a: 'Every product page includes precise dimensions and a "designed for small spaces" indicator if applicable. Our Small Space Hacks category is specifically curated for apartments and compact bathrooms.',
      },
      {
        q: 'Are replacement parts or accessories available?',
        a: 'Yes! Replacement brush heads, refill bottles, and accessory kits are available in our shop. Check the individual product pages for compatible accessories.',
      },
    ],
  },
  {
    category: 'Payments & Security',
    items: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit and debit cards (Visa, Mastercard, American Express), as well as PayPal and Apple Pay.',
      },
      {
        q: 'Is my payment information secure?',
        a: 'Absolutely. All transactions are encrypted using industry-standard SSL technology. We never store your full payment details on our servers.',
      },
    ],
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span className="text-sm font-medium group-hover:text-muted-foreground transition-colors">{q}</span>
        <span className="flex-shrink-0">
          {open ? <Minus className="w-4 h-4 text-muted-foreground" /> : <Plus className="w-4 h-4 text-muted-foreground" />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-muted-foreground leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-16 lg:py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
            Support
          </p>
          <h1 className="font-serif text-3xl md:text-5xl italic mb-4">
            Frequently asked questions
          </h1>
          <p className="text-muted-foreground text-sm mb-16 leading-relaxed">
            Can't find your answer here? Email us at{' '}
            <a href="mailto:hello@sanctuary.store" className="underline underline-offset-2 hover:text-foreground transition-colors">
              hello@sanctuary.store
            </a>
          </p>
        </motion.div>

        <div className="space-y-12">
          {faqs.map((section, i) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <h2 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
                {section.category}
              </h2>
              <div className="rounded-xl border border-border bg-card px-6">
                {section.items.map(item => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <MagneticFooter />
    </div>
  );
}