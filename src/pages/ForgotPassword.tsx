import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageTransition>
      <SEO title="Forgot password" description="Reset your CMPI account password." />
      <section className="container section-pad">
        <div className="mx-auto max-w-md">
          <SectionHeader title="Forgot password" description="Enter your email and we will send you a reset link." align="center" className="mb-8" />
          <form onSubmit={handleSubmit} className="rounded-sm border bg-card p-6 shadow-sm sm:p-8">
            {submitted ? (
              <p className="text-sm text-muted-foreground">
                If an account exists for <span className="font-semibold text-foreground">{email}</span>, a reset link has been sent.
              </p>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold">Email</label>
                  <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full">Send reset link</Button>
              </div>
            )}
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Remember your password? <Link className="text-primary hover:underline" to="/login">Back to login</Link>
            </p>
          </form>
        </div>
      </section>
    </PageTransition>
  );
}
