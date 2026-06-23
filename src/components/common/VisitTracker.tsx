import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { api } from "@/services/api";

const VISITOR_KEY = "cmpi-visitor-id";

function getVisitorId(): string {
  let id = localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
}

export function VisitTracker() {
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      api.post("/visit/track", {
        visitor_id: getVisitorId(),
        page_url: window.location.href,
        referrer: document.referrer || null,
      }).catch(() => {});
    }, 500);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
}
