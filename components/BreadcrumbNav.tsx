/**
 * components/BreadcrumbNav.tsx
 *
 * Renders two things in one component:
 *  1. A <script> tag containing BreadcrumbList JSON-LD (machine-readable)
 *  2. A styled visual breadcrumb trail (human-readable)
 *
 * Usage:
 *   <BreadcrumbNav items={[{ name: 'Mussoorie', url: '/mussoorie' }]} />
 *   <BreadcrumbNav items={[{ name: 'Services', url: '/services' }, { name: 'Rishikesh', url: '/services/rishikesh-taxi-service' }]} dark={false} />
 */

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { breadcrumbSchema, type BreadcrumbSchemaItem } from '@/lib/schema';

interface BreadcrumbNavProps {
  /** Items after "Home". The last item is treated as the current page (no link). */
  items: BreadcrumbSchemaItem[];
  /** True (default) for use on dark hero backgrounds; false for light backgrounds. */
  dark?: boolean;
}

/** Strips the site origin from absolute URLs so internal links stay relative. */
function toRelativeHref(url: string): string {
  if (url.startsWith('http')) {
    return url.replace(/^https?:\/\/(www\.)?uttarakhandcab\.in/, '');
  }
  return url;
}

export function BreadcrumbNav({ items, dark = true }: BreadcrumbNavProps) {
  const schema = breadcrumbSchema(items);

  const baseNav = dark
    ? 'bg-white/5 backdrop-blur-md border-white/10 text-white/70'
    : 'bg-[#1A1A1A] border-white/10 text-white/70';

  const hoverColor = 'hover:text-[#F7941D]';

  return (
    <>
      {/* ── Machine-readable BreadcrumbList — injected into <head> ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ── Visual breadcrumb trail ── */}
      <nav
        aria-label="Breadcrumb"
        className={`inline-flex items-center gap-1.5 border px-4 py-2 rounded-full mb-8 text-xs font-bold uppercase tracking-widest shadow-sm ${baseNav}`}
      >
        <Link href="/" className={`transition-colors ${hoverColor}`}>
          Home
        </Link>

        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          const href = toRelativeHref(item.url);

          return (
            <span key={i} className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3 opacity-30 shrink-0" />
              {isLast ? (
                <span className="text-[#F7941D]">{item.name}</span>
              ) : (
                <Link href={href} className={`transition-colors ${hoverColor}`}>
                  {item.name}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}
