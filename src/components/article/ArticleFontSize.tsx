"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "rm-article-fs";
const MIN = 0;
const MAX = 3;
const DEFAULT = 1;

type FontCtx = {
  level: number;
  smaller: () => void;
  larger: () => void;
  reset: () => void;
};

const Ctx = createContext<FontCtx | null>(null);

export function ArticleFontProvider({ children }: { children: ReactNode }) {
  const [level, setLevel] = useState(DEFAULT);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === null) return;
      const next = Number(saved);
      if (Number.isInteger(next) && next >= MIN && next <= MAX) {
        setLevel(next);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(level));
    } catch {
      /* ignore */
    }
  }, [level]);

  const smaller = () => setLevel((current) => Math.max(MIN, current - 1));
  const larger = () => setLevel((current) => Math.min(MAX, current + 1));
  const reset = () => setLevel(DEFAULT);

  return (
    <Ctx.Provider value={{ level, smaller, larger, reset }}>
      <div className="article-fs-root" data-fs={level}>
        {children}
      </div>
    </Ctx.Provider>
  );
}

function useArticleFont() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("ArticleFontControls must be inside ArticleFontProvider");
  return ctx;
}

type ArticleFontControlsProps = {
  compact?: boolean;
};

export function ArticleFontControls({ compact = false }: ArticleFontControlsProps) {
  const { level, smaller, larger, reset } = useArticleFont();

  return (
    <div className={`article-font${compact ? " article-font--compact" : ""}`}>
      {compact ? null : <p className="article-rail__label">अक्षर आकार</p>}
      <div className="article-font__btns" role="group" aria-label="अक्षर आकार">
        <button
          type="button"
          onClick={smaller}
          disabled={level <= MIN}
          aria-label="फन्ट घटाउनुहोस्"
          title="फन्ट घटाउनुहोस्"
        >
          अ−
        </button>
        
        <button
          type="button"
          onClick={larger}
          disabled={level >= MAX}
          aria-label="फन्ट बढाउनुहोस्"
          title="फन्ट बढाउनुहोस्"
        >
          अ+
        </button>
        <button
          type="button"
          className="article-font__reset"
          onClick={reset}
          disabled={level === DEFAULT}
          aria-label="फन्ट रिसेट"
          title="फन्ट रिसेट"
        >
          <i className="fa-solid fa-rotate-left" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
