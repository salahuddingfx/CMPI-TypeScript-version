import { useState, useEffect } from "react";
import { Cookie, X, Check, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "@/services/api";
import { getUserEmail } from "@/utils/auth";

const STORAGE_KEY = "cmpi-cookie-consent";
const CONSENT_DURATION = 7 * 24 * 60 * 60 * 1000;

interface CookieConsentData {
  accepted: boolean;
  timestamp: number;
}

function logConsent(type: "accept" | "deny") {
  const email = getUserEmail();
  api.post("/cookie-consents", { consent_type: type, email }).catch(() => {});
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const data: CookieConsentData = JSON.parse(raw);
        const age = Date.now() - data.timestamp;
        if (age < CONSENT_DURATION) return;
      } catch {}
    }
    setVisible(true);
  }, []);

  function accept() {
    logConsent("accept");
    const data: CookieConsentData = { accepted: true, timestamp: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setVisible(false);
  }

  function deny() {
    logConsent("deny");
    const data: CookieConsentData = { accepted: false, timestamp: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] border-t border-border bg-card shadow-2xl animate-in slide-in-from-bottom">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div className="text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">This site uses cookies</p>
              <p>
                We use essential cookies for authentication and security.{" "}
                <button type="button" onClick={() => setExpanded(!expanded)} className="text-primary hover:underline font-medium">
                  {expanded ? "Show less" : "Learn more"}
                </button>
              </p>
              {expanded && (
                <div className="mt-2 space-y-1.5 text-xs border-l-2 border-primary/30 pl-3">
                  <p><strong className="text-foreground">Essential cookies</strong> — Auth tokens (cmpi-token), session data (cmpi-user). Required for login and dashboard.</p>
                  <p><strong className="text-foreground">Preference cookies</strong> — Remember me (cmpi-remember-email), theme choice. Used only if you opt in.</p>
                  <p className="mt-1">
                    <Link to="/cookie-policy" className="text-primary hover:underline font-medium inline-flex items-center gap-1">
                      <Info className="h-3 w-3" /> Full cookie policy
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button type="button" onClick={deny} className="flex items-center gap-1.5 rounded-sm border border-border px-4 py-2 text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-muted transition">
              <X className="h-3.5 w-3.5" /> Deny
            </button>
            <button type="button" onClick={accept} className="flex items-center gap-1.5 rounded-sm bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primary/90 transition">
              <Check className="h-3.5 w-3.5" /> Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
