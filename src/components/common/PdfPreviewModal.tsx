import { X, Download, Maximize2, Minimize2, Printer } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface PdfPreviewModalProps {
  url: string;
  title: string;
  onClose: () => void;
}

export function PdfPreviewModal({ url, title, onClose }: PdfPreviewModalProps) {
  const [fullscreen, setFullscreen] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div
        className={`flex flex-col overflow-hidden rounded-sm border bg-card shadow-2xl transition-all ${
          fullscreen ? "fixed inset-2" : "max-h-[90vh] w-full max-w-4xl"
        }`}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b bg-muted/60 px-4 py-3">
          <p className="truncate text-sm font-bold">{title}</p>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              title="Print"
              onClick={() => {
                const iframe = document.getElementById("pdf-iframe") as HTMLIFrameElement | null;
                iframe?.contentWindow?.print();
              }}
            >
              <Printer className="h-4 w-4" />
            </Button>
            <a href={url} download target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" title="Download">
                <Download className="h-4 w-4" />
              </Button>
            </a>
            <Button
              variant="ghost"
              size="icon"
              title={fullscreen ? "Exit fullscreen" : "Fullscreen"}
              onClick={() => setFullscreen((f) => !f)}
            >
              {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" title="Close" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-hidden bg-slate-200 dark:bg-slate-800">
          <iframe
            id="pdf-iframe"
            src={`${url}#toolbar=1&navpanes=0`}
            title={title}
            className="h-full w-full min-h-[500px]"
            style={{ border: "none" }}
          />
        </div>

        {/* Footer note */}
        <div className="shrink-0 border-t bg-muted/40 px-4 py-2 text-center text-xs text-muted-foreground">
          If the PDF does not display, please{" "}
          <a href={url} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
            open it directly
          </a>{" "}
          or use the Download button above.
        </div>
      </div>
    </div>
  );
}
