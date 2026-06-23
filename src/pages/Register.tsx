import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";
import { register as apiRegister } from "@/services/api";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("Computer Science & Technology");
  const [studentId, setStudentId] = useState("");
  const [semester, setSemester] = useState("1st");
  const [session, setSession] = useState("");
  const [phone, setPhone] = useState("");
  const [guardian, setGuardian] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [address, setAddress] = useState("");
  const [admissionDate, setAdmissionDate] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      setLoading(false);
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter.");
      setLoading(false);
      return;
    }
    if (!/[0-9]/.test(password)) {
      setError("Password must contain at least one number.");
      setLoading(false);
      return;
    }

    const payload = {
      name,
      email,
      password,
      department,
      student_id: studentId,
      semester,
      session,
      phone,
      guardian,
      blood_group: bloodGroup || null,
      address,
      admission_date: admissionDate || null,
    };

    try {
      await apiRegister(payload);
      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed. Please make sure email/student ID are unique.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <PageTransition>
        <SEO title="Registration Successful" description="Your registration is pending approval." />
        <section className="container section-pad">
          <div className="mx-auto max-w-md text-center bg-card border rounded-sm p-8 shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-600 animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold">Registration Successful!</h2>
            <p className="mt-4 text-sm text-muted-foreground leading-6">
              Your account has been created and is **pending verification** by the institute administration.
            </p>
            <p className="mt-2 text-sm text-muted-foreground leading-6">
              You can log in now, but features will be locked until an administrator approves your profile status.
            </p>
            <div className="mt-6">
              <Button asChild className="w-full">
                <Link to="/login">Go to Login</Link>
              </Button>
            </div>
          </div>
        </section>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <SEO title="Register" description="Register for a CMPI student portal account." />
      <section className="container section-pad">
        <div className="mx-auto max-w-2xl">
          <SectionHeader title="Student Registration" description="Enter your details to create an account. Admin approval is required for activation." align="center" className="mb-8" />
          
          {error && <p className="mb-4 rounded-sm border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
          
          <form onSubmit={handleSubmit} className="rounded-sm border bg-card p-6 shadow-sm sm:p-8 space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 col-span-2">
                <label htmlFor="name" className="text-sm font-semibold">Full Name</label>
                <Input id="name" placeholder="e.g. Rahim Miah" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold">Email</label>
                <Input id="email" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-semibold">Password</label>
                <Input id="password" type="password" placeholder="Min. 8 chars, 1 uppercase, 1 lowercase, 1 number" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <label htmlFor="studentId" className="text-sm font-semibold">Student ID / Roll</label>
                <Input id="studentId" placeholder="e.g. CMPI-2023-0102 (leave blank if not a student)" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
              </div>

              <div className="space-y-2">
                <label htmlFor="department" className="text-sm font-semibold">Department</label>
                <select
                  id="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="flex h-10 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="Computer Science & Technology">Computer Science (CST)</option>
                  <option value="Civil Technology">Civil Technology</option>
                  <option value="Electrical Technology">Electrical Technology</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="semester" className="text-sm font-semibold">Current Semester</label>
                <select
                  id="semester"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="flex h-10 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="1st">1st Semester</option>
                  <option value="2nd">2nd Semester</option>
                  <option value="3rd">3rd Semester</option>
                  <option value="4th">4th Semester</option>
                  <option value="5th">5th Semester</option>
                  <option value="6th">6th Semester</option>
                  <option value="7th">7th Semester</option>
                  <option value="8th">8th Semester</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="session" className="text-sm font-semibold">Session</label>
                <Input id="session" placeholder="e.g. 2023-2024" value={session} onChange={(e) => setSession(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-semibold">Phone Number</label>
                <Input id="phone" placeholder="e.g. +880 1700-000000" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <label htmlFor="guardian" className="text-sm font-semibold">Guardian Name</label>
                <Input id="guardian" placeholder="e.g. Karim Miah (Father)" value={guardian} onChange={(e) => setGuardian(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <label htmlFor="bloodGroup" className="text-sm font-semibold">Blood Group</label>
                <select
                  id="bloodGroup"
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="flex h-10 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Select Blood Group...</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="admissionDate" className="text-sm font-semibold">Admission Date</label>
                <Input id="admissionDate" type="date" value={admissionDate} onChange={(e) => setAdmissionDate(e.target.value)} required />
              </div>

              <div className="space-y-2 col-span-2">
                <label htmlFor="address" className="text-sm font-semibold">Residential Address</label>
                <Input id="address" placeholder="e.g. Cox's Bazar, Bangladesh" value={address} onChange={(e) => setAddress(e.target.value)} required />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Registering..." : "Submit Registration Request"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account? <Link className="text-primary hover:underline" to="/login">Login</Link>
            </p>
          </form>
        </div>
      </section>
    </PageTransition>
  );
}
