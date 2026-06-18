import { useParams } from "react-router-dom";
import { BlogCard } from "@/components/features/BlogCard";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { useInstituteData } from "@/hooks/useInstituteData";

export function BlogDetails() {
  const { slug } = useParams();
  const { data, loading, error } = useInstituteData();

  if (loading) return <LoadingSkeleton />;
  if (error || !data) return <PageTransition className="container section-pad"><div className="rounded-sm border border-destructive/30 bg-destructive/10 p-6 text-destructive">Unable to load blog details.</div></PageTransition>;

  const post = data.blogs.find((item) => item.slug === slug);
  if (!post) {
    return (
      <PageTransition className="container section-pad">
        <div className="rounded-sm border bg-card p-8 text-center shadow-sm">
          <h1 className="text-3xl font-bold">Blog post not found</h1>
          <p className="mt-3 text-muted-foreground">The requested blog post does not exist.</p>
        </div>
      </PageTransition>
    );
  }

  const relatedPosts = post.relatedIds ? data.blogs.filter((item) => post.relatedIds?.includes(item.id)) : [];

  return (
    <PageTransition>
      <SEO title={post.title} description={post.excerpt} />
      <section className="container section-pad">
        <article className="mx-auto max-w-4xl rounded-sm border bg-card p-6 shadow-sm sm:p-10">
          <div className="mb-5 flex flex-wrap gap-2">
            <span className="rounded-sm bg-primary/10 px-3 py-1 text-sm font-bold text-primary">{post.category}</span>
            <span className="rounded-sm bg-muted px-3 py-1 text-sm text-muted-foreground">{post.readTime}</span>
          </div>
          <SectionHeader title={post.title} description={post.excerpt} align="left" className="mb-6" />
          <div className="prose prose-emerald max-w-none dark:prose-invert">
            <p>{post.content}</p>
          </div>
          <p className="mt-8 border-t pt-6 text-sm text-muted-foreground">By {post.author} · {new Date(post.date).toLocaleDateString("en-GB")}</p>
        </article>
      </section>
      {relatedPosts.length > 0 && (
        <section className="bg-muted/60 py-16 sm:py-20 lg:py-24">
          <div className="container">
            <SectionHeader eyebrow="Related Posts" title="Continue reading" align="left" />
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((item) => (
                <BlogCard key={item.id} post={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </PageTransition>
  );
}
