/**
 * fare-rates.ts — fare lookup used by the FareCalculator component.
 *
 * SINGLE SOURCE OF TRUTH: lib/priceData.ts
 * Overlapping routes are derived directly from PRICING_DATA so the calculator
 * can never drift from the rest of the site. Calculator-only routes (not present
 * in priceData) are listed explicitly in EXTRA_FARES below.
 */

import { PRICING_DATA } from '@/lib/priceData';

export interface FareRate {
  sedan: number;
  suv: number;
}

// Display label overrides so the dropdowns read naturally.
// Maps a priceData `to` value -> the label shown in the calculator.
const TO_LABEL: Record<string, string> = {
  'Gaurikund (Kedarnath)': 'Kedarnath (Gaurikund)',
  'Jim Corbett National Park': 'Jim Corbett',
};

const FROM_LABEL: Record<string, string> = {
  'Jolly Grant Airport': 'Jolly Grant Airport',
};

// Routes the calculator offered that are NOT in priceData. Keep them explicit
// and clearly separated so they are easy to migrate into priceData later.
const EXTRA_FARES: Record<string, Record<string, FareRate>> = {
  'Haridwar': {
    'Badrinath': { sedan: 9500, suv: 12500 },
  },
  'Rishikesh': {
    'Govindghat': { sedan: 9500, suv: 12500 },
  },
};

// Build the fare table from the source of truth.
function buildFareRates(): Record<string, Record<string, FareRate>> {
  const table: Record<string, Record<string, FareRate>> = {};

  for (const route of Object.values(PRICING_DATA)) {
    const fromLabel = FROM_LABEL[route.from] ?? route.from;
    const toLabel = TO_LABEL[route.to] ?? route.to;
    if (!table[fromLabel]) table[fromLabel] = {};
    table[fromLabel][toLabel] = { sedan: route.sedan, suv: route.suv };
  }

  // Merge in calculator-only routes (priceData takes precedence on conflict).
  for (const [from, dests] of Object.entries(EXTRA_FARES)) {
    if (!table[from]) table[from] = {};
    for (const [to, rate] of Object.entries(dests)) {
      if (!table[from][to]) table[from][to] = rate;
    }
  }

  return table;
}

export const fareRates: Record<string, Record<string, FareRate>> = buildFareRates();
