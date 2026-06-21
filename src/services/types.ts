export type DepartmentSlug = "civil-technology" | "computer-science-technology" | "electrical-technology";

export interface Department {
  id: string;
  slug: DepartmentSlug;
  title: string;
  shortTitle: string;
  description: string;
  overview: string;
  objectives: string[];
  labs: string[];
  achievements: string[];
  careerOpportunities: string[];
  facultyIds: string[];
}

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  department: DepartmentSlug | "Administration";
  qualification: string;
  email: string;
  phone: string;
  specialization: string[];
}

export interface Notice {
  id: string;
  title: string;
  category: "Admission" | "Exam" | "Holiday" | "Tender" | "Result" | "General";
  date: string;
  summary: string;
  details: string;
  fileUrl?: string;
}

export interface InstituteEvent {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  time: string;
  venue: string;
  category: "Seminar" | "Workshop" | "Cultural" | "Sports" | "Academic";
  status: "Upcoming" | "Past";
  summary: string;
  details: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  relatedIds?: string[];
}

export interface GalleryAlbum {
  id: string;
  title: string;
  count: number;
  description: string;
  accent: string;
}

export interface StudentResource {
  id: string;
  title: string;
  type: "PDF" | "XLS" | "DOC" | "Link";
  description: string;
  updatedAt: string;
}

export interface Subject {
  id?: number;
  department: string;
  semester: string;
  subject_code: string;
  subject_name: string;
  credit: number;
  theory_marks?: number;
  practical_marks?: number;
  total_marks?: number;
}

export interface InstituteData {
  stats: Array<{ label: string; value: string }>;
  facilities: Array<{ title: string; description: string }>;
  achievements: Array<{ title: string; description: string }>;
  departments: Department[];
  faculty: FacultyMember[];
  notices: Notice[];
  events: InstituteEvent[];
  blogs: BlogPost[];
  albums: GalleryAlbum[];
  resources: StudentResource[];
  faqs: Array<{ question: string; answer: string }>;
}
