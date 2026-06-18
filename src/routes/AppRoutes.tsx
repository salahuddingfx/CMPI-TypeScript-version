import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { StudentLayout } from "@/layouts/StudentLayout";
import { AuthGuard } from "@/components/common/AuthGuard";
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";

const Home = lazy(() => import("@/pages/Home").then((m) => ({ default: m.Home })));
const About = lazy(() => import("@/pages/About").then((m) => ({ default: m.About })));
const Academics = lazy(() => import("@/pages/Academics").then((m) => ({ default: m.Academics })));
const DepartmentPage = lazy(() => import("@/pages/DepartmentPage").then((m) => ({ default: m.DepartmentPage })));
const Faculty = lazy(() => import("@/pages/Faculty").then((m) => ({ default: m.Faculty })));
const NoticeBoard = lazy(() => import("@/pages/NoticeBoard").then((m) => ({ default: m.NoticeBoard })));
const NoticeDetails = lazy(() => import("@/pages/NoticeDetails").then((m) => ({ default: m.NoticeDetails })));
const Events = lazy(() => import("@/pages/Events").then((m) => ({ default: m.Events })));
const EventDetails = lazy(() => import("@/pages/EventDetails").then((m) => ({ default: m.EventDetails })));
const Gallery = lazy(() => import("@/pages/Gallery").then((m) => ({ default: m.Gallery })));
const Blog = lazy(() => import("@/pages/Blog").then((m) => ({ default: m.Blog })));
const BlogDetails = lazy(() => import("@/pages/BlogDetails").then((m) => ({ default: m.BlogDetails })));
const Admission = lazy(() => import("@/pages/Admission").then((m) => ({ default: m.Admission })));
const StudentCorner = lazy(() => import("@/pages/StudentCorner").then((m) => ({ default: m.StudentCorner })));
const Contact = lazy(() => import("@/pages/Contact").then((m) => ({ default: m.Contact })));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy").then((m) => ({ default: m.PrivacyPolicy })));
const TermsAndConditions = lazy(() => import("@/pages/TermsAndConditions").then((m) => ({ default: m.TermsAndConditions })));
const CookiePolicy = lazy(() => import("@/pages/CookiePolicy").then((m) => ({ default: m.CookiePolicy })));
const RefundPolicy = lazy(() => import("@/pages/RefundPolicy").then((m) => ({ default: m.RefundPolicy })));
const Disclaimer = lazy(() => import("@/pages/Disclaimer").then((m) => ({ default: m.Disclaimer })));
const Accessibility = lazy(() => import("@/pages/Accessibility").then((m) => ({ default: m.Accessibility })));
const Sitemap = lazy(() => import("@/pages/Sitemap").then((m) => ({ default: m.Sitemap })));
const Login = lazy(() => import("@/pages/Login").then((m) => ({ default: m.Login })));
const Register = lazy(() => import("@/pages/Register").then((m) => ({ default: m.Register })));
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword").then((m) => ({ default: m.ForgotPassword })));
const Dashboard = lazy(() => import("@/pages/Dashboard").then((m) => ({ default: m.Dashboard })));
const StudentCourses = lazy(() => import("@/pages/dashboard/StudentCourses").then((m) => ({ default: m.StudentCourses })));
const StudentResults = lazy(() => import("@/pages/dashboard/StudentResults").then((m) => ({ default: m.StudentResults })));
const StudentBills = lazy(() => import("@/pages/dashboard/StudentBills").then((m) => ({ default: m.StudentBills })));
const StudentProfile = lazy(() => import("@/pages/dashboard/StudentProfile").then((m) => ({ default: m.StudentProfile })));
const StudentWebmail = lazy(() => import("@/pages/dashboard/StudentWebmail").then((m) => ({ default: m.StudentWebmail })));
const NotFound = lazy(() => import("@/pages/NotFound").then((m) => ({ default: m.NotFound })));

function LazyPage({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<LoadingSkeleton />}>{children}</Suspense>;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<LazyPage><Home /></LazyPage>} />
        <Route path="about" element={<LazyPage><About /></LazyPage>} />
        <Route path="academics" element={<LazyPage><Academics /></LazyPage>} />
        <Route path="academics/:slug" element={<LazyPage><DepartmentPage /></LazyPage>} />
        <Route path="faculty" element={<LazyPage><Faculty /></LazyPage>} />
        <Route path="notices" element={<LazyPage><NoticeBoard /></LazyPage>} />
        <Route path="notices/:id" element={<LazyPage><NoticeDetails /></LazyPage>} />
        <Route path="events" element={<LazyPage><Events /></LazyPage>} />
        <Route path="events/:id" element={<LazyPage><EventDetails /></LazyPage>} />
        <Route path="gallery" element={<LazyPage><Gallery /></LazyPage>} />
        <Route path="blog" element={<LazyPage><Blog /></LazyPage>} />
        <Route path="blog/:slug" element={<LazyPage><BlogDetails /></LazyPage>} />
        <Route path="admission" element={<LazyPage><Admission /></LazyPage>} />
        <Route path="student-corner" element={<LazyPage><StudentCorner /></LazyPage>} />
        <Route path="contact" element={<LazyPage><Contact /></LazyPage>} />
        <Route path="privacy-policy" element={<LazyPage><PrivacyPolicy /></LazyPage>} />
        <Route path="terms-and-conditions" element={<LazyPage><TermsAndConditions /></LazyPage>} />
        <Route path="cookie-policy" element={<LazyPage><CookiePolicy /></LazyPage>} />
        <Route path="refund-policy" element={<LazyPage><RefundPolicy /></LazyPage>} />
        <Route path="disclaimer" element={<LazyPage><Disclaimer /></LazyPage>} />
        <Route path="accessibility" element={<LazyPage><Accessibility /></LazyPage>} />
        <Route path="sitemap" element={<LazyPage><Sitemap /></LazyPage>} />
        <Route path="login" element={<LazyPage><Login /></LazyPage>} />
        <Route path="register" element={<LazyPage><Register /></LazyPage>} />
        <Route path="forgot-password" element={<LazyPage><ForgotPassword /></LazyPage>} />
      </Route>

      <Route element={<AuthGuard />}>
        <Route path="/dashboard" element={<StudentLayout />}>
          <Route index element={<LazyPage><Dashboard /></LazyPage>} />
          <Route path="courses" element={<LazyPage><StudentCourses /></LazyPage>} />
          <Route path="results" element={<LazyPage><StudentResults /></LazyPage>} />
          <Route path="bills" element={<LazyPage><StudentBills /></LazyPage>} />
          <Route path="webmail" element={<LazyPage><StudentWebmail /></LazyPage>} />
          <Route path="profile" element={<LazyPage><StudentProfile /></LazyPage>} />
        </Route>
      </Route>

      <Route path="*" element={<LazyPage><NotFound /></LazyPage>} />
    </Routes>
  );
}
