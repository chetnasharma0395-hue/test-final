import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/blog-content";

export const metadata: Metadata = {
  title: "Travel Blogs & Guides",
  description: "Explore travel guides, taxi fares, and road trip tips across Uttarakhand.",
  alternates: { canonical: "https://uttarakhand.cab/blog" },
  openGraph: {
    title: "Travel Blogs & Guides | Uttarakhand Cab 24/7",
    description: "Explore travel guides, taxi fares, and road trip tips across Uttarakhand.",
    url: "https://uttarakhand.cab/blog",
    siteName: "Uttarakhand Cab 24/7",
    type: "website",
    images: [
      {
        url: "https://uttarakhand.cab/images/og-main.jpg",
        width: 1200,
        height: 630,
        alt: "Uttarakhand Cab 24/7 - Premium Taxi Service",
      },
    ],
  },
};

export default function BlogPage() {
  const DOMAIN = "https://uttarakhand.cab";

  // ItemList schema — signals /blog as a content hub with ordered post list
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${DOMAIN}/blog/#itemlist`,
    name: "Travel Blogs & Guides — Uttarakhand Cab 24/7",
    description:
      "Travel guides, taxi fares, and road trip tips across Uttarakhand.",
    numberOfItems: blogPosts.length,
    itemListElement: blogPosts.map((post, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${DOMAIN}/blog/${post.slug}`,
      name: post.title,
    })),
  };

  // BreadcrumbList — Home › Blog
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: DOMAIN },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${DOMAIN}/blog` },
    ],
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">

      {/* JSON-LD: ItemList + Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      
      {/* Header */}
      <div className="mb-14 text-left">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
          Travel Blogs & Guides
        </h1>
        
        <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
          Sahi safar sahi service aur vo safar hamari zimmedaari. Read our latest guides, fare updates, and travel tips.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
            
            <div className="border border-white/10 rounded-2xl overflow-hidden bg-[#1A1A1A] h-full flex flex-col transition-all duration-300 hover:shadow-xl">
              
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              {/* Content */}
              <div className="p-6 flex-grow flex flex-col text-left">
                
                <span className="text-sm text-[#F7941D] font-bold tracking-wide uppercase mb-3 block">
                  {post.category}
                </span>
                
                <h2 className="font-bold text-xl mb-3 text-white transition-colors line-clamp-2 group-hover:text-[#F7941D]">
                  {post.title}
                </h2>
                
                <p className="text-white/60 mb-6 flex-grow line-clamp-3">
                  {post.excerpt}
                </p>
                
                {/* Footer */}
                <div className="flex justify-between items-center text-sm text-white/50 mt-auto pt-4 border-t border-white/10">
                  <span className="font-medium">{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
