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
import { unsplash as u } from "@/lib/media";

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

/** Full-page PDF flipbook reader */
export function Flipbook({ issue }: FlipbookProps) {
  const bookRef = useRef<FlipApi | null>(null);
  const [page, setPage] = useState(0);
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState<"portrait" | "landscape">("landscape");
  const [flipState, setFlipState] = useState("read");
  const total = 8;
  const isCover = mode === "landscape" && page === 0 && flipState === "read";
  const isBack = mode === "landscape" && page === total - 1 && flipState === "read";

  useEffect(() => {
    setReady(true);
  }, []);

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
          <div>
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
          {ready ? (
            <HTMLFlipBook
              ref={bookRef}
              className="pub-flip__book"
              style={{ margin: "0 auto" }}
              width={400}
              height={534}
              size="stretch"
              minWidth={260}
              maxWidth={440}
              minHeight={360}
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
              onChangeState={(event) => setFlipState(String(event.data || "read"))}
              onInit={(event) => {
                setPage(Number(event.data?.page) || 0);
                setMode(event.data?.mode === "portrait" ? "portrait" : "landscape");
              }}
            >
              <Sheet hard className="pub-sheet--cover">
                <img src={issue.cover} alt="" />
                <div className="pub-sheet__cover-copy">
                  <p>
                    {issue.kicker} · {issue.date}
                  </p>
                  <h3>{issue.title}</h3>
                  <span>{issue.tagline}</span>
                </div>
              </Sheet>

              <Sheet>
                <div className="pub-sheet__paper">
                  <header>
                    <strong>विषय सूची</strong>
                    <span>०२</span>
                  </header>
                  <ol>
                    {issue.toc.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </div>
              </Sheet>

              <Sheet>
                <div className="pub-sheet__paper">
                  <header>
                    <strong>विशेष</strong>
                    <span>०३</span>
                  </header>
                  <img src={u("1556761175-5973dc0f32e7", 640, 360)} alt="" />
                  <h4>{issue.toc[0]}</h4>
                  <p>
                    यस अंकमा नीति, सीप र कार्यस्थलका व्यावहारिक कदम समेटिएका छन्।
                  </p>
                </div>
              </Sheet>

              <Sheet>
                <div className="pub-sheet__paper">
                  <header>
                    <strong>भर्ना</strong>
                    <span>०४</span>
                  </header>
                  <h4>{issue.toc[1]}</h4>
                  <p>
                    आवेदनअघि प्रमाण, पोर्टफोलियो र स्पष्ट जिम्मेवारी तयार पार्नुहोस्।
                  </p>
                  <img src={u("1517245386807-bb43f82c33c4", 640, 320)} alt="" />
                </div>
              </Sheet>

              <Sheet>
                <div className="pub-sheet__paper">
                  <header>
                    <strong>प्रवास</strong>
                    <span>०५</span>
                  </header>
                  <img src={u("1507679799987-c73779587ccf", 640, 340)} alt="" />
                  <h4>{issue.toc[2]}</h4>
                  <p>
                    करार, बीमा र सम्पर्क सूची — सुरक्षित यात्राका आधारभूत कदम।
                  </p>
                </div>
              </Sheet>

              <Sheet>
                <div className="pub-sheet__paper">
                  <header>
                    <strong>उद्यम</strong>
                    <span>०६</span>
                  </header>
                  <h4>{issue.toc[3]}</h4>
                  <p>
                    अनुभवलाई स्थानीय बजारसँग जोड्दा साना उद्यमले पनि स्थिर आम्दानी
                    दिन सक्छन्।
                  </p>
                  <img src={u("1522071820081-009f0129c71c", 640, 320)} alt="" />
                </div>
              </Sheet>

              <Sheet>
                <div className="pub-sheet__paper">
                  <header>
                    <strong>सीप</strong>
                    <span>०७</span>
                  </header>
                  <img src={u("1573496359142-b8d87734a5a2", 640, 340)} alt="" />
                  <h4>{issue.toc[4]}</h4>
                  <p>
                    नतिजा लेख्नुहोस्, बजार दर हेर्नुहोस्, र एउटा स्पष्ट कदमसहित अघि
                    बढ्नुहोस्।
                  </p>
                </div>
              </Sheet>

              <Sheet hard className="pub-sheet--back">
                <div className="pub-sheet__back">
                  <p>अर्को अंक</p>
                  <h3>छिट्टै भेटौँला</h3>
                  <span>rojgarmanch.com</span>
                </div>
              </Sheet>
            </HTMLFlipBook>
          ) : (
            <div className="pub-flip__loading">फ्लिपबुक तयार हुँदैछ…</div>
          )}
        </div>

        <footer className="pub-flip__bar">
          <button type="button" onClick={prev} disabled={page <= 0}>
            <i className="fa-solid fa-chevron-left" aria-hidden="true" />
            अघिल्लो
          </button>
          <span>
            {page + 1} / {total}
          </span>
          <button type="button" onClick={next} disabled={page >= total - 1}>
            अर्को
            <i className="fa-solid fa-chevron-right" aria-hidden="true" />
          </button>
        </footer>
      </div>
    </main>
  );
}
