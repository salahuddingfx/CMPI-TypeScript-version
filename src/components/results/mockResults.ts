import type { StudentResult } from "./ResultTypes";
// ── Demo data for the mock student transcript tab ─────────────────────────────
// This is intentionally hardcoded demo data for the "Student Transcript (ID)"
// search mode, which shows pre-loaded sample transcripts using institute-issued
// student IDs. Real board results are fetched from the BTEB API by roll number.

export const mockResults: Record<string, StudentResult> = {
  "CMPI-2023-0456": {
    studentId: "CMPI-2023-0456", name: "Rahim Miah", dept: "Computer Science & Technology",
    roll: "232345", reg: "2023456789", institute: "Cox's Bazar Model Polytechnic Institute",
    board: "Bangladesh Technical Education Board (BTEB)", cgpa: 3.68,
    semesters: [
      {
        semester: "3rd", session: "2024–25", holdingYear: "2025", sgpa: 3.75,
        totalCredit: 15, earnedCredit: 15, status: "Passed",
        courses: [
          { code: "CST-301", name: "Web Development", credit: 3, grade: "A+", gp: 4.0, remarks: "Passed" },
          { code: "CST-302", name: "Database Management", credit: 3, grade: "A", gp: 3.75, remarks: "Passed" },
          { code: "CST-303", name: "Computer Networks", credit: 3, grade: "A", gp: 3.75, remarks: "Passed" },
          { code: "CST-304", name: "Software Engineering", credit: 3, grade: "B+", gp: 3.25, remarks: "Passed" },
          { code: "CST-305", name: "Operating Systems", credit: 3, grade: "A-", gp: 3.50, remarks: "Passed" },
        ],
      },
      {
        semester: "2nd", session: "2023–24", holdingYear: "2024", sgpa: 3.60,
        totalCredit: 15, earnedCredit: 15, status: "Passed",
        courses: [
          { code: "CST-201", name: "Programming II", credit: 3, grade: "A", gp: 3.75, remarks: "Passed" },
          { code: "CST-202", name: "Mathematics II", credit: 3, grade: "A-", gp: 3.50, remarks: "Passed" },
          { code: "CST-203", name: "Data Structures", credit: 3, grade: "A", gp: 3.75, remarks: "Passed" },
          { code: "CST-204", name: "Digital Logic", credit: 3, grade: "B+", gp: 3.25, remarks: "Passed" },
          { code: "CST-205", name: "English II", credit: 3, grade: "A+", gp: 4.0, remarks: "Passed" },
        ],
      },
      {
        semester: "1st", session: "2023–24", holdingYear: "2023", sgpa: 3.70,
        totalCredit: 15, earnedCredit: 15, status: "Passed",
        courses: [
          { code: "CST-101", name: "Mathematics I", credit: 3, grade: "A", gp: 3.75, remarks: "Passed" },
          { code: "CST-102", name: "Physics", credit: 3, grade: "A-", gp: 3.50, remarks: "Passed" },
          { code: "CST-103", name: "English I", credit: 3, grade: "A+", gp: 4.0, remarks: "Passed" },
          { code: "CST-104", name: "Basic IT", credit: 3, grade: "A+", gp: 4.0, remarks: "Passed" },
          { code: "CST-105", name: "Programming I", credit: 3, grade: "A", gp: 3.75, remarks: "Passed" },
        ],
      },
    ],
  },
  "CMPI-2023-0312": {
    studentId: "CMPI-2023-0312", name: "Fatima Khatun", dept: "Civil Technology",
    roll: "232078", reg: "2023102233", institute: "Cox's Bazar Model Polytechnic Institute",
    board: "Bangladesh Technical Education Board (BTEB)", cgpa: 3.85,
    semesters: [
      {
        semester: "3rd", session: "2024–25", holdingYear: "2025", sgpa: 3.85,
        totalCredit: 15, earnedCredit: 15, status: "Passed",
        courses: [
          { code: "CIV-301", name: "Structural Analysis", credit: 3, grade: "A+", gp: 4.0, remarks: "Passed" },
          { code: "CIV-302", name: "Surveying II", credit: 3, grade: "A", gp: 3.75, remarks: "Passed" },
          { code: "CIV-303", name: "Construction Materials", credit: 3, grade: "A+", gp: 4.0, remarks: "Passed" },
          { code: "CIV-304", name: "Geotechnical Engineering", credit: 3, grade: "A-", gp: 3.50, remarks: "Passed" },
          { code: "CIV-305", name: "Environmental Engineering", credit: 3, grade: "A", gp: 3.75, remarks: "Passed" },
        ],
      },
    ],
  },
};
