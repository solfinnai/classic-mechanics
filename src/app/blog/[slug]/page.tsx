import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts, BlogPost } from '@/data/blog-posts';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((post) => post.id === slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.metaDescription,
    alternates: {
      canonical: `/blog/${post.id}`,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: 'article',
      publishedTime: post.publishDate,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function renderMarkdown(content: string): React.ReactNode {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: { items: string[]; ordered: boolean } | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Handle lists
    if (line.match(/^[-*+]\s/)) {
      const item = line.replace(/^[-*+]\s/, '');
      if (!currentList) {
        currentList = { items: [item], ordered: false };
      } else {
        currentList.items.push(item);
      }
      continue;
    } else if (line.match(/^\d+\.\s/)) {
      const item = line.replace(/^\d+\.\s/, '');
      if (!currentList) {
        currentList = { items: [item], ordered: true };
      } else {
        currentList.items.push(item);
      }
      continue;
    } else if (currentList) {
      // End of list
      elements.push(
        currentList.ordered ? (
          <ol key={elements.length} className="mb-4 ml-6 list-decimal space-y-1 text-slate-700">
            {currentList.items.map((item, idx) => (
              <li key={idx}>{renderInlineMarkdown(item)}</li>
            ))}
          </ol>
        ) : (
          <ul key={elements.length} className="mb-4 ml-6 list-disc space-y-1 text-slate-700">
            {currentList.items.map((item, idx) => (
              <li key={idx}>{renderInlineMarkdown(item)}</li>
            ))}
          </ul>
        )
      );
      currentList = null;
    }

    // Handle headers
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={elements.length} className="mb-3 mt-8 font-display text-xl font-bold text-[#2d2d2d]">
          {line.replace('### ', '')}
        </h3>
      );
    } else if (line.startsWith('## ')) {
      elements.push(
        <h2 key={elements.length} className="mb-4 mt-10 font-display text-2xl font-bold text-[#2d2d2d]">
          {line.replace('## ', '')}
        </h2>
      );
    } else if (line.startsWith('# ')) {
      elements.push(
        <h1 key={elements.length} className="mb-6 mt-8 font-display text-3xl font-bold text-[#2d2d2d]">
          {line.replace('# ', '')}
        </h1>
      );
    } else if (line.trim() === '') {
      // Empty line
      continue;
    } else if (line.trim()) {
      // Regular paragraph
      elements.push(
        <p key={elements.length} className="mb-4 text-slate-700 leading-relaxed">
          {renderInlineMarkdown(line)}
        </p>
      );
    }
  }

  // Handle any remaining list
  if (currentList) {
    elements.push(
      currentList.ordered ? (
        <ol key={elements.length} className="mb-4 ml-6 list-decimal space-y-1 text-slate-700">
          {currentList.items.map((item, idx) => (
            <li key={idx}>{renderInlineMarkdown(item)}</li>
          ))}
        </ol>
      ) : (
        <ul key={elements.length} className="mb-4 ml-6 list-disc space-y-1 text-slate-700">
          {currentList.items.map((item, idx) => (
            <li key={idx}>{renderInlineMarkdown(item)}</li>
          ))}
        </ul>
      )
    );
  }

  return elements;
}

function renderInlineMarkdown(text: string): React.ReactNode {
  // Handle bold text
  let result = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Handle links
  result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#c41e3a] hover:underline">$1</a>');

  // Convert to JSX
  return <span dangerouslySetInnerHTML={{ __html: result }} />;
}

function getRelatedPosts(currentPost: BlogPost): BlogPost[] {
  return blogPosts
    .filter(post => post.id !== currentPost.id && post.category === currentPost.category)
    .slice(0, 3);
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((post) => post.id === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Back to Blog */}
      <div className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[#c41e3a] transition-colors"
        >
          ← Back to Blog
        </Link>
      </div>

      {/* Article Header */}
      <header className="mb-8">
        <div className="mb-4">
          <span className="inline-block rounded-full bg-[#c41e3a]/10 px-3 py-1 text-sm font-medium text-[#c41e3a]">
            {post.category}
          </span>
        </div>
        <h1 className="font-display text-3xl font-bold text-[#2d2d2d] sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>
        <div className="mt-6 flex items-center gap-4 text-sm text-slate-500">
          <span>By {post.author}</span>
          <span>•</span>
          <span>{formatDate(post.publishDate)}</span>
          <span>•</span>
          <span>{post.readTime} min read</span>
        </div>
      </header>

      {/* Article Content */}
      <article className="prose prose-slate max-w-none">
        <div className="text-lg leading-relaxed">
          {renderMarkdown(post.content)}
        </div>
      </article>

      {/* Lead Generation CTA */}
      <div className="my-12 rounded-lg bg-[#c41e3a]/5 border border-[#c41e3a]/20 p-8 text-center">
        <h3 className="font-display text-2xl font-bold text-[#2d2d2d] mb-4">
          Ready to Start Your Restoration?
        </h3>
        <p className="text-slate-600 mb-6">
          Get expert advice and a free estimate from professional restoration specialists.
        </p>
        <a
          href="mailto:sol@executiveintelligence.ai?subject=Free Restoration Estimate Request"
          className="inline-block rounded-lg bg-[#c41e3a] px-6 py-3 text-white font-semibold hover:bg-[#a01729] transition-colors"
        >
          Get a Free Restoration Estimate
        </a>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-[#2d2d2d] mb-8">
            Related Articles
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <article key={relatedPost.id}>
                <Link href={`/blog/${relatedPost.id}`} className="block group">
                  <div className="rounded-lg border border-slate-200/60 bg-white p-4 transition-all hover:border-[#c41e3a]/30 hover:shadow-md">
                    <div className="mb-2">
                      <span className="inline-block rounded-full bg-[#c41e3a]/10 px-2 py-1 text-xs font-medium text-[#c41e3a]">
                        {relatedPost.category}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#2d2d2d] group-hover:text-[#c41e3a] transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <div className="mt-3 text-xs text-slate-400">
                      {formatDate(relatedPost.publishDate)} • {relatedPost.readTime} min read
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}