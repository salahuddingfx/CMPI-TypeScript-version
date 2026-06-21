import { Navigate, Outlet } from "react-router-dom";
import { SessionGuard } from "./SessionGuard";

function getStoredUser() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("cmpi-user");
  return raw ? JSON.parse(raw) : null;
}

export function AuthGuard() {
  const user = getStoredUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SessionGuard>
      <Outlet />
    </SessionGuard>
  );
}
