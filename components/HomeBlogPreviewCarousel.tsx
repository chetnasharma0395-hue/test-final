'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CardCarousel } from './CardCarousel';

export interface BlogPostItem {
  slug: string;
  title: string;
  category: string;
  date: string;
  image: string;
}

export function HomeBlogPreviewCarousel({ posts }: { posts: BlogPostItem[] }) {
  return (
    <CardCarousel
      items={posts}
      loop
      getKey={(post) => post.slug}
      cardWidth={360}
      cardGap={20}
      ariaLabel="Travel guides carousel — use arrow keys to navigate"
      renderCard={(post, isActive) => (
        <Link
          href={`/blog/${post.slug}`}
          onClick={(e) => { if (!isActive) e.preventDefault(); }}
          className="group bg-[#1A1A1A] rounded-[2rem] overflow-hidden border border-white/8 block h-full"
          style={{
            boxShadow: isActive ? '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(247,148,29,0.10)' : 'none',
            borderColor: isActive ? 'rgba(247,148,29,0.25)' : 'rgba(255,255,255,0.08)',
          }}
        >
          <div className="relative h-48 overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="360px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              draggable={false}
            />
          </div>
          <div className="p-6">
            <p className="text-[#F7941D] text-[10px] font-black uppercase tracking-widest mb-2">
              {post.category}
            </p>
            <h3 className="text-white font-black text-base leading-snug tracking-tight line-clamp-2 mb-3 group-hover:text-[#F7941D] transition-colors">
              {post.title}
            </h3>
            <p className="text-white/70 text-xs font-light">{post.date}</p>
          </div>
        </Link>
      )}
    />
  );
}
