import { useState, useEffect } from "react";
import { getStudentProfile } from "@/services/api";
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { Printer, RefreshCw, CreditCard, ShieldCheck, User } from "lucide-react";
import { SEO } from "@/components/common/SEO";
import { Button } from "@/components/ui/button";

interface StudentProfileData {
  name: string;
  studentId: string;
  department: string;
  semester: string;
  session: string;
  email: string;
  bloodGroup: string;
  avatar: string;
  boardRoll: string;
  regNo: string;
}

function getStoredUser() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("cmpi-user");
  return raw ? JSON.parse(raw) : null;
}

export function StudentIdCard() {
  const storedUser = getStoredUser();
  const [profile, setProfile] = useState<StudentProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);

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
          bloodGroup: user.blood_group || "N/A",
          avatar: user.avatar || "",
          boardRoll: user.board_roll || "",
          regNo: user.reg_no || "",
        });
      })
      .catch(() => {
        if (storedUser) {
          setProfile({
            name: storedUser.name || "",
            studentId: storedUser.student_id || "",
            department: storedUser.department || "",
            semester: storedUser.semester || "",
            session: storedUser.session || "",
            email: storedUser.email || "",
            bloodGroup: storedUser.blood_group || "N/A",
            avatar: storedUser.avatar || "",
            boardRoll: storedUser.board_roll || "",
            regNo: storedUser.reg_no || "",
          });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!profile) {
    return (
      <div className="flex h-[300px] flex-col items-center justify-center rounded-sm border border-destructive/20 bg-destructive/5 p-6 text-center text-destructive">
        <CreditCard className="mx-auto h-12 w-12 opacity-50" />
        <h3 className="mt-4 font-bold">Failed to load ID card</h3>
        <p className="mt-2 text-sm text-muted-foreground">Please try again or contact administration.</p>
      </div>
    );
  }

  const verificationUrl = `${window.location.origin}/verify-student/${profile.studentId}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(verificationUrl)}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <SEO title="Digital Student ID Card" description="View and print your Cox's Bazar Model Polytechnic Institute digital ID card." />
      
      {/* CSS Styles for Print and Mode-Independent Card Styling */}
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Card backgrounds forced to green even in light mode */
          .id-card-green-bg {
            background: linear-gradient(135deg, #022c22 0%, #064e3b 50%, #022c22 100%) !important;
            color: #ffffff !important;
          }
          .id-card-banner-bg {
            background-color: #022c22 !important;
            border-bottom: 1px solid rgba(234, 179, 8, 0.3) !important;
          }

          @media print {
            body {
              background: white !important;
              color: black !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            header, footer, aside, nav, button, .print\\:hidden {
              display: none !important;
            }
            section, .container, .min-w-0, .flex-1, .bg-card, .shadow-sm, .rounded-sm, .border {
              background: transparent !important;
              border: none !important;
              box-shadow: none !important;
              padding: 0 !important;
              margin: 0 !important;
              width: auto !important;
              min-height: 0 !important;
            }
            #print-layout-container {
              display: flex !important;
              flex-direction: row !important;
              flex-wrap: wrap !important;
              justify-content: center !important;
              align-items: center !important;
              gap: 20px !important;
              padding: 20px !important;
              background: white !important;
              width: 100% !important;
            }
            .print-card-box {
              box-shadow: none !important;
              border: 1px solid #064e3b !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              page-break-inside: avoid !important;
              break-inside: avoid !important;
            }
          }
        `
      }} />

      {/* Screen Layout (Interactive Card) */}
      <div className="print:hidden space-y-8">
        <div className="flex flex-col justify-between gap-4 border-b pb-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Digital Student ID Card</h2>
            <p className="text-sm text-muted-foreground">
              Official horizontal landscape ID badge for CMPI students.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => setIsFlipped(!isFlipped)} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Flip Card
            </Button>
            <Button onClick={handlePrint} className="gap-2 bg-emerald-700 hover:bg-emerald-800 text-white">
              <Printer className="h-4 w-4" />
              Print ID Card
            </Button>
          </div>
        </div>

        {/* 3D Perspective Card Container */}
        <div className="flex flex-col items-center py-10">
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="group relative h-[300px] w-full max-w-[480px] cursor-pointer [perspective:1000px]"
            title="Click to Flip Card"
          >
            <div className={`relative h-full w-full rounded-2xl shadow-xl border border-emerald-800 transition-transform duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
              
              {/* CARD FRONT */}
              <div className="absolute inset-0 flex h-full w-full flex-col overflow-hidden rounded-2xl id-card-green-bg text-white [backface-visibility:hidden]">
                {/* ID Card Top Banner */}
                <div className="id-card-banner-bg px-4 py-3 flex items-center justify-center gap-3">
                  <img src="/CMPI.png" alt="CMPI Logo" className="h-9 w-9 object-contain" />
                  <div className="text-left">
                    <h3 className="text-[11px] font-black tracking-wider text-yellow-400 uppercase">COX'S BAZAR MODEL POLYTECHNIC INSTITUTE</h3>
                    <p className="text-[8px] font-semibold text-emerald-300 mt-0.5">Approved by BTEB & Government of Bangladesh</p>
                  </div>
                </div>
                
                {/* ID Card Content */}
                <div className="flex flex-1 p-4 gap-4 items-center">
                  {/* Photo Section */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="h-24 w-24 overflow-hidden rounded-lg border-2 border-yellow-500/50 bg-emerald-950/40 shadow-inner">
                      {profile.avatar ? (
                        <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-emerald-900/50 text-emerald-300">
                          <User className="h-10 w-10" />
                        </div>
                      )}
                    </div>
                    <span className="mt-2 rounded bg-yellow-400/20 px-3 py-0.5 text-[9px] font-black uppercase tracking-wider text-yellow-400 border border-yellow-400/30">
                      STUDENT
                    </span>
                  </div>

                  {/* Information Details */}
                  <div className="flex-1 space-y-1.5 text-xs text-emerald-100">
                    <div>
                      <p className="text-[8px] text-emerald-400 uppercase tracking-wider font-bold">Name</p>
                      <p className="font-extrabold text-white text-sm leading-tight">{profile.name}</p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-1">
                      <div>
                        <p className="text-[8px] text-emerald-400 uppercase tracking-wider font-bold">Class ID/Roll</p>
                        <p className="font-bold text-white font-mono">{profile.studentId}</p>
                      </div>
                      <div>
                        <p className="text-[8px] text-emerald-400 uppercase tracking-wider font-bold">Board Roll</p>
                        <p className="font-bold text-white font-mono">{profile.boardRoll || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-[8px] text-emerald-400 uppercase tracking-wider font-bold">Reg No</p>
                        <p className="font-bold text-white font-mono">{profile.regNo || "N/A"}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-[8px] text-emerald-400 uppercase tracking-wider font-bold">Technology/Dept</p>
                        <p className="font-bold text-white truncate text-[11px]">{profile.department}</p>
                      </div>
                      <div>
                        <p className="text-[8px] text-emerald-400 uppercase tracking-wider font-bold">Session</p>
                        <p className="font-bold text-white font-mono">{profile.session}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-[8px] text-emerald-400 uppercase tracking-wider font-bold">Semester</p>
                        <p className="font-bold text-white">{profile.semester}</p>
                      </div>
                      <div>
                        <p className="text-[8px] text-emerald-400 uppercase tracking-wider font-bold">Blood Group</p>
                        <p className="font-extrabold text-red-400 uppercase">{profile.bloodGroup}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Accent Footer */}
                <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-yellow-400 to-green-600"></div>
              </div>

              {/* CARD BACK */}
              <div className="absolute inset-0 flex h-full w-full flex-col overflow-hidden rounded-2xl id-card-green-bg text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
                {/* ID Card Top Banner (Back) */}
                <div className="id-card-banner-bg px-4 py-2 text-center">
                  <h4 className="text-[10px] font-extrabold tracking-widest text-yellow-400 uppercase">CMPI CAMPUS</h4>
                </div>

                {/* Back Details */}
                <div className="flex flex-1 flex-col justify-between p-4 text-[9px] text-emerald-200">
                  <div className="space-y-1">
                    <p className="font-extrabold text-white text-xs uppercase tracking-wider border-b border-emerald-800 pb-1">INSTRUCTIONS</p>
                    <ul className="list-decimal pl-4 space-y-0.5 leading-tight text-emerald-300 font-medium">
                      <li>This card is the property of Cox's Bazar Model Polytechnic Institute.</li>
                      <li>The holder must wear and display this card visibly on campus at all times.</li>
                      <li>If found, please return to the institute administrative office.</li>
                    </ul>
                  </div>

                  {/* Back Details Content: QR Code, Signatures & Info */}
                  <div className="flex items-center justify-between border-t border-emerald-800/80 pt-2">
                    {/* Contact Details */}
                    <div className="space-y-0.5 font-mono text-[8px] text-emerald-400">
                      <p>Emergency: +880 1888-000000</p>
                      <p>Email: admin@cmpi.edu.bd</p>
                    </div>

                    {/* QR Code Validation (Moved to Back) */}
                    <div className="flex flex-col items-center gap-0.5 justify-center rounded bg-white p-1 shadow-sm border border-emerald-800">
                      <img src={qrCodeUrl} alt="Verification QR" className="h-12 w-12" />
                      <span className="text-[6px] text-emerald-955 font-black uppercase tracking-widest flex items-center gap-0.5">
                        <ShieldCheck className="h-1.5 w-1.5 text-green-600" /> Verify
                      </span>
                    </div>

                    {/* Signature */}
                    <div className="flex flex-col items-center">
                      <div className="h-6 w-20 flex items-center justify-center opacity-90">
                        <span className="font-serif italic text-xs text-yellow-400 tracking-wide">DidarUllah</span>
                      </div>
                      <div className="w-24 border-t border-emerald-700 mt-1 text-center">
                        <p className="text-[7px] font-black text-white leading-tight">Ln. Md. Didar Ullah</p>
                        <p className="text-[6px] text-emerald-400 leading-tight">Principal</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Accent Footer */}
                <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-yellow-400 to-green-600"></div>
              </div>

            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-full border">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Click on the card to flip it and view the back guidelines.
          </p>
        </div>
      </div>

      {/* Hidden Print Layout (Shows Front & Back side-by-side for card cutting/laminating) */}
      <div id="print-layout-container" className="hidden flex-row gap-8 items-center justify-center p-6 bg-white min-h-screen">
        
        {/* Front Card Print */}
        <div className="print-card-box w-[480px] h-[300px] flex flex-col overflow-hidden rounded-2xl id-card-green-bg text-white relative shadow-none border border-emerald-800">
          <div className="id-card-banner-bg px-4 py-3 flex items-center justify-center gap-3">
            <img src="/CMPI.png" alt="CMPI Logo" className="h-9 w-9 object-contain" />
            <div className="text-left">
              <h3 className="text-[11px] font-black tracking-wider text-yellow-400 uppercase">COX'S BAZAR MODEL POLYTECHNIC INSTITUTE</h3>
              <p className="text-[8px] font-semibold text-emerald-300 mt-0.5">Approved by BTEB & Government of Bangladesh</p>
            </div>
          </div>
          <div className="flex flex-1 p-4 gap-4 items-center">
            <div className="flex flex-col items-center justify-center">
              <div className="h-24 w-24 overflow-hidden rounded-lg border-2 border-yellow-500/50 bg-emerald-950/40">
                {profile.avatar ? (
                  <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-emerald-900/50 text-emerald-300">
                    <User className="h-10 w-10" />
                  </div>
                )}
              </div>
              <span className="mt-2 rounded bg-yellow-400/20 px-3 py-0.5 text-[9px] font-black uppercase tracking-wider text-yellow-400 border border-yellow-400/30">
                STUDENT
              </span>
            </div>
            <div className="flex-1 space-y-1.5 text-xs text-emerald-100">
              <div>
                <p className="text-[8px] text-emerald-400 uppercase tracking-wider font-bold">Name</p>
                <p className="font-extrabold text-white text-sm leading-tight">{profile.name}</p>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div>
                  <p className="text-[8px] text-emerald-400 uppercase tracking-wider font-bold">Class ID/Roll</p>
                  <p className="font-bold text-white font-mono">{profile.studentId}</p>
                </div>
                <div>
                  <p className="text-[8px] text-emerald-400 uppercase tracking-wider font-bold">Board Roll</p>
                  <p className="font-bold text-white font-mono">{profile.boardRoll || "N/A"}</p>
                </div>
                <div>
                  <p className="text-[8px] text-emerald-400 uppercase tracking-wider font-bold">Reg No</p>
                  <p className="font-bold text-white font-mono">{profile.regNo || "N/A"}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-[8px] text-emerald-400 uppercase tracking-wider font-bold">Technology/Dept</p>
                  <p className="font-bold text-white truncate text-[11px]">{profile.department}</p>
                </div>
                <div>
                  <p className="text-[8px] text-emerald-400 uppercase tracking-wider font-bold">Session</p>
                  <p className="font-bold text-white font-mono">{profile.session}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-[8px] text-emerald-400 uppercase tracking-wider font-bold">Semester</p>
                  <p className="font-bold text-white">{profile.semester}</p>
                </div>
                <div>
                  <p className="text-[8px] text-emerald-400 uppercase tracking-wider font-bold">Blood Group</p>
                  <p className="font-extrabold text-red-400 uppercase">{profile.bloodGroup}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-yellow-400 to-green-600"></div>
        </div>

        {/* Back Card Print */}
        <div className="print-card-box w-[480px] h-[300px] flex flex-col overflow-hidden rounded-2xl id-card-green-bg text-white relative shadow-none border border-emerald-800">
          <div className="id-card-banner-bg px-4 py-2 text-center">
            <h4 className="text-[10px] font-extrabold tracking-widest text-yellow-400 uppercase">CMPI CAMPUS</h4>
          </div>
          <div className="flex flex-1 flex-col justify-between p-4 text-[9px] text-emerald-200">
            <div className="space-y-1">
              <p className="font-extrabold text-white text-xs uppercase tracking-wider border-b border-emerald-800 pb-1">INSTRUCTIONS</p>
              <ul className="list-decimal pl-4 space-y-0.5 leading-tight text-emerald-300 font-medium">
                <li>This card is the property of Cox's Bazar Model Polytechnic Institute.</li>
                <li>The holder must wear and display this card visibly on campus at all times.</li>
                <li>If found, please return to the institute administrative office.</li>
              </ul>
            </div>
            <div className="flex items-center justify-between border-t border-emerald-800/80 pt-2">
              <div className="space-y-0.5 font-mono text-[8px] text-emerald-400">
                <p>Emergency: +880 1888-000000</p>
                <p>Email: admin@cmpi.edu.bd</p>
              </div>
              <div className="flex flex-col items-center gap-0.5 justify-center rounded bg-white p-1 shadow-sm border border-emerald-800">
                <img src={qrCodeUrl} alt="Verification QR" className="h-12 w-12" />
                <span className="text-[6px] text-emerald-955 font-black uppercase tracking-widest flex items-center gap-0.5">
                  <ShieldCheck className="h-1.5 w-1.5 text-green-600" /> Verify
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-6 w-20 flex items-center justify-center opacity-90">
                  <span className="font-serif italic text-xs text-yellow-400 tracking-wide">DidarUllah</span>
                </div>
                <div className="w-24 border-t border-emerald-700 mt-1 text-center">
                  <p className="text-[7px] font-black text-white leading-tight">Ln. Md. Didar Ullah</p>
                  <p className="text-[6px] text-emerald-400 leading-tight">Principal</p>
                </div>
              </div>
            </div>
          </div>
          <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-yellow-400 to-green-600"></div>
        </div>

      </div>
    </>
  );
}
