"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import HTMLFlipBook from "react-pageflip";
import type { PublicationIssue } from "@/data/publications";

type FlipApi = {
  pageFlip: () => {
    flipNext: () => void;
    flipPrev: () => void;
  };
};

const Sheet = forwardRef<
  HTMLDivElement,
  { hard?: boolean; className?: string; children: ReactNode }
>(function Sheet({ hard, className = "", children }, ref) {
  return (
    <div
      ref={ref}
      className={`pub-sheet${hard ? " pub-sheet--hard" : ""} ${className}`.trim()}
      data-density={hard ? "hard" : "soft"}
    >
      {children}
    </div>
  );
});

type FlipbookProps = {
  issue: PublicationIssue;
};

function canvasToJpegUrl(canvas: HTMLCanvasElement, quality = 0.78) {
  return new Promise<string>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Canvas export failed"));
          return;
        }
        resolve(URL.createObjectURL(blob));
      },
      "image/jpeg",
      quality,
    );
  });
}

async function renderPdfPages(
  url: string,
  onProgress?: (done: number, total: number) => void,
) {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  // Match installed package version; public copy can get MIME/module issues in some browsers.
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

  const pdf = await pdfjs.getDocument({
    url,
    withCredentials: false,
  }).promise;

  const total = pdf.numPages;
  const images: string[] = [];
  const targetWidth = 900;

  for (let i = 1; i <= total; i += 1) {
    const page = await pdf.getPage(i);
    const base = page.getViewport({ scale: 1 });
    const scale = Math.min(1.25, targetWidth / base.width);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) {
      throw new Error("Canvas unavailable");
    }

    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);

    await page.render({
      canvasContext: context,
      viewport,
      canvas,
    }).promise;

    images.push(await canvasToJpegUrl(canvas));
    canvas.width = 0;
    canvas.height = 0;
    onProgress?.(i, total);
  }

  return images;
}

/** Full-page PDF flipbook reader */
export function Flipbook({ issue }: FlipbookProps) {
  const bookRef = useRef<FlipApi | null>(null);
  const pageUrlsRef = useRef<string[]>([]);
  const [page, setPage] = useState(0);
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState<"portrait" | "landscape">("landscape");
  const [flipState, setFlipState] = useState("read");
  const [pages, setPages] = useState<string[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [progress, setProgress] = useState({ done: 0, total: 0 });

  const total = pages.length;
  const isCover = mode === "landscape" && page === 0 && flipState === "read";
  const isBack =
    mode === "landscape" && total > 0 && page === total - 1 && flipState === "read";

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setReady(false);
      setLoadError(null);
      setPages([]);
      setProgress({ done: 0, total: 0 });

      for (const url of pageUrlsRef.current) {
        URL.revokeObjectURL(url);
      }
      pageUrlsRef.current = [];

      try {
        const images = await renderPdfPages(issue.pdfHref, (done, totalPages) => {
          if (!cancelled) {
            setProgress({ done, total: totalPages });
          }
        });
        if (!cancelled) {
          pageUrlsRef.current = images;
          setPages(images);
          setReady(true);
        } else {
          for (const url of images) URL.revokeObjectURL(url);
        }
      } catch (error) {
        if (!cancelled) {
          const message =
            error instanceof Error ? error.message : "Unknown PDF error";
          console.error("[flipbook]", error);
          setLoadError(`PDF खोल्न सकिएन: ${message}`);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
      for (const url of pageUrlsRef.current) {
        URL.revokeObjectURL(url);
      }
      pageUrlsRef.current = [];
    };
  }, [issue.pdfHref]);

  const next = useCallback(() => bookRef.current?.pageFlip().flipNext(), []);
  const prev = useCallback(() => bookRef.current?.pageFlip().flipPrev(), []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return (
    <main id="main" className="pub-flip">
      <div className="container pub-flip__box">
        <header className="pub-flip__top">
          <div className="pub-flip__copy">
            <p>कुना तान्नुहोस् वा पेज क्लिक गर्नुहोस् · ← →</p>
            <h1>
              {issue.title} · {issue.date}
            </h1>
          </div>
          <div className="pub-flip__tools">
            <Link href="/publication">सबै प्रकाशन</Link>
            <a href={issue.pdfHref} target="_blank" rel="noreferrer">
              <i className="fa-regular fa-file-pdf" aria-hidden="true" />
              PDF
            </a>
          </div>
        </header>

        <div
          className={[
            "pub-flip__stage",
            isCover ? "pub-flip__stage--cover" : "",
            isBack ? "pub-flip__stage--back" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {loadError ? (
            <div className="pub-flip__loading">
              <p>{loadError}</p>
              <a className="pub-flip__fallback" href={issue.pdfHref} target="_blank" rel="noreferrer">
                PDF सिधै खोल्नुहोस्
              </a>
            </div>
          ) : !ready || total < 1 ? (
            <div className="pub-flip__loading">
              PDF पाना तयार हुँदैछ…
              {progress.total > 0
                ? ` ${progress.done}/${progress.total}`
                : " (२५ MB फाइल लोड हुँदै)"}
            </div>
          ) : (
            <HTMLFlipBook
              key={`${issue.slug}-${total}`}
              ref={bookRef}
              className="pub-flip__book"
              style={{ margin: "0 auto" }}
              width={360}
              height={480}
              size="stretch"
              minWidth={220}
              maxWidth={440}
              minHeight={300}
              maxHeight={600}
              startPage={0}
              drawShadow
              flippingTime={800}
              usePortrait
              startZIndex={4}
              autoSize
              maxShadowOpacity={0.5}
              showCover
              mobileScrollSupport
              clickEventForward={false}
              useMouseEvents
              swipeDistance={28}
              showPageCorners
              disableFlipByClick={false}
              onFlip={(event) => setPage(Number(event.data) || 0)}
              onChangeOrientation={(event) =>
                setMode(event.data === "portrait" ? "portrait" : "landscape")
              }
              onChangeState={(event) =>
                setFlipState(String(event.data || "read"))
              }
              onInit={(event) => {
                setPage(Number(event.data?.page) || 0);
                setMode(
                  event.data?.mode === "portrait" ? "portrait" : "landscape",
                );
              }}
            >
              {pages.map((src, index) => (
                <Sheet
                  key={`${issue.slug}-${index}`}
                  hard={index === 0 || index === total - 1}
                  className={
                    index === 0
                      ? "pub-sheet--cover pub-sheet--pdf"
                      : index === total - 1
                        ? "pub-sheet--back pub-sheet--pdf"
                        : "pub-sheet--pdf"
                  }
                >
                  <img src={src} alt={`${issue.title} — पाना ${index + 1}`} />
                </Sheet>
              ))}
            </HTMLFlipBook>
          )}
        </div>

        <footer className="pub-flip__bar">
          <button type="button" onClick={prev} disabled={!ready || page <= 0}>
            <i className="fa-solid fa-chevron-left" aria-hidden="true" />
            अघिल्लो
          </button>
          <span>
            {ready && total > 0 ? `${page + 1} / ${total}` : "—"}
          </span>
          <button
            type="button"
            onClick={next}
            disabled={!ready || page >= total - 1}
          >
            अर्को
            <i className="fa-solid fa-chevron-right" aria-hidden="true" />
          </button>
        </footer>
      </div>
    </main>
  );
}
