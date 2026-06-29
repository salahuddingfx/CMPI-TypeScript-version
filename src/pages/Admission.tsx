import { useState, useEffect } from "react";
import { Check, ArrowLeft, ArrowRight, Upload, Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SEO } from "@/components/common/SEO";
import { PageTransition } from "@/components/common/PageTransition";
import { SectionHeader } from "@/components/common/SectionHeader";
import { submitAdmission, trackAdmission, fetchInstituteData } from "@/services/api";
import { useLanguage } from "@/contexts/LanguageContext";

const departments = [
  "Civil Technology",
  "Computer Science & Technology",
  "Electrical Technology",
  "Electronics Technology",
  "Telecommunications Technology",
  "Mechanical Technology",
  "Marine Technology",
];



const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

export function Admission() {
  const { language, t } = useLanguage();
  const [step, setStep] = useState(1);

  const localizedDocs = [
    { key: "ssc_certificate", label: language === "en" ? "SSC Certificate + Marksheet" : "এসএসসি সার্টিফিকেট + মার্কশিট" },
    { key: "nid_birth", label: language === "en" ? "National ID/Birth Certificate" : "জাতীয় পরিচয়পত্র/জন্ম নিবন্ধন" },
    { key: "photos", label: language === "en" ? "4 Passport-size Photographs" : "৪ কপি পাসপোর্ট সাইজের ছবি" },
    { key: "guardian_nid", label: language === "en" ? "Guardian's NID Copy" : "অভিভাবকের এনআইডি কার্ডের কপি" },
    { key: "transfer_cert", label: language === "en" ? "Transfer Certificate" : "প্রশংসাপত্র / ট্রান্সফার সার্টিফিকেট" },
    { key: "character_cert", label: language === "en" ? "Character Certificate" : "চারিত্রিক সনদপত্র" },
  ];

  const localizedDepts = departments.map(d => ({
    value: d,
    label: language === "en" ? d : (
      d === "Civil Technology" ? "সিভিল টেকনোলজি" :
      d === "Computer Science & Technology" ? "কম্পিউটার সায়েন্স অ্যান্ড টেকনোলজি" :
      d === "Electrical Technology" ? "ইলেকট্রিক্যাল টেকনোলজি" :
      d === "Electronics Technology" ? "ইলেকট্রনিক্স টেকনোলজি" :
      d === "Telecommunications Technology" ? "টেলিকমিউনিকেশনস টেকনোলজি" :
      d === "Mechanical Technology" ? "মেকানিক্যাল টেকনোলজি" :
      d === "Marine Technology" ? "মেরিন টেকনোলজি" : d
    )
  }));

  const getLocalizedPayStatus = (status: string) => {
    switch (status?.toLowerCase()) {
      case "paid": return t("tr_paid");
      case "unpaid": return t("tr_unpaid");
      default: return t("tr_pending");
    }
  };

  const getLocalizedReviewStatus = (status: string) => {
    switch (status?.toLowerCase()) {
      case "approved": return t("tr_confirmed");
      case "rejected": return "Rejected";
      default: return t("tr_pending");
    }
  };
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverAppId, setServerAppId] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "", email: "", phone: "", department: "", session: "",
    sscGpa: "", hscGpa: "", fatherName: "", motherName: "",
    address: "", bloodGroup: "",
    paymentMethod: "", txnId: "", senderNumber: "",
  });

  const [docs, setDocs] = useState<Record<string, File | null>>({});

  // Status tracking
  const [trackMode, setTrackMode] = useState(false);
  const [trackId, setTrackId] = useState("");
  const [trackResult, setTrackResult] = useState<any>(null);
  const [trackLoading, setTrackLoading] = useState(false);

  const [paymentNumbers, setPaymentNumbers] = useState({ bkash: "", nagad: "" });

  useEffect(() => {
    fetchInstituteData()
      .then((data) => {
        if (data.institute) {
          setPaymentNumbers({
            bkash: data.institute.bkash_number || "+880 1888-000000",
            nagad: data.institute.nagad_number || "+880 1888-111111",
          });
        }
      })
      .catch((err) => console.error("Failed to load payment settings", err));
  }, []);

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleDocChange = (key: string, file: File | null) => {
    setDocs((prev) => ({ ...prev, [key]: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        const apiKey = k.replace(/([A-Z])/g, "_$1").toLowerCase();
        fd.append(apiKey, v);
      });
      Object.entries(docs).forEach(([key, file]) => {
        if (file) fd.append(`doc_${key}`, file);
      });
      const res = await submitAdmission(fd);
      setServerAppId(res.application_id);
      setSubmitted(true);
    } catch (err: any) {
      setError(err.response?.data?.message || err.response?.data?.error || "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleTrack = async () => {
    if (!trackId) return;
    setTrackLoading(true);
    try {
      const res = await trackAdmission(trackId);
      setTrackResult(res);
    } catch {
      setTrackResult(null);
      setError(t("adm_track_not_found"));
    } finally {
      setTrackLoading(false);
    }
  };

  const statusColor = (s: string) => {
    switch (s?.toLowerCase()) {
      case "approved": return "text-green-600 bg-green-50 border-green-200";
      case "rejected": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-yellow-600 bg-yellow-50 border-yellow-200";
    }
  };

  const paymentStatusColor = (s: string) => {
    switch (s?.toLowerCase()) {
      case "paid": return "text-green-600 bg-green-50 border-green-200";
      case "unpaid": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-yellow-600 bg-yellow-50 border-yellow-200";
    }
  };

  return (
    <PageTransition>
      <SEO title={t("nav_admission")} description="Online admission application for CMPI diploma programs." />
      <section className="container section-pad">
        <SectionHeader
          eyebrow={t("adm_eyebrow")}
          title={t("adm_title")}
          description={t("adm_desc")}
          align="center"
          className="mb-10"
        />

        {/* Action buttons */}
        <div className="mx-auto mb-8 flex max-w-lg flex-wrap justify-center gap-3">
          <a
            href={`${API_BASE}/admissions/download-form`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 animate-fade-in"
          >
            <Download className="h-4 w-4" /> {t("adm_download_pdf")}
          </a>
          <button
            onClick={() => { setTrackMode(!trackMode); setTrackResult(null); setError(null); }}
            className="inline-flex items-center gap-2 rounded-sm border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            <Search className="h-4 w-4" /> {t("adm_track_app")}
          </button>
        </div>

        {/* Status Tracking */}
        {trackMode && (
          <div className="mx-auto mb-10 max-w-lg rounded-sm border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold">{t("adm_track_header")}</h3>
            <div className="flex gap-3">
              <Input
                value={trackId}
                onChange={(e) => setTrackId(e.target.value)}
                placeholder={t("adm_track_placeholder")}
              />
              <Button onClick={handleTrack} disabled={!trackId || trackLoading}>
                {trackLoading ? t("btn_loading") : t("adm_track_btn")}
              </Button>
            </div>
            {trackResult && (
              <div className="mt-4 rounded-sm border p-4">
                <div className="flex items-center justify-between border-b pb-2 mb-2">
                  <span className="font-mono font-bold">{trackResult.application_id}</span>
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusColor(trackResult.status)}`}>
                    {getLocalizedReviewStatus(trackResult.status)}
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div><span className="text-muted-foreground">{t("tr_name")}:</span> {trackResult.name}</div>
                  <div><span className="text-muted-foreground">{t("tr_dept")}:</span> {trackResult.department}</div>
                  <div><span className="text-muted-foreground">{t("tr_session")}:</span> {trackResult.session || "N/A"}</div>
                  <div><span className="text-muted-foreground">{t("tr_applied")}:</span> {new Date(trackResult.created_at).toLocaleDateString()}</div>
                  
                  {/* Form Submission Details */}
                  <div className="col-span-2 mt-2 pt-2 border-t font-semibold text-xs text-primary uppercase">{t("tr_form_section")}</div>
                  <div><span className="text-muted-foreground">{t("tr_pay_method")}:</span> {trackResult.payment_method || "N/A"}</div>
                  <div><span className="text-muted-foreground">{t("tr_sender_no")}:</span> <strong className="text-foreground">{trackResult.sender_number || "N/A"}</strong></div>
                  <div><span className="text-muted-foreground">{t("tr_txnid")}:</span> <strong className="font-mono text-foreground">{trackResult.txn_id || "N/A"}</strong></div>
                  <div><span className="text-muted-foreground">{t("tr_form_fee")}:</span> <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${paymentStatusColor(trackResult.payment_status)}`}>{getLocalizedPayStatus(trackResult.payment_status)}</span></div>
                  <div><span className="text-muted-foreground">{t("tr_review_status")}:</span> <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${statusColor(trackResult.status)}`}>{getLocalizedReviewStatus(trackResult.status)}</span></div>
                  
                  {/* College Admission & Board Confirmation Details */}
                  <div className="col-span-2 mt-2 pt-2 border-t font-semibold text-xs text-primary uppercase">{t("tr_college_section")}</div>
                  <div><span className="text-muted-foreground">{t("tr_adm_fee")}:</span> <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${paymentStatusColor(trackResult.admission_fee_status)}`}>{getLocalizedPayStatus(trackResult.admission_fee_status)}</span></div>
                  <div><span className="text-muted-foreground">{t("tr_board_conf")}:</span> <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${trackResult.board_confirmation === 'confirmed' ? 'text-green-600 bg-green-50 border-green-200' : 'text-yellow-600 bg-yellow-50 border-yellow-200'}`}>{trackResult.board_confirmation === 'confirmed' ? t("tr_confirmed") : t("tr_pending")}</span></div>
                </div>
                {trackResult.documents?.length > 0 && (
                  <div className="mt-3 text-sm border-t pt-2"><span className="text-muted-foreground">{language === 'en' ? 'Documents uploaded' : 'আপলোডকৃত কাগজপত্র'}:</span> {trackResult.documents.length}/6</div>
                )}
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="mx-auto mb-6 max-w-lg rounded-sm border border-red-200 bg-red-50 p-3 text-center text-sm text-red-600 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Application Form */}
        {!trackMode && (
          <>
            {submitted ? (
              <div className="mx-auto max-w-lg rounded-sm border border-green-200 bg-green-50 p-8 text-center dark:border-green-800 dark:bg-green-955/30">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-green-700 dark:text-green-400">{t("success_title")}</h2>
                <p className="mt-3 text-sm text-green-600 dark:text-green-500">
                  {t("success_body")} <span className="font-semibold">{form.email}</span>.
                </p>
                <p className="mt-2 text-sm text-green-600 dark:text-green-500">
                  {t("success_appid")}: <span className="font-mono font-bold text-foreground">{serverAppId}</span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{t("success_save_id")}</p>

                {/* What's Next Notice Box */}
                <div className="mt-6 rounded-md border border-yellow-250 bg-yellow-50/50 p-4 text-left text-xs leading-relaxed text-yellow-800 dark:border-yellow-900/40 dark:bg-yellow-955/20 dark:text-yellow-400">
                  <p className="font-extrabold text-sm uppercase mb-1.5">{t("next_steps_title")}</p>
                  <ol className="list-decimal pl-4 space-y-1.5">
                    <li>{t("next_steps_1")}</li>
                    <li>{t("next_steps_2")}</li>
                    <li>{t("next_steps_3")}</li>
                  </ol>
                </div>

                <div className="mt-6 flex flex-col gap-2">
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setStep(1);
                      setForm({ name: "", email: "", phone: "", department: "", session: "", sscGpa: "", hscGpa: "", fatherName: "", motherName: "", address: "", bloodGroup: "", paymentMethod: "", txnId: "", senderNumber: "" });
                      setDocs({});
                    }}
                  >
                    {t("success_btn_new")}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="mx-auto max-w-2xl">
                {/* Step indicators */}
                <div className="mb-8 flex items-center justify-center gap-2">
                  {[1, 2, 3, 4].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${step >= s ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>{s}</div>
                      {s < 4 && <div className={`h-0.5 w-8 ${step > s ? "bg-primary" : "bg-muted"}`} />}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="rounded-sm border bg-card p-6 shadow-sm sm:p-8">
                  {/* Step 1: Personal Info */}
                  {step === 1 && (
                    <div className="space-y-4 animate-fade-in">
                      <h3 className="text-lg font-bold">{t("step_personal")}</h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2"><label className="text-sm font-semibold">{t("lbl_fullname")}</label><Input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder={language === "en" ? "Your full name" : "আপনার পূর্ণ নাম"} required /></div>
                        <div className="space-y-2"><label className="text-sm font-semibold">{t("lbl_email")}</label><Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" required /></div>
                        <div className="space-y-2"><label className="text-sm font-semibold">{t("lbl_phone")}</label><Input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+880 1XXX-XXXXXX" required /></div>
                        <div className="space-y-2"><label className="text-sm font-semibold">{t("lbl_blood")}</label><Input value={form.bloodGroup} onChange={(e) => update("bloodGroup", e.target.value)} placeholder="A+, B+, O+, etc." /></div>
                        <div className="space-y-2"><label className="text-sm font-semibold">{t("lbl_father")}</label><Input value={form.fatherName} onChange={(e) => update("fatherName", e.target.value)} required /></div>
                        <div className="space-y-2"><label className="text-sm font-semibold">{t("lbl_mother")}</label><Input value={form.motherName} onChange={(e) => update("motherName", e.target.value)} required /></div>
                      </div>
                      <div className="space-y-2"><label className="text-sm font-semibold">{t("lbl_address")}</label><Input value={form.address} onChange={(e) => update("address", e.target.value)} placeholder={language === "en" ? "Village/Thana/District" : "গ্রাম/থানা/জেলা"} required /></div>
                      <Button type="button" className="w-full font-bold" onClick={() => setStep(2)}>{t("btn_next")} <ArrowRight className="ml-2 h-4 w-4" /></Button>
                    </div>
                  )}

                  {/* Step 2: Academic Info */}
                  {step === 2 && (
                    <div className="space-y-4 animate-fade-in">
                      <h3 className="text-lg font-bold">{t("step_academic")}</h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold">{t("lbl_session")}</label>
                          <select value={form.session} onChange={(e) => update("session", e.target.value)} className="flex h-11 w-full rounded-sm border border-input bg-background px-4 py-2 text-sm" required>
                            <option value="">{language === 'en' ? "Select session" : "সেশন সিলেক্ট করুন"}</option>
                            <option value="2025-26">2025-26</option>
                            <option value="2026-27">2026-27</option>
                            <option value="2027-28">2027-28</option>
                          </select>
                        </div>
                        <div className="space-y-2"><label className="text-sm font-semibold">{t("lbl_dept")}</label>
                          <select value={form.department} onChange={(e) => update("department", e.target.value)} className="flex h-11 w-full rounded-sm border border-input bg-background px-4 py-2 text-sm" required>
                            <option value="">{language === 'en' ? "Select department" : "বিভাগ সিলেক্ট করুন"}</option>
                            {localizedDepts.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
                          </select>
                        </div>
                        <div className="space-y-2"><label className="text-sm font-semibold">{t("lbl_ssc_gpa")}</label><Input value={form.sscGpa} onChange={(e) => update("sscGpa", e.target.value)} placeholder="e.g. 4.50" required /></div>
                        <div className="space-y-2"><label className="text-sm font-semibold">{t("lbl_hsc_gpa")}</label><Input value={form.hscGpa} onChange={(e) => update("hscGpa", e.target.value)} placeholder="e.g. 4.00" /></div>
                      </div>

                      <div className="rounded-sm bg-muted/60 p-4 text-sm text-muted-foreground">
                        <p className="font-semibold text-foreground">{t("lbl_req_docs")}</p>
                        <ul className="mt-2 list-disc space-y-1 pl-4">
                          {localizedDocs.map((d) => <li key={d.key}>{d.label}</li>)}
                        </ul>
                        <p className="mt-2 text-xs">{language === 'en' ? "Upload scanned copies below, or download the PDF form and bring documents physically." : "নিচের ধাপে স্ক্যান কপি আপলোড করুন, অথবা পিডিএফ ফরমটি ডাউনলোড করে সশরীরে কাগজপত্র জমা দিন।"}</p>
                      </div>

                      <div className="flex gap-3">
                        <Button type="button" variant="outline" className="w-full font-bold" onClick={() => setStep(1)}><ArrowLeft className="mr-2 h-4 w-4" /> {t("btn_back")}</Button>
                        <Button type="button" className="w-full font-bold" onClick={() => setStep(3)}>{t("btn_next")} <ArrowRight className="ml-2 h-4 w-4" /></Button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Document Upload */}
                  {step === 3 && (
                    <div className="space-y-4 animate-fade-in">
                      <h3 className="text-lg font-bold">{t("step_docs")}</h3>
                      <p className="text-sm text-muted-foreground">{t("lbl_doc_upload_desc")}</p>

                      <div className="grid gap-3">
                        {localizedDocs.map((doc) => (
                          <div key={doc.key} className="flex items-center gap-3 rounded-sm border p-3">
                            <Upload className="h-4 w-4 shrink-0 text-muted-foreground" />
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium">{doc.label}</div>
                              {docs[doc.key] && (
                                <div className="text-xs text-green-600 mt-1">{docs[doc.key]!.name}</div>
                              )}
                            </div>
                            <label className="cursor-pointer shrink-0 rounded-sm border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/10 transition">
                              {language === 'en' ? 'Choose File' : 'ফাইল নির্বাচন করুন'}
                              <input
                                type="file"
                                className="hidden"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => handleDocChange(doc.key, e.target.files?.[0] || null)}
                              />
                            </label>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-3">
                        <Button type="button" variant="outline" className="w-full font-bold" onClick={() => setStep(2)}><ArrowLeft className="mr-2 h-4 w-4" /> {t("btn_back")}</Button>
                        <Button type="button" className="w-full font-bold" onClick={() => setStep(4)}>{t("btn_next")} <ArrowRight className="ml-2 h-4 w-4" /></Button>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Payment & Submit */}
                  {step === 4 && (
                    <div className="space-y-4 animate-fade-in">
                      <h3 className="text-lg font-bold">{t("adm_payment_submit")}</h3>
                      
                      <div className="rounded-sm border border-yellow-250 bg-yellow-50/50 p-4 text-sm text-yellow-800 dark:border-yellow-800 dark:bg-yellow-955/30 dark:text-yellow-300">
                        <p className="font-extrabold">{t("lbl_pay_notice_title")}</p>
                        <p className="mt-1 leading-relaxed">{t("lbl_pay_notice_body")}</p>
                        <div className="mt-2 grid grid-cols-2 gap-2 text-xs font-mono">
                          <p>{language === 'en' ? 'bKash Personal' : 'বিকাশ পার্সোনাল'}: <strong>{paymentNumbers.bkash}</strong></p>
                          <p>{language === 'en' ? 'Nagad Personal' : 'নগদ পার্সোনাল'}: <strong>{paymentNumbers.nagad}</strong></p>
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-3">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold">{t("lbl_pay_method")}</label>
                          <select value={form.paymentMethod} onChange={(e) => update("paymentMethod", e.target.value)} className="flex h-11 w-full rounded-sm border border-input bg-background px-4 py-2 text-sm" required>
                            <option value="">{language === 'en' ? "Select Method" : "পদ্ধতি সিলেক্ট করুন"}</option>
                            <option value="bKash">bKash</option>
                            <option value="Nagad">Nagad</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold">{t("lbl_sender_mobile")}</label>
                          <Input value={form.senderNumber} onChange={(e) => update("senderNumber", e.target.value)} placeholder="e.g. 017XXXXXXXX" required />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold">{t("lbl_txnid")}</label>
                          <Input value={form.txnId} onChange={(e) => update("txnId", e.target.value)} placeholder="e.g. BK12X98A0L" required />
                        </div>
                      </div>

                      <h3 className="text-md font-bold pt-2 border-t">{t("lbl_review_info")}</h3>
                      <div className="grid gap-1.5 text-xs">
                        <div className="flex justify-between rounded-sm bg-muted/60 px-4 py-1.5"><span className="text-muted-foreground">{t("tr_name")}</span><span className="font-semibold">{form.name || "-"}</span></div>
                        <div className="flex justify-between rounded-sm bg-muted/60 px-4 py-1.5"><span className="text-muted-foreground">{t("tr_dept")}</span><span className="font-semibold">{form.department ? localizedDepts.find(d => d.value === form.department)?.label : "-"}</span></div>
                        <div className="flex justify-between rounded-sm bg-muted/60 px-4 py-1.5"><span className="text-muted-foreground">{t("tr_session")}</span><span className="font-semibold">{form.session || "-"}</span></div>
                        <div className="flex justify-between rounded-sm bg-muted/60 px-4 py-1.5"><span className="text-muted-foreground">{t("lbl_ssc_gpa")}</span><span className="font-semibold">{form.sscGpa || "-"}</span></div>
                        <div className="flex justify-between rounded-sm bg-muted/60 px-4 py-1.5"><span className="text-muted-foreground">{language === 'en' ? 'Documents' : 'কাগজপত্র'}</span><span className="font-semibold">{Object.values(docs).filter(Boolean).length} / {localizedDocs.length} {language === 'en' ? 'uploaded' : 'আপলোড করা হয়েছে'}</span></div>
                      </div>

                      <div className="flex gap-3">
                        <Button type="button" variant="outline" className="w-full font-bold" onClick={() => setStep(3)}><ArrowLeft className="mr-2 h-4 w-4" /> {t("btn_back")}</Button>
                        <Button type="submit" className="w-full font-black shadow-lg shadow-primary/20" disabled={submitting}>
                          {submitting ? t("btn_submitting") : t("btn_complete")}
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            )}
          </>
        )}
      </section>
    </PageTransition>
  );
}
