import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";
import { login as apiLogin } from "@/services/api";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await apiLogin(email, password);
      localStorage.setItem("cmpi-token", data.token);
      localStorage.setItem("cmpi-user", JSON.stringify({
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        department: data.user.department,
        studentId: data.user.student_id,
        role: data.user.role,
      }));
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password. Check your institute email credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <SEO title="Login" description="Login to your CMPI student or faculty portal." />
      <section className="container section-pad">
        <div className="mx-auto max-w-md">
          <SectionHeader title="Welcome back" description="Login with your institute email to access CMPI dashboard." align="center" className="mb-8" />
          {error && <p className="mb-4 rounded-sm border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
          <form onSubmit={handleSubmit} className="rounded-sm border bg-card p-6 shadow-sm sm:p-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold">Institute Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name.dept@cmpi.edu.bd"
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
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </div>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don&apos;t have an account? <Link className="text-primary hover:underline" to="/register">Contact admin</Link>
            </p>
          </form>

          <div className="mt-6 rounded-sm border bg-muted/60 p-4 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">Test student accounts</p>
            <div className="mt-3 space-y-2">
              <p><span className="font-semibold">Rahim (CST):</span> <span className="font-mono">rahim.cst@cmpi.edu.bd</span> / <span className="font-mono">rahim123</span></p>
              <p><span className="font-semibold">Fatima (Civil):</span> <span className="font-mono">fatima.civil@cmpi.edu.bd</span> / <span className="font-mono">fatima123</span></p>
              <p><span className="font-semibold">Arif (EEE):</span> <span className="font-mono">arif.eee@cmpi.edu.bd</span> / <span className="font-mono">arif123</span></p>
              <p><span className="font-semibold">Admin:</span> <span className="font-mono">admin@cmpi.edu.bd</span> / <span className="font-mono">admin123</span></p>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
