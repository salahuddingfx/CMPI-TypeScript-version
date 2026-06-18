import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { BlogCard } from "@/components/features/BlogCard";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { useInstituteContext } from "@/contexts/InstituteDataContext";

export function Blog() {
  const { data, loading, error } = useInstituteContext();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filteredPosts = useMemo(() => {
    if (!data) return [];
    const normalizedQuery = query.trim().toLowerCase();
    return data.blogs.filter((post) => {
      const matchesCategory = category === "All" || post.category === category;
      const searchable = `${post.title} ${post.excerpt} ${post.content}`.toLowerCase();
      return matchesCategory && searchable.includes(normalizedQuery);
    });
  }, [data, category, query]);

  if (loading) return <LoadingSkeleton />;
  if (error || !data) return <PageTransition className="container section-pad"><div className="rounded-sm border border-destructive/30 bg-destructive/10 p-6 text-destructive">Unable to load blog posts.</div></PageTransition>;

  const categories = ["All", ...Array.from(new Set(data.blogs.map((post) => post.category)))];

  return (
    <PageTransition>
      <SEO title="Blog" description="Read CMPI blog posts about academics, admission, campus life, technical education, and student activities." />
      <section className="container section-pad">
        <SectionHeader
          eyebrow="Blog Listing"
          title="Latest articles and campus stories"
          description="Search blog posts by keyword or filter them by category."
          align="left"
        />
        <div className="mb-8 grid gap-4 rounded-sm border bg-card p-4 shadow-sm md:grid-cols-[1fr_auto]">
          <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search blog posts..." aria-label="Search blog posts" />
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="flex h-11 w-full rounded-sm border border-input bg-background px-4 py-2 text-sm shadow-sm"
            aria-label="Filter blog categories"
          >
            {categories.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
        {filteredPosts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-sm border bg-card p-8 text-center text-muted-foreground">No blog posts found.</div>
        )}
      </section>

      <section className="bg-muted/60 py-16 sm:py-20 lg:py-24">
        <div className="container">
          <SectionHeader eyebrow="Blog Categories" title="Explore by topic" align="left" />
          <div className="flex flex-wrap gap-3">
            {categories.map((item) => (
              <button key={item} type="button" className={`rounded-sm px-4 py-2 text-sm font-bold ${category === item ? "bg-primary text-white" : "bg-card text-muted-foreground hover:bg-muted"}`} onClick={() => setCategory(item)}>
                {item}
              </button>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/blog/admission-guide-2026" className="font-semibold text-primary hover:underline">
              Read admission guide
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
