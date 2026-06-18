import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Archive,
  Forward,
  Inbox,
  Mail,
  MailOpen,
  Paperclip,
  Reply,
  ReplyAll,
  Search,
  Send,
  Star,
  Trash2,
  AlertTriangle,
  Tag,
  X,
} from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";

type Folder = "inbox" | "sent" | "drafts" | "trash" | "archive" | "spam";
type Label = "work" | "personal" | "urgent" | null;

interface Email {
  id: string;
  from: string;
  to?: string;
  cc?: string;
  subject: string;
  preview: string;
  body: string;
  date: string;
  folder: Folder;
  read: boolean;
  starred: boolean;
  label: Label;
}

interface Toast {
  id: string;
  message: string;
  type: "success" | "info";
}

const contacts = [
  { name: "Admin User", email: "admin@cmpi.edu.bd" },
  { name: "Student User", email: "student@cmpi.edu.bd" },
  { name: "Exam Controller", email: "exam@cmpi.edu.bd" },
  { name: "Lab Instructor", email: "lab@cmpi.edu.bd" },
  { name: "Support Team", email: "support@cmpi.edu.bd" },
];

const initialEmails: Email[] = [
  { id: "1", from: "admin@cmpi.edu.bd", to: "rahim@cmpi.edu.bd", subject: "Welcome to CMPI Student Portal", preview: "Your student account has been created successfully.", body: "Dear Student,\n\nYour student account has been created. Use this portal to access resources, results, and announcements.\n\nBest regards,\nCMPI Admin", date: "2026-06-18", folder: "inbox", read: false, starred: true, label: "work" },
  { id: "2", from: "admin@cmpi.edu.bd", to: "rahim@cmpi.edu.bd", subject: "Mid-term examination routine", preview: "Mid-term exam routine has been published.", body: "Dear Student,\n\nThe mid-term examination routine is now available. Please check the Notice Board for details.\n\nBest regards,\nExam Controller", date: "2026-06-17", folder: "inbox", read: false, starred: false, label: "urgent" },
  { id: "3", from: "rahim@cmpi.edu.bd", to: "admin@cmpi.edu.bd", subject: "Leave application", preview: "I am requesting leave for...", body: "Respected Sir,\n\nI am requesting leave for 2 days due to personal reasons.\n\nThank you.", date: "2026-06-16", folder: "sent", read: true, starred: false, label: "personal" },
  { id: "4", from: "admin@cmpi.edu.bd", to: "rahim@cmpi.edu.bd", subject: "Lab assignment deadline extended", preview: "The deadline for the database lab...", body: "Dear Students,\n\nThe deadline for the database lab assignment has been extended by 3 days.\n\nBest,\nLab Instructor", date: "2026-06-15", folder: "inbox", read: true, starred: false, label: "work" },
  { id: "5", from: "rahim@cmpi.edu.bd", to: "support@cmpi.edu.bd", subject: "Scholarship inquiry", preview: "I would like to know about...", body: "Dear Support Team,\n\nI would like to know about the scholarship criteria for this semester.\n\nRegards,\nRahim", date: "2026-06-14", folder: "drafts", read: false, starred: false, label: null },
];

const folderIcons: Record<Folder, typeof Inbox> = {
  inbox: Inbox,
  sent: Send,
  drafts: Mail,
  trash: Trash2,
  archive: Archive,
  spam: AlertTriangle,
};

const labelColors: Record<string, string> = {
  work: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  personal: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  urgent: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export function StudentWebmail() {
  const [emails, setEmails] = useState<Email[]>(initialEmails);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeFolder, setActiveFolder] = useState<Folder>("inbox");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);
  const [composeMode, setComposeMode] = useState<"new" | "reply" | "replyAll" | "forward">("new");
  const [composeTo, setComposeTo] = useState("");
  const [composeSubject, setComposeSubject] = useState("");
  const [composeBody, setComposeBody] = useState("");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [emailLabels, setEmailLabels] = useState<Record<string, Label>>({});
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [fullscreenCompose, setFullscreenCompose] = useState(false);
  const emailListRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const composeBodyRef = useRef<HTMLTextAreaElement>(null);
  const draftTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const folderCounts = useMemo(() => {
    const counts: Record<Folder, number> = { inbox: 0, sent: 0, drafts: 0, trash: 0, archive: 0, spam: 0 };
    emails.forEach((e) => {
      if (!e.read) counts[e.folder]++;
    });
    return counts;
  }, [emails]);

  const filtered = useMemo(() => {
    let result = emails.filter((e) => e.folder === activeFolder);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.subject.toLowerCase().includes(q) ||
          e.from.toLowerCase().includes(q) ||
          e.body.toLowerCase().includes(q),
      );
    }
    return result;
  }, [emails, activeFolder, searchQuery]);

  const selected = emails.find((e) => e.id === selectedId) || null;

  const currentLabel = selected ? emailLabels[selected.id] ?? selected.label : null;

  const addToast = useCallback((message: string, type: "success" | "info" = "success") => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  }, []);

  const openEmail = useCallback(
    (id: string) => {
      setSelectedId(id);
      setEmails((prev) => prev.map((e) => (e.id === id ? { ...e, read: true } : e)));
    },
    [],
  );

  const toggleStar = useCallback((id: string) => {
    setEmails((prev) => prev.map((e) => (e.id === id ? { ...e, starred: !e.starred } : e)));
  }, []);

  const deleteEmail = useCallback(
    (id: string) => {
      setEmails((prev) => prev.map((e) => (e.id === id ? { ...e, folder: "trash" as Folder } : e)));
      setSelectedId(null);
      addToast("Email moved to trash");
    },
    [addToast],
  );

  const archiveEmail = useCallback(
    (id: string) => {
      setEmails((prev) => prev.map((e) => (e.id === id ? { ...e, folder: "archive" as Folder } : e)));
      setSelectedId(null);
      addToast("Email archived");
    },
    [addToast],
  );

  const spamEmail = useCallback(
    (id: string) => {
      setEmails((prev) => prev.map((e) => (e.id === id ? { ...e, folder: "spam" as Folder } : e)));
      setSelectedId(null);
      addToast("Email marked as spam");
    },
    [addToast],
  );

  const setLabel = useCallback(
    (id: string, label: Label) => {
      setEmailLabels((prev) => ({ ...prev, [id]: label }));
      addToast(label ? `Label "${label}" applied` : "Label removed");
    },
    [addToast],
  );

  const markAllAsRead = useCallback(() => {
    setEmails((prev) => prev.map((e) => (e.folder === activeFolder ? { ...e, read: true } : e)));
    addToast("All emails marked as read");
  }, [activeFolder, addToast]);

  const openCompose = useCallback(
    (mode: "new" | "reply" | "replyAll" | "forward", replyTo?: Email) => {
      setComposeMode(mode);
      if (mode === "reply" && replyTo) {
        setComposeTo(replyTo.from);
        setComposeSubject(`Re: ${replyTo.subject}`);
        setComposeBody(`\n\n--- Original Message ---\nFrom: ${replyTo.from}\nDate: ${replyTo.date}\n\n${replyTo.body}`);
      } else if (mode === "replyAll" && replyTo) {
        setComposeTo(replyTo.from);
        setComposeSubject(`Re: ${replyTo.subject}`);
        setComposeBody(`\n\n--- Original Message ---\nFrom: ${replyTo.from}\nDate: ${replyTo.date}\n\n${replyTo.body}`);
      } else if (mode === "forward" && replyTo) {
        setComposeTo("");
        setComposeSubject(`Fwd: ${replyTo.subject}`);
        setComposeBody(`\n\n--- Forwarded Message ---\nFrom: ${replyTo.from}\nDate: ${replyTo.date}\nSubject: ${replyTo.subject}\n\n${replyTo.body}`);
      } else {
        setComposeTo("");
        setComposeSubject("");
        setComposeBody("");
      }
      setComposeOpen(true);
    },
    [],
  );

  const handleSend = useCallback(
    (e: React.FormEvent) => {
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
        starred: false,
        label: null,
      };
      setEmails((prev) => [newEmail, ...prev]);
      setComposeOpen(false);
      setComposeTo("");
      setComposeSubject("");
      setComposeBody("");
      addToast("Email sent successfully");
    },
    [composeTo, composeSubject, composeBody, addToast],
  );

  const handleComposeBodyChange = useCallback((value: string) => {
    setComposeBody(value);
    if (draftTimerRef.current) clearTimeout(draftTimerRef.current);
    draftTimerRef.current = setTimeout(() => {
      if (value.trim()) {
        localStorage.setItem("cmpi-draft", JSON.stringify({ to: composeTo, subject: composeSubject, body: value }));
      }
    }, 2000);
  }, [composeTo, composeSubject]);

  const filteredContacts = useMemo(() => {
    if (!composeTo.trim()) return [];
    const q = composeTo.toLowerCase();
    return contacts.filter((c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q));
  }, [composeTo]);

  useEffect(() => {
    const draft = localStorage.getItem("cmpi-draft");
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        if (parsed.body) {
          setComposeTo(parsed.to || "");
          setComposeSubject(parsed.subject || "");
          setComposeBody(parsed.body);
          setComposeOpen(true);
          localStorage.removeItem("cmpi-draft");
          addToast("Draft restored", "info");
        }
      } catch {
        // ignore
      }
    }
  }, [addToast]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (composeOpen) return;
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

      const list = filtered;
      const currentIndex = list.findIndex((em) => em.id === selectedId);

      if (e.key === "j" || e.key === "J") {
        e.preventDefault();
        if (currentIndex < list.length - 1) openEmail(list[currentIndex + 1]!.id);
      } else if (e.key === "k" || e.key === "K") {
        e.preventDefault();
        if (currentIndex > 0) openEmail(list[currentIndex - 1]!.id);
      } else if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        if (selected) openCompose("reply", selected);
      } else if (e.key === "d" || e.key === "D") {
        e.preventDefault();
        if (selectedId) deleteEmail(selectedId);
      } else if (e.key === "s" || e.key === "S") {
        e.preventDefault();
        if (selectedId) toggleStar(selectedId);
      } else if (e.key === "Escape") {
        setSelectedId(null);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [composeOpen, filtered, selectedId, selected, openEmail, openCompose, deleteEmail, toggleStar]);

  useEffect(() => {
    if (showSearch) searchInputRef.current?.focus();
  }, [showSearch]);

  const folders: { key: Folder; label: string }[] = [
    { key: "inbox", label: "Inbox" },
    { key: "sent", label: "Sent" },
    { key: "drafts", label: "Drafts" },
    { key: "archive", label: "Archive" },
    { key: "spam", label: "Spam" },
    { key: "trash", label: "Trash" },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Webmail" title="Student mailbox" description="Send and receive official communications from CMPI. Press J/K to navigate, R to reply, D to delete, S to star." align="left" />

      {toasts.length > 0 && (
        <div className="fixed right-4 top-4 z-[70] space-y-2">
          {toasts.map((t) => (
            <div key={t.id} className={`rounded-sm px-4 py-3 text-sm font-semibold text-white shadow-lg ${t.type === "success" ? "bg-green-600" : "bg-blue-600"}`}>
              {t.message}
            </div>
          ))}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <div className="rounded-sm border bg-muted/60 p-4">
          <div className="space-y-1">
            {folders.map((folder) => {
              const Icon = folderIcons[folder.key];
              const count = folderCounts[folder.key];
              return (
                <button
                  key={folder.key}
                  type="button"
                  className={`flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm font-semibold transition ${
                    activeFolder === folder.key ? "bg-primary text-white" : "hover:bg-background"
                  }`}
                  onClick={() => {
                    setActiveFolder(folder.key);
                    setSelectedId(null);
                  }}
                >
                  <Icon className="h-4 w-4" />
                  {folder.label}
                  {count > 0 && (
                    <span className={`ml-auto rounded-full px-2 py-0.5 text-xs font-bold ${activeFolder === folder.key ? "bg-white/20 text-white" : "bg-primary/10 text-primary"}`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <Button className="mt-4 w-full" onClick={() => openCompose("new")}>
            Compose
          </Button>
          <div className="mt-4 border-t pt-4">
            <Button variant="ghost" size="sm" className="w-full text-xs" onClick={markAllAsRead}>
              <MailOpen className="mr-2 h-3 w-3" /> Mark all read
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          <div className="rounded-sm border bg-muted/60">
            <div className="flex items-center gap-2 border-b px-4 py-2">
              {showSearch ? (
                <div className="flex flex-1 items-center gap-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <input
                    ref={searchInputRef}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search emails..."
                    className="flex-1 bg-transparent text-sm outline-none"
                  />
                  <button type="button" onClick={() => { setSearchQuery(""); setShowSearch(false); }}>
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              ) : (
                <>
                  <p className="flex-1 text-sm font-bold">{activeFolder.charAt(0).toUpperCase() + activeFolder.slice(1)}</p>
                  <button type="button" onClick={() => setShowSearch(true)}>
                    <Search className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  </button>
                </>
              )}
            </div>
            <div ref={emailListRef} className="max-h-[520px] overflow-auto divide-y">
              {filtered.length === 0 ? (
                <p className="px-4 py-6 text-center text-sm text-muted-foreground">No emails in this folder.</p>
              ) : (
                filtered.map((email) => {
                  const lbl = emailLabels[email.id] ?? email.label;
                  return (
                    <button
                      key={email.id}
                      type="button"
                      className={`flex w-full flex-col gap-1 px-4 py-3 text-left transition hover:bg-background ${
                        selectedId === email.id ? "bg-background" : ""
                      } ${!email.read ? "border-l-2 border-primary" : ""}`}
                      onClick={() => openEmail(email.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); toggleStar(email.id); }}
                            className="shrink-0"
                          >
                            <Star className={`h-3.5 w-3.5 ${email.starred ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"}`} />
                          </button>
                          <span className={`text-sm ${!email.read ? "font-bold" : "font-semibold"}`}>{email.from}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{email.date}</span>
                      </div>
                      <p className={`text-sm ${!email.read ? "font-bold" : "font-medium"}`}>{email.subject}</p>
                      <p className="text-xs text-muted-foreground">{email.preview}</p>
                      <div className="flex items-center gap-2">
                        {lbl && (
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${labelColors[lbl] ?? ""}`}>
                            {lbl}
                          </span>
                        )}
                        {!email.read && <span className="inline-block h-2 w-2 rounded-full bg-primary" />}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          <div className="rounded-sm border bg-muted/60 p-6">
            {selected ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">From: <span className="font-semibold text-foreground">{selected.from}</span></p>
                    <p className="text-xs text-muted-foreground">To: {selected.to}</p>
                    {selected.cc && <p className="text-xs text-muted-foreground">Cc: {selected.cc}</p>}
                    <h3 className="mt-1 text-lg font-bold">{selected.subject}</h3>
                    <p className="text-xs text-muted-foreground">{selected.date}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" title="Star" onClick={() => toggleStar(selected.id)}>
                      <Star className={`h-4 w-4 ${selected.starred ? "fill-yellow-500 text-yellow-500" : ""}`} />
                    </Button>
                    <div className="relative group">
                      <Button variant="ghost" size="icon" title="Label">
                        <Tag className="h-4 w-4" />
                      </Button>
                      <div className="absolute right-0 top-full z-10 mt-1 hidden w-36 rounded-sm border bg-card p-1 shadow-lg group-hover:block">
                        {(["work", "personal", "urgent"] as const).map((l) => (
                          <button
                            key={l}
                            type="button"
                            className={`flex w-full items-center gap-2 rounded-sm px-3 py-1.5 text-xs font-semibold hover:bg-muted ${currentLabel === l ? "bg-muted" : ""}`}
                            onClick={() => setLabel(selected.id, l)}
                          >
                            <span className={`h-2 w-2 rounded-full ${labelColors[l]}`} />
                            {l.charAt(0).toUpperCase() + l.slice(1)}
                          </button>
                        ))}
                        <button type="button" className="w-full rounded-sm px-3 py-1.5 text-left text-xs text-muted-foreground hover:bg-muted" onClick={() => setLabel(selected.id, null)}>
                          Remove label
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => openCompose("reply", selected)}>
                    <Reply className="mr-1 h-3 w-3" /> Reply
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => openCompose("replyAll", selected)}>
                    <ReplyAll className="mr-1 h-3 w-3" /> Reply All
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => openCompose("forward", selected)}>
                    <Forward className="mr-1 h-3 w-3" /> Forward
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => archiveEmail(selected.id)}>
                    <Archive className="mr-1 h-3 w-3" /> Archive
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => spamEmail(selected.id)}>
                    <AlertTriangle className="mr-1 h-3 w-3" /> Spam
                  </Button>
                  <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => deleteEmail(selected.id)}>
                    <Trash2 className="mr-1 h-3 w-3" /> Delete
                  </Button>
                </div>

                <div className="max-h-[360px] overflow-auto rounded-sm border bg-card p-4">
                  <p className="whitespace-pre-line text-sm leading-7 text-foreground">{selected.body}</p>
                </div>
              </div>
            ) : (
              <div className="flex h-full min-h-[400px] items-center justify-center">
                <div className="text-center">
                  <Mail className="mx-auto h-12 w-12 text-muted-foreground/40" />
                  <p className="mt-3 text-sm text-muted-foreground">Select an email to read.</p>
                  <p className="mt-1 text-xs text-muted-foreground/60">Use J/K keys to navigate, R to reply, D to delete</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {composeOpen && (
        <div className={`fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 ${fullscreenCompose ? "items-stretch" : ""}`}>
          <div className={`flex flex-col rounded-sm border bg-card shadow-2xl ${fullscreenCompose ? "h-full w-full" : "w-full max-w-2xl"}`}>
            <div className="mb-4 flex items-center justify-between border-b px-6 py-4">
              <h3 className="text-lg font-bold">
                {composeMode === "reply" && "Reply"}
                {composeMode === "replyAll" && "Reply All"}
                {composeMode === "forward" && "Forward"}
                {composeMode === "new" && "Compose email"}
              </h3>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => setFullscreenCompose(!fullscreenCompose)}>
                  {fullscreenCompose ? "—" : "□"}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setComposeOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <form onSubmit={handleSend} className="flex flex-1 flex-col overflow-hidden px-6 pb-6">
              <div className="space-y-3">
                <div className="relative flex items-center gap-2 border-b py-2">
                  <label htmlFor="to" className="text-sm font-semibold text-muted-foreground">To:</label>
                  <input
                    id="to"
                    value={composeTo}
                    onChange={(e) => { setComposeTo(e.target.value); setShowSuggestions(true); }}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    className="flex-1 bg-transparent text-sm outline-none"
                    required
                  />
                  {showSuggestions && filteredContacts.length > 0 && (
                    <div className="absolute left-0 top-full z-10 w-full rounded-sm border bg-card shadow-lg">
                      {filteredContacts.map((c) => (
                        <button
                          key={c.email}
                          type="button"
                          className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm hover:bg-muted"
                          onMouseDown={() => { setComposeTo(c.email); setShowSuggestions(false); }}
                        >
                          <span className="font-semibold">{c.name}</span>
                          <span className="text-muted-foreground">{c.email}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 border-b py-2">
                  <label htmlFor="subject" className="text-sm font-semibold text-muted-foreground">Subject:</label>
                  <input
                    id="subject"
                    value={composeSubject}
                    onChange={(e) => setComposeSubject(e.target.value)}
                    className="flex-1 bg-transparent text-sm outline-none"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-1 border-b py-1">
                {["Bold", "Italic", "Underline", "Link", "List"].map((tool) => (
                  <button
                    key={tool}
                    type="button"
                    className="rounded-sm px-2 py-1 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"
                    title={tool}
                  >
                    {tool === "Bold" && <span className="font-bold">B</span>}
                    {tool === "Italic" && <span className="italic">I</span>}
                    {tool === "Underline" && <span className="underline">U</span>}
                    {tool === "Link" && "🔗"}
                    {tool === "List" && "•"}
                  </button>
                ))}
                <div className="ml-auto">
                  <Button type="button" variant="ghost" size="sm">
                    <Paperclip className="h-4 w-4" /> Attach
                  </Button>
                </div>
              </div>

              <textarea
                ref={composeBodyRef}
                value={composeBody}
                onChange={(e) => handleComposeBodyChange(e.target.value)}
                className="min-h-[200px] flex-1 resize-none bg-transparent p-3 text-sm outline-none"
                placeholder="Write your message..."
                required
              />

              <div className="flex items-center justify-between border-t pt-4">
                <Button type="button" variant="ghost" size="sm" onClick={() => { setComposeOpen(false); localStorage.removeItem("cmpi-draft"); }}>
                  Discard
                </Button>
                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={() => { localStorage.setItem("cmpi-draft", JSON.stringify({ to: composeTo, subject: composeSubject, body: composeBody })); addToast("Draft saved"); }}>
                    Save draft
                  </Button>
                  <Button type="submit">
                    <Send className="mr-1 h-4 w-4" /> Send
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
