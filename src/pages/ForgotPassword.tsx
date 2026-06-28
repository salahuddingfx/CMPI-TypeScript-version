import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";
import { api } from "@/services/api";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/forgot-password", { email });
      setSubmitted(true);
      toast.success("Reset link sent! Check your inbox.");
    } catch (err: any) {
      const message = err.response?.data?.message;
      if (err.response?.status === 429) {
        toast.error("Too many requests. Please wait a moment before trying again.");
      } else if (message) {
        toast.error(message);
      } else {
        // Show the same success UI regardless — prevents email enumeration
        setSubmitted(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <SEO title="Forgot Password" description="Reset your CMPI account password." />
      <section className="container section-pad">
        <div className="mx-auto max-w-md">
          <SectionHeader
            title="Forgot Password"
            description="Enter your email and we'll send you a reset link."
            align="center"
            className="mb-8"
          />
          <form onSubmit={handleSubmit} className="rounded-sm border bg-card p-6 shadow-sm sm:p-8">
            {submitted ? (
              <div className="text-center space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm text-muted-foreground">
                  If an account exists for <span className="font-semibold text-foreground">{email}</span>, a password
                  reset link has been sent. Please check your inbox (and spam folder).
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="reset-email" className="text-sm font-semibold">
                    Email Address
                  </label>
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Sending..." : "Send Reset Link"}
                </Button>
              </div>
            )}
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Remember your password?{" "}
              <Link className="text-primary hover:underline" to="/login">
                Back to login
              </Link>
            </p>
          </form>
        </div>
      </section>
    </PageTransition>
  );
}
