import { getBlogPost, getAllSlugs, blogPosts } from "@/lib/blog-content";
import { getBlogCrossLink } from "@/lib/blogCrossLinks";
import { faqPageSchema } from "@/lib/schema";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// 1. Generate Static Routes at Build Time
export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

// 2. Generate Dynamic SEO Meta Tags
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getBlogPost(resolvedParams.slug);
  
  if (!post) return { title: 'Article Not Found' };

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical: `https://uttarakhand.cab/blog/${post.slug}`,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `https://uttarakhand.cab/blog/${post.slug}`,
      siteName: 'Uttarakhand Cab 24/7',
      type: 'article',
      publishedTime: post.dateISO,
      images: [
        {
          url: `https://uttarakhand.cab${post.image}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

// 3. The Page Component
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getBlogPost(resolvedParams.slug);
  
  if (!post) {
    notFound();
  }

  // ── Enhanced BlogPosting schema ──────────────────────────────────────────────
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `https://uttarakhand.cab/blog/${post.slug}`,
    headline: post.title,
    description: post.metaDescription,
    image: {
      '@type': 'ImageObject',
      url: `https://uttarakhand.cab${post.image}`,
      width: 1200,
      height: 630,
    },
    url: `https://uttarakhand.cab/blog/${post.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://uttarakhand.cab/blog/${post.slug}`,
    },
    author: {
      '@type': 'Organization',
      name: 'Uttarakhand Cab 24/7',
      url: 'https://uttarakhand.cab',
      '@id': 'https://uttarakhand.cab/#business',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Uttarakhand Cab 24/7',
      '@id': 'https://uttarakhand.cab/#business',
      logo: {
        '@type': 'ImageObject',
        url: 'https://uttarakhand.cab/images/logo.png',
        width: 200,
        height: 60,
      },
    },
    datePublished: post.dateISO,
    dateModified: post.dateISO,
    articleSection: post.category,
    inLanguage: 'en-IN',
    isAccessibleForFree: true,
    keywords: post.category,
    wordCount: post.sections.reduce((acc: number, s: { body: string }) => acc + s.body.split(' ').length, 0),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2'],
    },
  };

  // ── BreadcrumbList for blog posts ────────────────────────────────────────────
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://uttarakhand.cab' },
      { '@type': 'ListItem', position: 2, name: 'Travel Blog', item: 'https://uttarakhand.cab/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://uttarakhand.cab/blog/${post.slug}` },
    ],
  };


  // Related posts — same category, exclude self, limit 3
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3)
    .concat(
      blogPosts
        .filter((p) => p.slug !== post.slug && p.category !== post.category)
        .slice(0, Math.max(0, 3 - blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category).length))
    )
    .slice(0, 3);

  // Auto-extract FAQPage schema from the "Frequently Asked Questions" section
  // FAQ sections in blog-content.ts use <h3>Q</h3><p>A</p> HTML pattern
  const faqSection = post.sections.find(
    (s) => s.heading && s.heading.toLowerCase().includes('frequently asked')
  );

  let faqLd: ReturnType<typeof faqPageSchema> | null = null;

  if (faqSection) {
    // Strip HTML tags cleanly for schema text values
    const stripHtml = (html: string) =>
      html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

    // Match <h3>...question...</h3><p>...answer...</p> pairs
    const pairRegex = /<h3>[^<]*?(?:\d+\.\s*)?(.+?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g;
    const faqs: { question: string; answer: string }[] = [];
    let match;

    while ((match = pairRegex.exec(faqSection.body)) !== null) {
      const question = stripHtml(match[1]).trim();
      const answer = stripHtml(match[2]).trim();
      if (question && answer && question.length > 10) {
        faqs.push({ question, answer });
      }
    }

    if (faqs.length > 0) {
      faqLd = faqPageSchema(faqs);
    }
  }

  return (
    <article className="max-w-4xl mx-auto px-4 pt-24 pb-12 text-left">
      {/* Schemas — JSON-LD rendered as plain script tags (no client strategy needed) */}
      <script id={`article-schema-${post.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script id={`breadcrumb-schema-${post.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd && (
        <script id={`faq-schema-${post.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      )}

      {/* Visual Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/70 mb-8">
        <Link href="/" className="hover:text-[#F7941D] transition-colors">Home</Link>
        <span className="text-gray-300">/</span>
        <Link href="/blog" className="hover:text-[#F7941D] transition-colors">Blog</Link>
        <span className="text-gray-300">/</span>
        <span className="text-[#F7941D] truncate max-w-[200px]">{post.category}</span>
      </nav>

      {/* Blog Header */}
      <header className="mb-10">
        <span className="text-orange-600 font-bold tracking-wider uppercase text-sm">
          {post.category}
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold mt-4 mb-6 text-gray-900 leading-tight">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm border-b border-white/10 pb-6">
          <span className="font-semibold text-gray-900">{post.author}</span>
          <span className="hidden sm:inline">•</span>
          <span>{post.date}</span>
          <span className="hidden sm:inline">•</span>
          <span>{post.readTime}</span>
        </div>
      </header>

      {/* Featured Image */}
      <div className="relative mb-12 rounded-2xl overflow-hidden shadow-lg border border-white/10 aspect-[16/9] max-h-[500px]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 1024px"
          priority
          className="object-cover"
        />
      </div>

      {/* Blog Content */}
      <div className="prose prose-lg max-w-none text-gray-800">
        {post.sections.map((section, i) => (
          <section key={i} className="mb-10">
            {section.heading && (
              <h2 className="text-2xl md:text-3xl font-bold mb-5 text-gray-900">
                {section.heading}
              </h2>
            )}
            <div 
              className="leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: section.body }} 
            />
          </section>
        ))}
      </div>

      {/* Related Blog Posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-16 pt-10 border-t border-white/10">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((p) => (
              <a
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group block bg-[#1A1A1A] rounded-2xl p-6 hover:bg-[#F7941D]/10 transition-colors border border-transparent hover:border-[#F7941D]/20"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-[#F7941D] mb-2 block">{p.category}</span>
                <h3 className="text-sm font-bold text-white group-hover:text-[#F7941D] transition-colors leading-snug line-clamp-3">
                  {p.title}
                </h3>
                <span className="text-xs text-gray-400 mt-3 block">{p.readTime}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Dynamic WhatsApp Lead Generation CTA */}
      <div className="bg-orange-50 border-l-4 border-orange-500 p-8 rounded-r-2xl mt-16 text-left shadow-sm">
        <h3 className="text-2xl font-bold text-gray-900">{post.cta.heading}</h3>
        <p className="mt-3 text-gray-700 text-lg">{post.cta.body}</p>
        
        <a 
          href={`https://wa.me/919258912169?text=Hi, I am reading the '${post.title}' article on uttarakhand.cab and want to book a cab.`}
          target="_blank"
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-2 bg-green-500 text-white font-bold py-3 px-6 rounded-lg mt-6 hover:bg-green-600 transition shadow-md hover:shadow-lg w-fit"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
          Message on WhatsApp
        </a>
      </div>
    </article>
  );
}
