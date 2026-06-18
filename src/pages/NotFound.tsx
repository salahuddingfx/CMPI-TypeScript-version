import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";

export function NotFound() {
  return (
    <PageTransition>
      <SEO title="404 Page Not Found" description="The requested CMPI page could not be found." />
      <section className="container section-pad">
        <div className="mx-auto max-w-2xl rounded-sm border bg-card p-8 text-center shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">404</p>
          <h1 className="mt-4 text-4xl font-black">Page not found</h1>
          <p className="mt-4 leading-7 text-muted-foreground">The page you are looking for does not exist or has been moved.</p>
          <Button asChild className="mt-6">
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </section>
    </PageTransition>
  );
}
