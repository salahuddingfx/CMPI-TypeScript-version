import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";

const departments = ["Civil Technology", "Computer Science & Technology", "Electrical Technology"];

export function Admission() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", department: "", sscGpa: "", fatherName: "", motherName: "", address: "", bloodGroup: "" });

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageTransition>
      <SEO title="Apply for Admission" description="Online admission application for CMPI diploma programs." />
      <section className="container section-pad">
        <SectionHeader eyebrow="Admission 2026-2027" title="Apply online for diploma programs" description="Fill in the application form below. All fields are required." align="center" className="mb-10" />

        {submitted ? (
          <div className="mx-auto max-w-lg rounded-sm border border-green-200 bg-green-50 p-8 text-center dark:border-green-800 dark:bg-green-950/30">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
              <span className="text-3xl">✓</span>
            </div>
            <h2 className="text-2xl font-bold text-green-700 dark:text-green-400">Application Submitted!</h2>
            <p className="mt-3 text-sm text-green-600 dark:text-green-500">Your application has been received. You will receive a confirmation email at <span className="font-semibold">{form.email}</span>.</p>
            <p className="mt-2 text-sm text-green-600 dark:text-green-500">Application ID: <span className="font-mono font-bold">CMPI-ADM-{Date.now().toString().slice(-6)}</span></p>
            <Button className="mt-6" onClick={() => { setSubmitted(false); setStep(1); setForm({ name: "", email: "", phone: "", department: "", sscGpa: "", fatherName: "", motherName: "", address: "", bloodGroup: "" }); }}>Submit Another Application</Button>
          </div>
        ) : (
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 flex items-center justify-center gap-2">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${step >= s ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>{s}</div>
                  {s < 3 && <div className={`h-0.5 w-12 ${step > s ? "bg-primary" : "bg-muted"}`} />}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="rounded-sm border bg-card p-6 shadow-sm sm:p-8">
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold">Personal Information</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2"><label className="text-sm font-semibold">Full Name</label><Input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your full name" required /></div>
                    <div className="space-y-2"><label className="text-sm font-semibold">Email</label><Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" required /></div>
                    <div className="space-y-2"><label className="text-sm font-semibold">Phone</label><Input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+880 1XXX-XXXXXX" required /></div>
                    <div className="space-y-2"><label className="text-sm font-semibold">Blood Group</label><Input value={form.bloodGroup} onChange={(e) => update("bloodGroup", e.target.value)} placeholder="A+, B+, O+, etc." /></div>
                    <div className="space-y-2"><label className="text-sm font-semibold">Father's Name</label><Input value={form.fatherName} onChange={(e) => update("fatherName", e.target.value)} required /></div>
                    <div className="space-y-2"><label className="text-sm font-semibold">Mother's Name</label><Input value={form.motherName} onChange={(e) => update("motherName", e.target.value)} required /></div>
                  </div>
                  <div className="space-y-2"><label className="text-sm font-semibold">Address</label><Input value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="Village/Thana/District" required /></div>
                  <Button type="button" className="w-full" onClick={() => setStep(2)}>Next →</Button>
                </div>
              )}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold">Academic Information</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2"><label className="text-sm font-semibold">SSC/Equivalent GPA</label><Input value={form.sscGpa} onChange={(e) => update("sscGpa", e.target.value)} placeholder="e.g. 4.50" required /></div>
                    <div className="space-y-2"><label className="text-sm font-semibold">Preferred Department</label>
                      <select value={form.department} onChange={(e) => update("department", e.target.value)} className="flex h-11 w-full rounded-sm border border-input bg-background px-4 py-2 text-sm" required>
                        <option value="">Select department</option>
                        {departments.map((d) => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="rounded-sm bg-muted/60 p-4 text-sm text-muted-foreground">
                    <p className="font-semibold text-foreground">Required documents</p>
                    <ul className="mt-2 list-disc space-y-1 pl-4">
                      <li>SSC/Equivalent certificate and marksheet</li>
                      <li>Citizenship certificate (NID/Birth cert)</li>
                      <li>4 passport-size photographs</li>
                      <li>Guardian's NID copy</li>
                    </ul>
                  </div>
                  <div className="flex gap-3">
                    <Button type="button" variant="outline" className="w-full" onClick={() => setStep(1)}>← Back</Button>
                    <Button type="button" className="w-full" onClick={() => setStep(3)}>Next →</Button>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold">Review & Submit</h3>
                  <div className="grid gap-3 text-sm">
                    <div className="flex justify-between rounded-sm bg-muted/60 px-4 py-2"><span className="text-muted-foreground">Name</span><span className="font-semibold">{form.name || "-"}</span></div>
                    <div className="flex justify-between rounded-sm bg-muted/60 px-4 py-2"><span className="text-muted-foreground">Email</span><span className="font-semibold">{form.email || "-"}</span></div>
                    <div className="flex justify-between rounded-sm bg-muted/60 px-4 py-2"><span className="text-muted-foreground">Phone</span><span className="font-semibold">{form.phone || "-"}</span></div>
                    <div className="flex justify-between rounded-sm bg-muted/60 px-4 py-2"><span className="text-muted-foreground">Department</span><span className="font-semibold">{form.department || "-"}</span></div>
                    <div className="flex justify-between rounded-sm bg-muted/60 px-4 py-2"><span className="text-muted-foreground">SSC GPA</span><span className="font-semibold">{form.sscGpa || "-"}</span></div>
                    <div className="flex justify-between rounded-sm bg-muted/60 px-4 py-2"><span className="text-muted-foreground">Address</span><span className="font-semibold">{form.address || "-"}</span></div>
                  </div>
                  <div className="flex gap-3">
                    <Button type="button" variant="outline" className="w-full" onClick={() => setStep(2)}>← Back</Button>
                    <Button type="submit" className="w-full">Submit Application</Button>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}
      </section>
    </PageTransition>
  );
}
