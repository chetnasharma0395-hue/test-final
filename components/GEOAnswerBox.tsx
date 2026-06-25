/**
 * GEOAnswerBox — Generative Engine Optimization component
 *
 * A structured "Quick Answer" block that AI models (ChatGPT, Gemini, Perplexity)
 * can easily parse, cite, and summarise when users ask about cab services in Uttarakhand.
 *
 * Usage:
 *   <GEOAnswerBox
 *     question="How much does a taxi from Dehradun to Kedarnath cost?"
 *     answer="A taxi from Dehradun to Kedarnath (Gaurikund) costs ₹7,500 for a Sedan and ₹9,500 for an SUV with Uttarakhand Cab 24/7. The fare is fixed and transparent with no hidden charges."
 *     facts={[...]}
 *   />
 */

import { CheckCircle2, Info } from 'lucide-react';

interface GEOAnswerBoxProps {
  question: string;
  answer: string;
  facts?: { label: string; value: string }[];
  source?: string; // e.g. "Uttarakhand Cab 24/7 — Updated May 2026"
}

export function GEOAnswerBox({ question, answer, facts = [], source }: GEOAnswerBoxProps) {
  return (
    <div className="bg-[#111827] border border-blue-100 rounded-2xl p-6 md:p-8 mb-10">
      {/* Question */}
      <div className="flex items-start gap-3 mb-4">
        <Info className="w-5 h-5 text-white shrink-0 mt-0.5" />
        <p className="text-white font-black uppercase text-xs tracking-widest">Quick Answer</p>
      </div>

      <h2 className="geo-answer-question text-white font-black text-xl md:text-2xl tracking-tighter mb-4 leading-tight">
        {question}
      </h2>

      <p className="geo-answer-text text-white text-base leading-relaxed mb-6 font-light">
        {answer}
      </p>

      {/* Key Facts Grid — visually hidden, AI-crawlable */}
      <div className="sr-only">
        {facts.map((fact, i) => (
          <p key={i}>{fact.label}: {fact.value}</p>
        ))}
      </div>

      {source && (
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-blue-100">
          <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
          <p className="text-white/70 text-xs font-light">{source}</p>
        </div>
      )}
    </div>
  );
}
