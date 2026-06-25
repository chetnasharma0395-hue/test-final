'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * MasonryGrid — Pinterest-style uneven gallery.
 *
 * Uses CSS multi-column layout (no JS measuring, no library) so images keep
 * their natural aspect ratio and tile into a balanced masonry. Each tile
 * fades + rises in on scroll into view.
 *
 * Responsive columns: 2 (mobile) → 3 (md) → 4 (lg).
 */

type GalleryImage = { src: string; alt: string };

export function MasonryGrid({ images }: { images: GalleryImage[] }) {
  const reduce = useReducedMotion();

  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 [column-fill:_balance]">
      {images.map((image, index) => (
        <motion.div
          key={image.src}
          className="group relative mb-4 md:mb-6 break-inside-avoid overflow-hidden rounded-[1.5rem] bg-[#1A1A1A] border border-white/10 cursor-pointer"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, delay: (index % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
          whileHover={reduce ? undefined : { y: -4 }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={600}
            height={800}
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Glassmorphic caption — slides up on hover */}
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
            <p className="text-white text-[10px] font-bold uppercase tracking-widest leading-tight">
              {image.alt}
            </p>
          </div>

          {/* Subtle orange ring on hover */}
          <div className="absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-transparent group-hover:ring-[#F7941D]/40 transition-colors duration-300 pointer-events-none" />
        </motion.div>
      ))}
    </div>
  );
}
