import type { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/data/blog-posts';

export const metadata: Metadata = {
  title: 'Classic Car Restoration Blog',
  description: 'Expert guides, tips, and insights for classic car restoration and maintenance. Learn from professional mechanics and restoration specialists.',
  alternates: {
    canonical: '/blog',
  },
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function getExcerpt(content: string): string {
  // Remove markdown formatting and get first 200 chars
  const plainText = content
    .replace(/#{1,6}\s/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italics
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .trim();
  
  if (plainText.length <= 200) return plainText;
  
  // Find the last complete word within 200 chars
  const truncated = plainText.substring(0, 200);
  const lastSpace = truncated.lastIndexOf(' ');
  return lastSpace > 150 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
}

export default function BlogPage() {
  // Sort posts by date (newest first)
  const sortedPosts = [...blogPosts].sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="font-display text-4xl font-bold text-[#2d2d2d] sm:text-5xl">
          Classic Car Blog
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Expert guides, restoration tips, and insights from professional mechanics
        </p>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {sortedPosts.map((post) => (
          <article key={post.id} className="group">
            <Link href={`/blog/${post.id}`} className="block">
              <div className="rounded-lg border border-slate-200/60 bg-white p-6 transition-all hover:border-[#c41e3a]/30 hover:shadow-lg">
                {/* Category Badge */}
                <div className="mb-4">
                  <span className="inline-block rounded-full bg-[#c41e3a]/10 px-3 py-1 text-xs font-medium text-[#c41e3a]">
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-display text-xl font-bold text-[#2d2d2d] group-hover:text-[#c41e3a] transition-colors">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {getExcerpt(post.content)}
                </p>

                {/* Meta Information */}
                <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                  <span>{formatDate(post.publishDate)}</span>
                  <span>{post.readTime} min read</span>
                </div>

                {/* Author */}
                <div className="mt-3 text-xs text-slate-500">
                  By {post.author}
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}