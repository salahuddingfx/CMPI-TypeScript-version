import React, { createContext, useContext, useEffect, useState, useMemo } from "react";

export type Language = "en" | "bn";

// UI Static Translation Dictionary
const dictionary: Record<Language, Record<string, string>> = {
  en: {
    // Navigation / Header
    nav_home: "Home",
    nav_about: "About",
    nav_about_us: "About Us",
    nav_admin_messages: "Administration Messages",
    nav_faculty: "Faculty",
    nav_academics: "Academics",
    nav_civil: "Civil Technology",
    nav_computer: "Computer Science & Technology",
    nav_electrical: "Electrical Technology",
    nav_results: "Results",
    nav_syllabus: "Syllabus & Curriculum",
    nav_class_routine: "Class Routine",
    nav_exam_routine: "Exam Routine",
    nav_notice_board: "Notice Board",
    nav_student_life: "Student Life",
    nav_clubs: "Student Clubs",
    nav_library: "Library",
    nav_gallery: "Gallery",
    nav_alumni: "Alumni",
    nav_admission: "Admission",
    nav_contact: "Contact",
    nav_dashboard: "Dashboard",
    nav_login: "Student Login",
    nav_logout: "Logout",
    nav_admin: "Admin Space",

    // Common / Buttons
    btn_next: "Next",
    btn_back: "Back",
    btn_submit: "Submit",
    btn_submitting: "Submitting...",
    btn_close: "Close",
    btn_loading: "Loading...",
    btn_reset: "Reset",

    // Admission Page
    adm_eyebrow: "Admission Portal",
    adm_title: "Apply for diploma programs",
    adm_desc: "Fill in the application form below. You can also download the form and submit it physically.",
    adm_download_pdf: "Download PDF Form",
    adm_track_app: "Track Application",
    
    // Admission Tracker Section
    adm_track_header: "Track Your Application",
    adm_track_placeholder: "Enter Application ID (e.g. CMPI-ADM-000123)",
    adm_track_btn: "Track Status",
    adm_track_not_found: "Application not found. Check your Application ID.",
    
    // Tracker Results
    tr_name: "Name",
    tr_dept: "Department",
    tr_session: "Session",
    tr_applied: "Applied Date",
    tr_form_section: "Form Submission Details",
    tr_pay_method: "Payment Method",
    tr_sender_no: "Sender's No",
    tr_txnid: "TxnID",
    tr_form_fee: "Form Fee Status",
    tr_review_status: "Review Status",
    tr_college_section: "College Admission & Board Confirmation",
    tr_adm_fee: "Admission Fee Status",
    tr_board_conf: "Board Confirmation",
    tr_unpaid: "Unpaid",
    tr_paid: "Paid",
    tr_pending: "Pending",
    tr_confirmed: "Confirmed",

    // Admission Steps
    step_personal: "Personal Information",
    step_academic: "Academic Information",
    step_docs: "Upload Documents",
    step_payment: "Payment & Submit",

    // Step 1 Labels
    lbl_fullname: "Full Name",
    lbl_email: "Email Address",
    lbl_phone: "Phone Number",
    lbl_blood: "Blood Group",
    lbl_father: "Father's Name",
    lbl_mother: "Mother's Name",
    lbl_address: "Residential Address",

    // Step 2 Labels
    lbl_session: "Admission Session",
    lbl_dept: "Preferred Department",
    lbl_ssc_gpa: "SSC/Equivalent GPA",
    lbl_hsc_gpa: "HSC/Equivalent GPA (optional)",
    lbl_req_docs: "Required Documents (Bring Scanned or Physical Copies)",

    // Step 3 Labels
    lbl_doc_upload_desc: "Upload scanned copies of required documents. All fields are optional — you can also submit documents physically at the institute.",

    // Step 4 Labels
    lbl_pay_notice_title: "Notice: BDT 500 Application Fee Required",
    lbl_pay_notice_body: "Please Send Money of BDT 500 to our official Personal Numbers using bKash or Nagad. Enter your payment details below to complete your admission application.",
    lbl_pay_method: "Payment Method",
    lbl_sender_mobile: "Sender's Mobile No",
    lbl_txnid: "Transaction ID (TxnID)",
    lbl_review_info: "Review Information",
    btn_complete: "Submit & Complete",

    // Success Screen
    success_title: "Application Submitted!",
    success_body: "Your application has been received. A confirmation email was sent to",
    success_appid: "Application ID",
    success_save_id: "Save this ID to track your application status.",
    success_btn_new: "Submit Another Application",
    
    // Success Next Steps
    next_steps_title: "What to do next?",
    next_steps_1: "Use your Application ID above to track your application status.",
    next_steps_2: "Wait for admin review. Once your application status is updated to Approved, you must contact the college/institute to finalize your admission.",
    next_steps_3: "Visit the college office or contact administration to submit the main Admission Fee and complete your board registration processes.",

    // Student Dashboard Overview
    db_enrolled_courses: "Enrolled Courses",
    db_cgpa: "Institute CGPA",
    db_pending_bills: "Pending Bills",
    db_results_pub: "Results Published",
    db_board_results: "BTEB Board Results",
    db_view_all_results: "View Full Results",
  },
  bn: {
    // Navigation / Header
    nav_home: "হোম",
    nav_about: "আমাদের সম্পর্কে",
    nav_about_us: "আমাদের তথ্য",
    nav_admin_messages: "প্রশাসনিক বাণী",
    nav_faculty: "শিক্ষকমণ্ডলী",
    nav_academics: "একাডেমিকস",
    nav_civil: "সিভিল টেকনোলজি",
    nav_computer: "কম্পিউটার টেকনোলজি",
    nav_electrical: "ইলেকট্রিক্যাল টেকনোলজি",
    nav_results: "ফলাফল",
    nav_syllabus: "সিলেবাস",
    nav_class_routine: "ক্লাস রুটিন",
    nav_exam_routine: "পরীক্ষার রুটিন",
    nav_notice_board: "নোটিশ বোর্ড",
    nav_student_life: "ছাত্র জীবন",
    nav_clubs: "স্টুডেন্ট ক্লাবসমূহ",
    nav_library: "লাইব্রেরি",
    nav_gallery: "গ্যালারি",
    nav_alumni: "অ্যালামনাই",
    nav_admission: "ভর্তি",
    nav_contact: "যোগাযোগ",
    nav_dashboard: "ড্যাশবোর্ড",
    nav_login: "স্টুডেন্ট লগইন",
    nav_logout: "লগআউট",
    nav_admin: "অ্যাডমিন স্পেস",

    // Common / Buttons
    btn_next: "পরবর্তী",
    btn_back: "পূর্ববর্তী",
    btn_submit: "সাবমিট",
    btn_submitting: "সাবমিট হচ্ছে...",
    btn_close: "বন্ধ করুন",
    btn_loading: "লোড হচ্ছে...",
    btn_reset: "রিসেট",

    // Admission Page
    adm_eyebrow: "ভর্তি পোর্টাল",
    adm_title: "ডিপ্লোমা কোর্সে ভর্তির আবেদন",
    adm_desc: "নিচের আবেদনপত্রটি পূরণ করুন। এছাড়া পিডিএফ ফর্ম ডাউনলোড করে সরাসরি অফিসেও জমা দিতে পারেন।",
    adm_download_pdf: "পিডিএফ ফর্ম ডাউনলোড",
    adm_track_app: "আবেদন ট্র্যাক করুন",
    
    // Admission Tracker Section
    adm_track_header: "আপনার আবেদন ট্র্যাক করুন",
    adm_track_placeholder: "আবেদন আইডি দিন (যেমন: CMPI-ADM-000123)",
    adm_track_btn: "অবস্থা দেখুন",
    adm_track_not_found: "আবেদনটি খুঁজে পাওয়া যায়নি। আইডিটি পুনরায় পরীক্ষা করুন।",
    
    // Tracker Results
    tr_name: "নাম",
    tr_dept: "বিভাগ",
    tr_session: "সেশন",
    tr_applied: "আবেদনের তারিখ",
    tr_form_section: "আবেদন ফর্ম জমার বিবরণ",
    tr_pay_method: "পেমেন্ট পদ্ধতি",
    tr_sender_no: "প্রেরক নম্বর",
    tr_txnid: "ট্রানজেকশন আইডি",
    tr_form_fee: "আবেদন ফি অবস্থা",
    tr_review_status: "রিভিউ স্ট্যাটাস",
    tr_college_section: "কলেজ ভর্তি ও বোর্ড নিশ্চিতকরণ",
    tr_adm_fee: "ভর্তি ফি অবস্থা",
    tr_board_conf: "বোর্ড নিশ্চিতকরণ",
    tr_unpaid: "পরিশোধ করা হয়নি",
    tr_paid: "পরিশোধিত",
    tr_pending: "পেন্ডিং",
    tr_confirmed: "নিশ্চিত করা হয়েছে",

    // Admission Steps
    step_personal: "ব্যক্তিগত তথ্যাবলী",
    step_academic: "একাডেমিক তথ্যাবলী",
    step_docs: "ডকুমেন্ট আপলোড",
    step_payment: "পেমেন্ট ও সাবমিট",

    // Step 1 Labels
    lbl_fullname: "পূর্ণ নাম",
    lbl_email: "ইমেইল এড্রেস",
    lbl_phone: "মোবাইল নম্বর",
    lbl_blood: "রক্তের গ্রুপ",
    lbl_father: "পিতার নাম",
    lbl_mother: "মাতার নাম",
    lbl_address: "স্থায়ী ঠিকানা",

    // Step 2 Labels
    lbl_session: "ভর্তি সেশন",
    lbl_dept: "পছন্দসই বিভাগ",
    lbl_ssc_gpa: "এসএসসি/সমমান জিপিএ",
    lbl_hsc_gpa: "এইচএসসি/সমমান জিপিএ (ঐচ্ছিক)",
    lbl_req_docs: "প্রয়োজনীয় কাগজপত্র (স্ক্যান কপি অথবা অফিসে নিয়ে আসুন)",

    // Step 3 Labels
    lbl_doc_upload_desc: "প্রয়োজনীয় কাগজপত্রের স্ক্যান কপি আপলোড করুন। সব ফিল্ড ঐচ্ছিক — আপনি চাইলে সরাসরি ইনস্টিটিউট অফিসে এসেও কাগজপত্র জমা দিতে পারবেন।",

    // Step 4 Labels
    lbl_pay_notice_title: "বিজ্ঞপ্তি: ৫০০ টাকা আবেদন ফি আবশ্যক",
    lbl_pay_notice_body: "অনুগ্রহ করে আমাদের অফিশিয়াল পার্সোনাল নম্বরে বিকাশ অথবা নগদের মাধ্যমে ৫০০ টাকা Send Money করুন। আবেদন সম্পন্ন করতে নিচে পেমেন্টের তথ্য প্রদান করুন।",
    lbl_pay_method: "পেমেন্ট পদ্ধতি",
    lbl_sender_mobile: "প্রেরকের মোবাইল নম্বর",
    lbl_txnid: "ট্রানজেকশন আইডি (TxnID)",
    lbl_review_info: "তথ্য যাচাই করুন",
    btn_complete: "সাবমিট ও সম্পন্ন করুন",

    // Success Screen
    success_title: "আবেদনপত্র সফলভাবে সাবমিট হয়েছে!",
    success_body: "আপনার আবেদনপত্রটি সফলভাবে গৃহিত হয়েছে। একটি নিশ্চিতকরণ ইমেইল পাঠানো হয়েছে এই ঠিকানায়:",
    success_appid: "আবেদন আইডি",
    success_save_id: "ভর্তির অগ্রগতি ট্র্যাকিং করার জন্য এই আইডিটি সংরক্ষণ করুন।",
    success_btn_new: "আরেকটি আবেদন করুন",
    
    // Success Next Steps
    next_steps_title: "পরবর্তী করণীয় কী?",
    next_steps_1: "আপনার আবেদনের অগ্রগতি জানতে উপরে দেওয়া আবেদন আইডি ব্যবহার করুন।",
    next_steps_2: "অ্যাডমিন রিভিউ-এর জন্য অপেক্ষা করুন। আপনার আবেদনের অবস্থা Approved দেখালে ভর্তির প্রক্রিয়া সম্পন্ন করার জন্য অবশ্যই কলেজের সাথে যোগাযোগ করুন।",
    next_steps_3: "কলেজ অফিসে যোগাযোগ করে নির্ধারিত ভর্তি ফি পরিশোধ করুন এবং বোর্ডের চূড়ান্ত রেজিস্ট্রেশন নিশ্চিত করুন।",

    // Student Dashboard Overview
    db_enrolled_courses: "ভর্তিকৃত কোর্সসমূহ",
    db_cgpa: "ইনস্টিটিউট CGPA",
    db_pending_bills: "বকেয়া বিলসমূহ",
    db_results_pub: "প্রকাশিত ফলাফল",
    db_board_results: "BTEB বোর্ড ফলাফল",
    db_view_all_results: "সব ফলাফল দেখুন",
  }
};

interface LanguageContextValue {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem("cmpi-language");
  if (stored === "en" || stored === "bn") return stored;
  return "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => getInitialLanguage());

  useEffect(() => {
    window.localStorage.setItem("cmpi-language", language);
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      toggleLanguage: () => setLanguage((current) => (current === "en" ? "bn" : "en")),
      t: (key: string) => {
        return dictionary[language]?.[key] || key;
      }
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
