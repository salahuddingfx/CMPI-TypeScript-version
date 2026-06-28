import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";
import { api } from "@/services/api";

export function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token") ?? "";
  const emailParam = searchParams.get("email") ?? "";

  const [email, setEmail] = useState(emailParam);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      toast.error("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/reset-password", {
        token,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      toast.success("Password reset successfully! You can now log in.");
      navigate("/login");
    } catch (err: any) {
      toast.error(err.response?.data?.message ?? "The reset token is invalid or has expired. Please request a new link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <SEO title="Reset Password" description="Set a new password for your CMPI account." />
      <section className="container section-pad">
        <div className="mx-auto max-w-md">
          <SectionHeader
            title="Reset Password"
            description="Enter your new password below."
            align="center"
            className="mb-8"
          />
          <form onSubmit={handleSubmit} className="rounded-sm border bg-card p-6 shadow-sm sm:p-8 space-y-4">
            {!token && (
              <div className="rounded-sm border border-destructive/30 bg-destructive/10 p-4 text-destructive text-sm">
                Invalid or missing reset token. Please{" "}
                <Link to="/forgot-password" className="underline font-semibold">request a new reset link</Link>.
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="reset-email" className="text-sm font-semibold">Email</label>
              <Input
                id="reset-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="new-password" className="text-sm font-semibold">New Password</label>
              <Input
                id="new-password"
                type="password"
                placeholder="Minimum 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirm-password" className="text-sm font-semibold">Confirm Password</label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Repeat your new password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading || !token}>
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              <Link to="/forgot-password" className="text-primary hover:underline">
                Request a new reset link
              </Link>
            </p>
          </form>
        </div>
      </section>
    </PageTransition>
  );
}
