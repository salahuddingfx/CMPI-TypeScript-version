import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ScrollToTop } from "@/components/common/ScrollToTop";

export function MainLayout() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />
      <Header />
      <Breadcrumb />
      <Outlet />
      <Footer />
    </div>
  );
}
