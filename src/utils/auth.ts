export function getUserEmail(): string | null {
  try {
    const user = localStorage.getItem("cmpi-user");
    if (user) {
      const parsed = JSON.parse(user);
      return parsed.email || null;
    }
  } catch {}
  return null;
}
