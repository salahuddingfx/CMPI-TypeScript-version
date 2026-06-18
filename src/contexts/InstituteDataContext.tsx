import { createContext, useContext, useMemo } from "react";
import { useInstituteData } from "@/hooks/useInstituteData";
import type { InstituteData } from "@/services/types";

interface InstituteDataContextValue {
  data: InstituteData | null;
  loading: boolean;
  error: string | null;
}

const InstituteDataContext = createContext<InstituteDataContextValue | undefined>(undefined);

export function InstituteDataProvider({ children }: { children: React.ReactNode }) {
  const { data, loading, error } = useInstituteData();

  const value = useMemo<InstituteDataContextValue>(
    () => ({ data, loading, error }),
    [data, loading, error],
  );

  return <InstituteDataContext.Provider value={value}>{children}</InstituteDataContext.Provider>;
}

export function useInstituteContext() {
  const context = useContext(InstituteDataContext);
  if (!context) {
    throw new Error("useInstituteContext must be used within InstituteDataProvider");
  }
  return context;
}
