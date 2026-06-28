import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "sonner";
import { AppRoutes } from "@/routes/AppRoutes";
import { CookieConsent } from "@/components/common/CookieConsent";
import { IntroLoader } from "@/components/common/IntroLoader";
import { useInstituteContext } from "@/contexts/InstituteDataContext";

export function App() {
  const { loading } = useInstituteContext();
  const [showLoader, setShowLoader] = useState(true);

  return (
    <>
      <AnimatePresence>
        {showLoader && (
          <IntroLoader
            apiLoading={loading}
            onComplete={() => setShowLoader(false)}
          />
        )}
      </AnimatePresence>
      <AppRoutes />
      <CookieConsent />
      <Toaster richColors position="top-right" closeButton />
    </>
  );
}
