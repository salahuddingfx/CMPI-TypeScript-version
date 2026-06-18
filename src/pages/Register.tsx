import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";

export function Register() {
  return (
    <PageTransition>
      <SEO title="Get Access" description="Request a CMPI student portal account." />
      <section className="container section-pad">
        <div className="mx-auto max-w-md">
          <SectionHeader title="Get your institute email" description="Student accounts are created by the institute administration." align="center" className="mb-8" />
          <div className="rounded-sm border bg-card p-6 shadow-sm sm:p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <span className="text-2xl font-bold text-primary">@</span>
            </div>
            <h2 className="text-xl font-bold">Student Email Accounts</h2>
            <p className="mt-3 text-sm text-muted-foreground leading-6">
              Each student receives an official CMPI email address in the format:
            </p>
            <p className="mt-2 rounded-sm bg-muted px-4 py-2 font-mono text-sm font-semibold text-primary">
              name.dept@cmpi.edu.bd
            </p>
            <p className="mt-4 text-sm text-muted-foreground leading-6">
              Contact the admin office with your admission documents to receive your login credentials.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Button asChild className="w-full">
                <Link to="/contact">Contact Admin Office</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/login">Already have an account? Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
