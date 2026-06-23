import { useState, useEffect, useRef } from "react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getStudentProfile, updateStudentProfile, uploadFile } from "@/services/api";
import { ProfileSkeleton } from "@/components/common/LoadingSkeleton";
import { Loader2, Camera, User } from "lucide-react";

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
    avatar: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
          avatar: user.avatar || "",
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
            avatar: storedUser.avatar || "",
          });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const update = (field: keyof typeof profile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      return;
    }

    setUploadingAvatar(true);
    try {
      const result = await uploadFile(file, "users");
      const avatarUrl = result.url;

      await updateStudentProfile({ avatar: avatarUrl });

      setProfile((prev) => ({ ...prev, avatar: avatarUrl }));

      if (storedUser) {
        const updatedUser = { ...storedUser, avatar: avatarUrl };
        localStorage.setItem("cmpi-user", JSON.stringify(updatedUser));
        window.dispatchEvent(new Event("storage"));
      }
    } catch (err: any) {
      console.error("Avatar upload failed:", err.response?.data || err.message);
      console.error("Full error:", err);
    } finally {
      setUploadingAvatar(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
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
          avatar: profile.avatar,
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
          avatar: profile.avatar,
        };
        localStorage.setItem("cmpi-user", JSON.stringify(updatedUser));
        window.dispatchEvent(new Event("storage"));
        setSaved(true);
      }
    }
    setSaving(false);
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Profile" title="Personal information" description="View and update your basic student details." align="left" />

      {/* Avatar */}
      <div className="flex items-center gap-6 pb-4">
        <div className="relative group">
          <div className="h-20 w-20 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center ring-2 ring-border">
            {profile.avatar ? (
              <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover" />
            ) : (
              <User className="h-8 w-8 text-muted-foreground" />
            )}
            {uploadingAvatar && (
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                <Loader2 className="h-5 w-5 text-white animate-spin" />
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadingAvatar}
            className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 cursor-pointer"
          >
            <Camera className="h-5 w-5 text-white" />
          </button>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">Profile photo</p>
          <p>Click the camera icon to upload. Max 5MB.</p>
        </div>
      </div>

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
