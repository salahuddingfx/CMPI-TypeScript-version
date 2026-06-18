import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { Home } from "@/pages/Home";
import { About } from "@/pages/About";
import { Academics } from "@/pages/Academics";
import { DepartmentPage } from "@/pages/DepartmentPage";
import { Faculty } from "@/pages/Faculty";
import { NoticeBoard } from "@/pages/NoticeBoard";
import { NoticeDetails } from "@/pages/NoticeDetails";
import { Events } from "@/pages/Events";
import { EventDetails } from "@/pages/EventDetails";
import { Gallery } from "@/pages/Gallery";
import { Blog } from "@/pages/Blog";
import { BlogDetails } from "@/pages/BlogDetails";
import { Admission } from "@/pages/Admission";
import { StudentCorner } from "@/pages/StudentCorner";
import { Contact } from "@/pages/Contact";
import { NotFound } from "@/pages/NotFound";
import { PrivacyPolicy } from "@/pages/PrivacyPolicy";
import { TermsAndConditions } from "@/pages/TermsAndConditions";
import { CookiePolicy } from "@/pages/CookiePolicy";
import { RefundPolicy } from "@/pages/RefundPolicy";
import { Disclaimer } from "@/pages/Disclaimer";
import { Accessibility } from "@/pages/Accessibility";

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
        <Route path="*" element={<LazyPage><NotFound /></LazyPage>} />
      </Route>
    </Routes>
  );
}
