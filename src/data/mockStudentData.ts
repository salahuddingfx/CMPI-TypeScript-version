export interface StudentUser {
  id: string;
  name: string;
  email: string;
  password: string;
  department: string;
  studentId: string;
  semester: string;
  session: string;
  phone: string;
  guardian: string;
  bloodGroup: string;
  address: string;
  admissionDate: string;
}

export const students: StudentUser[] = [
  {
    id: "rahim",
    name: "Rahim Miah",
    email: "rahim.cst@cmpi.edu.bd",
    password: "rahim123",
    department: "Computer Science & Technology",
    studentId: "CMPI-2023-0456",
    semester: "4th",
    session: "2023-2024",
    phone: "+880 1XXX-XXXXXX",
    guardian: "Karim Miah (Father)",
    bloodGroup: "A+",
    address: "Cox's Bazar, Bangladesh",
    admissionDate: "2023-06-15",
  },
  {
    id: "fatima",
    name: "Fatima Khatun",
    email: "fatima.civil@cmpi.edu.bd",
    password: "fatima123",
    department: "Civil Technology",
    studentId: "CMPI-2023-0312",
    semester: "4th",
    session: "2023-2024",
    phone: "+880 1XXX-XXXXXX",
    guardian: "Abdul Kader (Father)",
    bloodGroup: "B+",
    address: "Teknaf, Cox's Bazar",
    admissionDate: "2023-06-15",
  },
  {
    id: "arif",
    name: "Arif Rahman",
    email: "arif.eee@cmpi.edu.bd",
    password: "arif123",
    department: "Electrical Technology",
    studentId: "CMPI-2024-0108",
    semester: "2nd",
    session: "2024-2025",
    phone: "+880 1XXX-XXXXXX",
    guardian: "Hasan Rahman (Father)",
    bloodGroup: "O+",
    address: "Chakaria, Cox's Bazar",
    admissionDate: "2024-01-10",
  },
  {
    id: "admin",
    name: "Admin User",
    email: "admin@cmpi.edu.bd",
    password: "admin123",
    department: "Administration",
    studentId: "ADMIN-001",
    semester: "-",
    session: "-",
    phone: "+880 341-000000",
    guardian: "-",
    bloodGroup: "-",
    address: "College Road, Cox's Bazar 4750",
    admissionDate: "-",
  },
];

export interface WebmailEmail {
  id: string;
  from: string;
  to: string;
  subject: string;
  preview: string;
  body: string;
  date: string;
  folder: "inbox" | "sent" | "drafts" | "trash" | "archive" | "spam";
  read: boolean;
  starred: boolean;
  label: "work" | "personal" | "urgent" | null;
}

export function getEmailsForUser(userEmail: string): WebmailEmail[] {
  const inboxPrefix = userEmail.split("@")[0] ?? "";

  const allEmails: WebmailEmail[] = [
    // Emails TO rahim.cst@cmpi.edu.bd
    { id: "r1", from: "admin@cmpi.edu.bd", to: "rahim.cst@cmpi.edu.bd", subject: "Welcome to CMPI Student Email", preview: "Your institute email account has been created.", body: "Dear Rahim,\n\nYour student email account rahim.cst@cmpi.edu.bd has been created. Use this to communicate with faculty and access official institute communications.\n\nBest regards,\nCMPI Admin", date: "2026-06-18", folder: "inbox", read: false, starred: true, label: "work" },
    { id: "r2", from: "exam@cmpi.edu.bd", to: "rahim.cst@cmpi.edu.bd", subject: "Mid-term examination routine published", preview: "The mid-term exam routine is now available.", body: "Dear Rahim Miah,\n\nThe mid-term examination routine for 4th semester CST department has been published. Please check the Notice Board for details.\n\nBest regards,\nExam Controller", date: "2026-06-17", folder: "inbox", read: false, starred: false, label: "urgent" },
    { id: "r3", from: "tanjila.cst@cmpi.edu.bd", to: "rahim.cst@cmpi.edu.bd", subject: "Web Development assignment deadline", preview: "The deadline for the web dev project has been...", body: "Dear Rahim,\n\nThe deadline for the responsive web development project has been extended to June 25th. Make sure to submit your final deployment link.\n\nBest,\nEngr. Tanjila Rahman\nHead, CST Department", date: "2026-06-16", folder: "inbox", read: true, starred: false, label: "work" },
    { id: "r4", from: "lab@cmpi.edu.bd", to: "rahim.cst@cmpi.edu.bd", subject: "Database lab assignment 3", preview: "Complete SQL exercises for the database lab...", body: "Dear Students,\n\nComplete the SQL join exercises for Database Lab Assignment 3. Deadline: June 20th.\n\nBest,\nLab Instructor", date: "2026-06-15", folder: "inbox", read: true, starred: false, label: "work" },
    { id: "r5", from: "rahim.cst@cmpi.edu.bd", to: "admin@cmpi.edu.bd", subject: "Leave application", preview: "I am requesting leave for...", body: "Respected Sir,\n\nI am requesting leave for 2 days due to personal reasons.\n\nThank you.\nRahim Miah\nCMPI-2023-0456", date: "2026-06-16", folder: "sent", read: true, starred: false, label: "personal" },
    { id: "r6", from: "rahim.cst@cmpi.edu.bd", to: "tanjila.cst@cmpi.edu.bd", subject: "Project submission - React app", preview: "I have completed the web development project...", body: "Dear Ma'am,\n\nI have completed the web development project. Here is the deployment link: https://rahim-cmpi.vercel.app\n\nPlease let me know if any changes are needed.\n\nBest,\nRahim", date: "2026-06-14", folder: "sent", read: true, starred: true, label: "work" },
    { id: "r7", from: "rahim.cst@cmpi.edu.bd", to: "fatima.civil@cmpi.edu.bd", subject: "Project collaboration", preview: "Hi Fatima, would you like to collaborate on...", body: "Hi Fatima,\n\nWould you like to collaborate on the inter-department tech exhibition project? We need a civil technology perspective for the smart building model.\n\nLet me know.\nRahim", date: "2026-06-13", folder: "sent", read: true, starred: false, label: null },

    // Emails TO fatima.civil@cmpi.edu.bd
    { id: "f1", from: "admin@cmpi.edu.bd", to: "fatima.civil@cmpi.edu.bd", subject: "Welcome to CMPI Student Email", preview: "Your institute email account has been created.", body: "Dear Fatima,\n\nYour student email account fatima.civil@cmpi.edu.bd has been created. Use this to communicate with faculty and access official institute communications.\n\nBest regards,\nCMPI Admin", date: "2026-06-18", folder: "inbox", read: false, starred: false, label: "work" },
    { id: "f2", from: "nasrin.civil@cmpi.edu.bd", to: "fatima.civil@cmpi.edu.bd", subject: "Surveying field work schedule", preview: "The surveying field work has been scheduled...", body: "Dear Fatima,\n\nThe surveying field work for this week has been scheduled for Saturday. Bring your leveling instrument and field book.\n\nBest,\nEngr. Nasrin Akter\nHead, Civil Department", date: "2026-06-17", folder: "inbox", read: false, starred: false, label: "urgent" },
    { id: "f3", from: "rahim.cst@cmpi.edu.bd", to: "fatima.civil@cmpi.edu.bd", subject: "Project collaboration", preview: "Hi Fatima, would you like to collaborate on...", body: "Hi Fatima,\n\nWould you like to collaborate on the inter-department tech exhibition project? We need a civil technology perspective for the smart building model.\n\nLet me know.\nRahim", date: "2026-06-13", folder: "inbox", read: true, starred: false, label: null },
    { id: "f4", from: "fatima.civil@cmpi.edu.bd", to: "rahim.cst@cmpi.edu.bd", subject: "Re: Project collaboration", preview: "Hi Rahim, sure I would love to collaborate...", body: "Hi Rahim,\n\nSure, I would love to collaborate on the smart building model. I can bring structural analysis and CAD expertise.\n\nLet's meet at the lab tomorrow.\n\nBest,\nFatima", date: "2026-06-13", folder: "sent", read: true, starred: false, label: null },

    // Emails TO arif.eee@cmpi.edu.bd
    { id: "a1", from: "admin@cmpi.edu.bd", to: "arif.eee@cmpi.edu.bd", subject: "Welcome to CMPI Student Email", preview: "Your institute email account has been created.", body: "Dear Arif,\n\nYour student email account arif.eee@cmpi.edu.bd has been created. Welcome to CMPI.\n\nBest regards,\nCMPI Admin", date: "2026-06-18", folder: "inbox", read: false, starred: false, label: "work" },
    { id: "a2", from: "mizan.electrical@cmpi.edu.bd", to: "arif.eee@cmpi.edu.bd", subject: "Power electronics lab report", preview: "Submit your lab report on thyristor circuits...", body: "Dear Arif,\n\nSubmit your lab report on thyristor circuits by next Monday. Follow the standard report format.\n\nBest,\nEngr. Mizanur Rahman\nHead, Electrical Department", date: "2026-06-17", folder: "inbox", read: false, starred: false, label: "work" },

    // Shared institute emails
    { id: "i1", from: "admin@cmpi.edu.bd", to: "all-students@cmpi.edu.bd", subject: "Eid-ul-Adha Holiday Announcement", preview: "The institute will remain closed for Eid-ul-Adha vacation.", body: "Dear Students,\n\nThe institute will remain closed for Eid-ul-Adha vacation from June 28 to July 3, 2026 as per government guidelines.\n\nRegular academic activities will resume on July 4.\n\nBest regards,\nAdministration", date: "2026-06-15", folder: "inbox", read: true, starred: false, label: null },
    { id: "i2", from: "exam@cmpi.edu.bd", to: "all-students@cmpi.edu.bd", subject: "Result publication - 3rd semester", preview: "3rd semester results have been published.", body: "Dear Students,\n\nThe 3rd semester final examination results have been published. Check the student portal for details.\n\nBest regards,\nExam Controller", date: "2026-06-10", folder: "inbox", read: true, starred: false, label: null },
  ];

  return allEmails.filter((e) => {
    if (e.to === userEmail || e.to === "all-students@cmpi.edu.bd") return true;
    if (e.from === userEmail) return true;
    return false;
  });
}
