export const studentProfile = {
  name: "Rahim Miah",
  studentId: "CMPI-2023-0456",
  department: "Computer Science & Technology",
  semester: "4th",
  session: "2023-2024",
  email: "rahim@cmpi.edu.bd",
  phone: "+880 1XXX-XXXXXX",
  admissionDate: "2023-06-15",
  guardian: "Karim Miah (Father)",
  bloodGroup: "A+",
  address: "Cox's Bazar, Bangladesh",
};

export const enrolledCourses = [
  { code: "CST-301", title: "Web Development", instructor: "Engr. Akter", progress: 72, attendance: "88%", nextClass: "Mon 10:00 AM" },
  { code: "CST-302", title: "Database Management", instructor: "Engr. Nasrin", progress: 60, attendance: "92%", nextClass: "Tue 11:30 AM" },
  { code: "CST-303", title: "Computer Networks", instructor: "Engr. Hossain", progress: 84, attendance: "95%", nextClass: "Wed 09:00 AM" },
];

export const courseResults = [
  { semester: "3rd", sgpa: 3.75, courses: [
    { name: "Programming", grade: "A+", gp: 4.0 },
    { name: "Mathematics", grade: "A", gp: 3.75 },
  ]},
  { semester: "2nd", sgpa: 3.60, courses: [
    { name: "Electronics", grade: "A", gp: 3.75 },
    { name: "English", grade: "A-", gp: 3.50 },
  ]},
];

export const bills = [
  { id: 1, title: "Semester Tuition Fee", amount: 12500, due: "2026-07-15", status: "pending" },
  { id: 2, title: "Lab Fee", amount: 2000, due: "2026-07-30", status: "pending" },
  { id: 3, title: "Examination Fee", amount: 1500, due: "2026-08-10", status: "pending" },
];
