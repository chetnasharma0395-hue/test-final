'use client';

import { useEffect } from 'react';

/**
 * AnalyticsTracker — fires GA4 conversion events for high-intent actions
 * (WhatsApp, phone call, quote/booking clicks) site-wide.
 *
 * Uses ONE delegated click listener on document instead of wiring 57+ links
 * individually. Zero markup change, zero impact on SSR/SEO/LCP — purely a
 * client-side side effect that runs after hydration.
 *
 * Events sent (all marked as Key Events in GA4 → Admin → Events):
 *   - whatsapp_click   — any wa.me link
 *   - call_click       — any tel: link
 *   - quote_click      — "Request a Quote" / "Book Now" style CTAs
 */

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Gtag;
  }
}

function track(event: string, params: Record<string, unknown>) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', event, params);
}

export function AnalyticsTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Find the nearest anchor (clicks often land on inner span/icon)
      const anchor = target.closest('a');
      const pagePath = window.location.pathname;

      if (anchor) {
        const href = anchor.getAttribute('href') || '';

        // WhatsApp
        if (href.includes('wa.me') || href.includes('api.whatsapp.com')) {
          track('whatsapp_click', {
            link_url: href,
            page_path: pagePath,
            link_text: (anchor.textContent || '').trim().slice(0, 80),
          });
          return;
        }

        // Phone call
        if (href.startsWith('tel:')) {
          track('call_click', {
            phone_number: href.replace('tel:', ''),
            page_path: pagePath,
            link_text: (anchor.textContent || '').trim().slice(0, 80),
          });
          return;
        }
      }

      // Quote / booking CTAs (buttons or links without tel/wa.me).
      // Matches visible text like "Request a Quote", "Book Now", "Get Quote".
      const clickable = target.closest('a, button');
      if (clickable) {
        const text = (clickable.textContent || '').trim().toLowerCase();
        if (
          /request a quote|get (a )?quote|book now|book your|get quote/.test(text)
        ) {
          track('quote_click', {
            cta_text: (clickable.textContent || '').trim().slice(0, 80),
            page_path: pagePath,
          });
        }
      }
    }

    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
