import { useState } from "react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Folder = "inbox" | "sent" | "drafts" | "trash";

interface Email {
  id: string;
  from: string;
  to?: string;
  subject: string;
  preview: string;
  body: string;
  date: string;
  folder: Folder;
  read: boolean;
}

const initialEmails: Email[] = [
  { id: "1", from: "admin@cmpi.edu.bd", to: "rahim@cmpi.edu.bd", subject: "Welcome to CMPI Student Portal", preview: "Your student account has been created successfully.", body: "Dear Student,\n\nYour student account has been created. Use this portal to access resources, results, and announcements.\n\nBest regards,\nCMPI Admin", date: "2026-06-18", folder: "inbox", read: false },
  { id: "2", from: "admin@cmpi.edu.bd", to: "rahim@cmpi.edu.bd", subject: "Mid-term examination routine", preview: "Mid-term exam routine has been published.", body: "Dear Student,\n\nThe mid-term examination routine is now available. Please check the Notice Board for details.\n\nBest regards,\nExam Controller", date: "2026-06-17", folder: "inbox", read: false },
  { id: "3", from: "rahim@cmpi.edu.bd", to: "admin@cmpi.edu.bd", subject: "Leave application", preview: "I am requesting leave for...", body: "Respected Sir,\n\nI am requesting leave for 2 days due to personal reasons.\n\nThank you.", date: "2026-06-16", folder: "sent", read: true },
  { id: "4", from: "admin@cmpi.edu.bd", to: "rahim@cmpi.edu.bd", subject: "Lab assignment deadline extended", preview: "The deadline for the database lab...", body: "Dear Students,\n\nThe deadline for the database lab assignment has been extended by 3 days.\n\nBest,\nLab Instructor", date: "2026-06-15", folder: "inbox", read: true },
  { id: "5", from: "rahim@cmpi.edu.bd", to: "support@cmpi.edu.bd", subject: "Scholarship inquiry", preview: "I would like to know about...", body: "Dear Support Team,\n\nI would like to know about the scholarship criteria for this semester.\n\nRegards,\nRahim", date: "2026-06-14", folder: "drafts", read: false },
];

export function StudentWebmail() {
  const [emails, setEmails] = useState<Email[]>(initialEmails);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeFolder, setActiveFolder] = useState<Folder>("inbox");
  const [composeOpen, setComposeOpen] = useState(false);
  const [composeTo, setComposeTo] = useState("");
  const [composeSubject, setComposeSubject] = useState("");
  const [composeBody, setComposeBody] = useState("");

  const folders: { key: Folder; label: string }[] = [
    { key: "inbox", label: "Inbox" },
    { key: "sent", label: "Sent" },
    { key: "drafts", label: "Drafts" },
    { key: "trash", label: "Trash" },
  ];

  const filtered = emails.filter((email) => email.folder === activeFolder);
  const selected = emails.find((email) => email.id === selectedId) || null;

  const openEmail = (id: string) => {
    setSelectedId(id);
    setEmails((prev) => prev.map((email) => (email.id === id ? { ...email, read: true } : email)));
  };

  const deleteEmail = (id: string) => {
    setEmails((prev) => prev.filter((email) => email.id !== id));
    setSelectedId(null);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const newEmail: Email = {
      id: Date.now().toString(),
      from: "rahim@cmpi.edu.bd",
      to: composeTo,
      subject: composeSubject,
      preview: composeBody.slice(0, 80),
      body: composeBody,
      date: new Date().toISOString().slice(0, 10),
      folder: "sent",
      read: true,
    };
    setEmails((prev) => [newEmail, ...prev]);
    setComposeOpen(false);
    setComposeTo("");
    setComposeSubject("");
    setComposeBody("");
  };

  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Webmail" title="Student mailbox" description="Send and receive official communications from CMPI." align="left" />

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <div className="rounded-sm border bg-muted/60 p-4">
          <div className="space-y-1">
            {folders.map((folder) => (
              <button
                key={folder.key}
                type="button"
                className={`w-full rounded-sm px-3 py-2 text-left text-sm font-semibold transition ${
                  activeFolder === folder.key ? "bg-primary text-white" : "hover:bg-background"
                }`}
                onClick={() => setActiveFolder(folder.key)}
              >
                {folder.label}
              </button>
            ))}
          </div>
          <Button className="mt-4 w-full" onClick={() => setComposeOpen(true)}>Compose</Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <div className="rounded-sm border bg-muted/60">
            <div className="border-b px-4 py-2">
              <p className="text-sm font-bold">{activeFolder === "inbox" ? "Inbox" : activeFolder === "sent" ? "Sent" : activeFolder === "drafts" ? "Drafts" : "Trash"}</p>
            </div>
            <div className="max-h-[520px] overflow-auto divide-y">
              {filtered.length === 0 ? (
                <p className="px-4 py-6 text-center text-sm text-muted-foreground">No emails in this folder.</p>
              ) : (
                filtered.map((email) => (
                  <button
                    key={email.id}
                    type="button"
                    className={`flex w-full flex-col gap-1 px-4 py-3 text-left transition hover:bg-background ${
                      selectedId === email.id ? "bg-background" : ""
                    }`}
                    onClick={() => openEmail(email.id)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">{email.from}</span>
                      <span className="text-xs text-muted-foreground">{email.date}</span>
                    </div>
                    <p className="text-sm font-medium">{email.subject}</p>
                    <p className="text-xs text-muted-foreground">{email.preview}</p>
                    {!email.read && <span className="inline-block h-2 w-2 rounded-full bg-secondary" />}
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="rounded-sm border bg-muted/60 p-6">
            {selected ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">From: {selected.from}</p>
                    <p className="text-xs text-muted-foreground">To: {selected.to}</p>
                    <h3 className="mt-1 text-lg font-bold">{selected.subject}</h3>
                    <p className="text-xs text-muted-foreground">{selected.date}</p>
                  </div>
                  {activeFolder !== "trash" && (
                    <Button variant="outline" size="sm" onClick={() => deleteEmail(selected.id)}>Delete</Button>
                  )}
                </div>
                <div className="max-h-[360px] overflow-auto rounded-sm border bg-card p-4">
                  <p className="whitespace-pre-line text-sm leading-7 text-foreground">{selected.body}</p>
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-muted-foreground">Select an email to read.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {composeOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-sm border bg-card p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold">Compose email</h3>
              <Button variant="outline" size="sm" onClick={() => setComposeOpen(false)}>Close</Button>
            </div>
            <form onSubmit={handleSend} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="to" className="text-sm font-semibold">To</label>
                <Input id="to" value={composeTo} onChange={(e) => setComposeTo(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-semibold">Subject</label>
                <Input id="subject" value={composeSubject} onChange={(e) => setComposeSubject(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <label htmlFor="body" className="text-sm font-semibold">Message</label>
                <textarea
                  id="body"
                  className="min-h-36 w-full rounded-sm border border-border bg-background p-3 text-sm"
                  value={composeBody}
                  onChange={(e) => setComposeBody(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setComposeOpen(false)}>Cancel</Button>
                <Button type="submit">Send</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
