'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
}

export function FAQSection({ faqs, title }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="w-full">
      {/* Optional Title (Uses 2026 High-Contrast Typography) */}
      {title && (
        <h2 className="font-heading font-black text-2xl md:text-3xl text-white mb-8 uppercase tracking-tighter">
          {title}
        </h2>
      )}
      
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <motion.div 
              key={index} 
              className={`border transition-all duration-300 overflow-hidden ${
                isOpen 
                  ? 'bg-[#1A1A1A] border-[#F7941D]/30 shadow-[0_10px_30px_rgba(247,148,29,0.05)] rounded-[1.5rem]' 
                  : 'bg-[#1A1A1A] border-transparent hover:border-white/10 rounded-[1.5rem]'
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left group"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
              >
                <span className={`font-black text-sm md:text-base uppercase tracking-tighter transition-colors pr-4 ${
                  isOpen ? 'text-[#F7941D]' : 'text-white group-hover:text-[#F7941D]'
                }`}>
                  {faq.question}
                </span>
                
                {/* 2026 Icon Enclosure & Rotation */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                  isOpen ? 'bg-[#F7941D]/10' : 'bg-[#1A1A1A] shadow-sm'
                }`}>
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#F7941D]' : 'text-white group-hover:text-[#F7941D]'
                    }`} 
                  />
                </div>
              </button>
              
              {/* Buttery Smooth Framer Motion Accordion */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-panel-${index}`}
                    role="region"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="px-6 pb-6 pt-2 text-white/70 font-light leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
