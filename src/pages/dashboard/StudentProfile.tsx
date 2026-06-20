import { useState } from "react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { studentProfile as initialProfile } from "@/data/mockStudentData";

function getStoredUser() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("cmpi-user");
  return raw ? JSON.parse(raw) : null;
}

export function StudentProfile() {
  const storedUser = getStoredUser();
  const initialData = {
    name: storedUser?.name || initialProfile.name,
    studentId: storedUser?.studentId || initialProfile.studentId,
    department: storedUser?.department || initialProfile.department,
    semester: storedUser?.semester || initialProfile.semester || "1st",
    session: storedUser?.session || initialProfile.session || "N/A",
    email: storedUser?.email || initialProfile.email,
    phone: storedUser?.phone || initialProfile.phone || "N/A",
    admissionDate: storedUser?.admissionDate || initialProfile.admissionDate || "N/A",
    guardian: storedUser?.guardian || initialProfile.guardian || "N/A",
    bloodGroup: storedUser?.bloodGroup || initialProfile.bloodGroup || "N/A",
    address: storedUser?.address || initialProfile.address || "N/A",
  };

  const [profile, setProfile] = useState(initialData);
  const [saved, setSaved] = useState(false);

  const update = (field: keyof typeof profile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    if (storedUser) {
      const updatedUser = {
        ...storedUser,
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        department: profile.department,
        semester: profile.semester,
        guardian: profile.guardian,
        blood_group: profile.bloodGroup,
        address: profile.address,
      };
      localStorage.setItem("cmpi-user", JSON.stringify(updatedUser));
      window.dispatchEvent(new Event("storage"));
    }
    setSaved(true);
  };

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
          <Input id="email" type="email" value={profile.email} onChange={(e) => update("email", e.target.value)} />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-semibold">Phone</label>
          <Input id="phone" value={profile.phone} onChange={(e) => update("phone", e.target.value)} />
        </div>
        <div className="space-y-2">
          <label htmlFor="department" className="text-sm font-semibold">Department</label>
          <Input id="department" value={profile.department} onChange={(e) => update("department", e.target.value)} />
        </div>
        <div className="space-y-2">
          <label htmlFor="semester" className="text-sm font-semibold">Semester</label>
          <Input id="semester" value={profile.semester} onChange={(e) => update("semester", e.target.value)} />
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
        <Button onClick={handleSave} className="rounded-sm">Save changes</Button>
        {saved && <span className="text-sm text-primary">Saved successfully.</span>}
      </div>
    </div>
  );
}
