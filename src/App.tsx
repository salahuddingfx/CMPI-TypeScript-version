import { AppRoutes } from "@/routes/AppRoutes";
import { CookieConsent } from "@/components/common/CookieConsent";

export function App() {
  return (
    <>
      <AppRoutes />
      <CookieConsent />
    </>
  );
}
