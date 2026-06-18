import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - replace with real auth later
    localStorage.setItem("cmpi-user", JSON.stringify({ email, name: "Demo User" }));
    window.location.href = "/dashboard";
  };

  return (
    <PageTransition>
      <SEO title="Login" description="Login to your CMPI student or faculty portal." />
      <section className="container section-pad">
        <div className="mx-auto max-w-md">
          <SectionHeader title="Welcome back" description="Login to access your CMPI dashboard and resources." align="center" className="mb-8" />
          <form onSubmit={handleSubmit} className="rounded-sm border bg-card p-6 shadow-sm sm:p-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-semibold">Password</label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-border" />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <Link className="text-primary hover:underline" to="/forgot-password">Forgot password?</Link>
              </div>
              <Button type="submit" className="w-full">Login</Button>
            </div>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don&apos;t have an account? <Link className="text-primary hover:underline" to="/register">Create one</Link>
            </p>
          </form>
        </div>
      </section>
    </PageTransition>
  );
}
