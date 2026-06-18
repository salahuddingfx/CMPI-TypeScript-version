import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";

const mockUsers = [
  { email: "admin@cmpi.edu.bd", password: "admin123", name: "Admin User" },
  { email: "student@cmpi.edu.bd", password: "student123", name: "Student User" },
];

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const matched = mockUsers.find((u) => u.email === email && u.password === password);
    if (!matched) {
      setError("Invalid email or password. Use test accounts shown below.");
      return;
    }
    localStorage.setItem("cmpi-user", JSON.stringify({ email: matched.email, name: matched.name }));
    navigate("/dashboard");
  };

  return (
    <PageTransition>
      <SEO title="Login" description="Login to your CMPI student or faculty portal." />
      <section className="container section-pad">
        <div className="mx-auto max-w-md">
          <SectionHeader title="Welcome back" description="Login to access your CMPI dashboard and resources." align="center" className="mb-8" />
          {error && <p className="mb-4 rounded-sm border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
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

          <div className="mt-6 rounded-sm border bg-muted/60 p-4 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">Test accounts</p>
            <p className="mt-2">Admin: <span className="font-mono">admin@cmpi.edu.bd</span> / <span className="font-mono">admin123</span></p>
            <p>Student: <span className="font-mono">student@cmpi.edu.bd</span> / <span className="font-mono">student123</span></p>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
