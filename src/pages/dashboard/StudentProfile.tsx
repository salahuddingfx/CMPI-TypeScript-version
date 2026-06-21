import { useState, useEffect } from "react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getStudentProfile, updateStudentProfile } from "@/services/api";
import { Loader2 } from "lucide-react";

function getStoredUser() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("cmpi-user");
  return raw ? JSON.parse(raw) : null;
}

export function StudentProfile() {
  const storedUser = getStoredUser();
  const [profile, setProfile] = useState({
    name: "",
    studentId: "",
    department: "",
    semester: "",
    session: "",
    email: "",
    phone: "",
    admissionDate: "",
    guardian: "",
    bloodGroup: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getStudentProfile()
      .then((data) => {
        const user = data.user || data;
        setProfile({
          name: user.name || "",
          studentId: user.student_id || "",
          department: user.department || "",
          semester: user.semester || "",
          session: user.session || "",
          email: user.email || "",
          phone: user.phone || "",
          admissionDate: user.admission_date || "",
          guardian: user.guardian || "",
          bloodGroup: user.blood_group || "",
          address: user.address || "",
        });
      })
      .catch(() => {
        // Fallback to localStorage
        if (storedUser) {
          setProfile({
            name: storedUser.name || "",
            studentId: storedUser.student_id || "",
            department: storedUser.department || "",
            semester: storedUser.semester || "",
            session: storedUser.session || "",
            email: storedUser.email || "",
            phone: storedUser.phone || "",
            admissionDate: storedUser.admission_date || "",
            guardian: storedUser.guardian || "",
            bloodGroup: storedUser.blood_group || "",
            address: storedUser.address || "",
          });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const update = (field: keyof typeof profile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await updateStudentProfile({
        name: profile.name,
        phone: profile.phone,
        guardian: profile.guardian,
        blood_group: profile.bloodGroup,
        address: profile.address,
      });
      // Update localStorage too
      if (storedUser) {
        const updatedUser = {
          ...storedUser,
          name: profile.name,
          phone: profile.phone,
          guardian: profile.guardian,
          blood_group: profile.bloodGroup,
          address: profile.address,
        };
        localStorage.setItem("cmpi-user", JSON.stringify(updatedUser));
        window.dispatchEvent(new Event("storage"));
      }
      setSaved(true);
    } catch (e) {
      // Save locally even if API fails
      if (storedUser) {
        const updatedUser = {
          ...storedUser,
          name: profile.name,
          phone: profile.phone,
          guardian: profile.guardian,
          blood_group: profile.bloodGroup,
          address: profile.address,
        };
        localStorage.setItem("cmpi-user", JSON.stringify(updatedUser));
        window.dispatchEvent(new Event("storage"));
        setSaved(true);
      }
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 gap-2 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        Loading profile...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Profile" title="Personal information" description="View and update your basic student details." align="left" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-semibold">Full name</label>
          <Input id="name" value={profile.name} onChange={(e) => update("name", e.target.value)} />
        </div>
        <div className="space-y-2">
          <label htmlFor="studentId" className="text-sm font-semibold">Student ID</label>
          <Input id="studentId" value={profile.studentId} disabled />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold">Email</label>
          <Input id="email" type="email" value={profile.email} disabled />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-semibold">Phone</label>
          <Input id="phone" value={profile.phone} onChange={(e) => update("phone", e.target.value)} />
        </div>
        <div className="space-y-2">
          <label htmlFor="department" className="text-sm font-semibold">Department</label>
          <Input id="department" value={profile.department} disabled />
        </div>
        <div className="space-y-2">
          <label htmlFor="semester" className="text-sm font-semibold">Semester</label>
          <Input id="semester" value={profile.semester} disabled />
        </div>
        <div className="space-y-2">
          <label htmlFor="guardian" className="text-sm font-semibold">Guardian</label>
          <Input id="guardian" value={profile.guardian} onChange={(e) => update("guardian", e.target.value)} />
        </div>
        <div className="space-y-2">
          <label htmlFor="address" className="text-sm font-semibold">Address</label>
          <Input id="address" value={profile.address} onChange={(e) => update("address", e.target.value)} />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button onClick={handleSave} className="rounded-sm" disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          {saving ? "Saving..." : "Save changes"}
        </Button>
        {saved && <span className="text-sm text-primary">Saved successfully.</span>}
      </div>
    </div>
  );
}
