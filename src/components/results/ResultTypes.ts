// ── Shared TypeScript interfaces for the Results portal ───────────────────────

export interface CourseResult {
  code: string;
  name: string;
  credit: number;
  grade: string;
  gp: number;
  remarks: string;
}

export interface SemesterResult {
  semester: string;
  session: string;
  holdingYear: string;
  sgpa: number;
  totalCredit: number;
  earnedCredit: number;
  status: "Passed" | "Failed" | "Withheld";
  courses: CourseResult[];
}

export interface StudentResult {
  studentId: string;
  name: string;
  dept: string;
  roll: string;
  reg: string;
  institute: string;
  board: string;
  cgpa: number;
  semesters: SemesterResult[];
}

export interface BtebResultPayload {
  id: number;
  roll: string;
  department: string;
  semester: string;
  regulation: string;
  holding_year: string;
  gpa: string | null;
  status: "Passed" | "Referred";
  referred_subjects: string[] | null;
  raw_text: string | null;
  exam_type: string | null;
  center_code: string | null;
  institute_name: string | null;
  created_at: string;
}

export type SearchMode = "transcript" | "bteb" | "cgpa";
