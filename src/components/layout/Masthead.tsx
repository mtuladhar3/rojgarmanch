"use client";

import { useEffect, useState } from "react";
import { formatAd, formatBs } from "@/lib/dates";

type MastheadProps = {
  domain: string;
};

export function Masthead({ domain }: MastheadProps) {
  const [dates, setDates] = useState({ ad: "—", bs: "—" });

  useEffect(() => {
    setDates({ ad: formatAd(), bs: formatBs() });
  }, []);

  return (
    <header className="masthead">
      <div className="container masthead__inner">
        <div className="masthead__brand-wrap">
          <a
            className="brand masthead__brand"
            href="/"
            aria-label="रोजगार मञ्च गृहपृष्ठ"
          >
            <img
              src="/images/logo.png"
              alt="रोजगार मञ्च"
              width={171}
              height={40}
              decoding="async"
            />
          </a>
          <div className="masthead__dates" aria-label="मिति">
            <span className="date-chip date-chip--bs">
              <span className="date-chip__label">वि.सं.</span>
              <span className="date-chip__value">{dates.bs}</span>
            </span>
            <span className="date-chip date-chip--ad">
              <span className="date-chip__label">ई.सं.</span>
              <span className="date-chip__value">{dates.ad}</span>
            </span>
          </div>
        </div>
        <div className="masthead__ads" aria-label="विज्ञापन">
        <img src="/images/IME_ONLINE.gif" alt="विज्ञापन" />
          <img
            src="/images/Classic-Tech-450x200-px-_-rojgar-media.gif"
            alt="विज्ञापन"
          />
          <img src="/images/IME_ONLINE.gif" alt="विज्ञापन" />
        </div>
      </div>
    </header>
  );
}
