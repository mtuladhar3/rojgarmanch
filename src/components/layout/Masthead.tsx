"use client";

import { useEffect, useState } from "react";
import { formatAd, formatBs } from "@/lib/dates";
import { ADS } from "@/lib/ads";

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
              src="/images/rojgar-manch-logo.svg"
              alt="रोजगार मञ्च"
              width={283}
              height={87}
              decoding="async"
              fetchPriority="high"
            />
          </a>
          <div className="masthead__dates" aria-label="मिति">
            <span className="date-chip date-chip--bs">
              <span className="date-chip__label">वि.सं.</span>
              <span className="date-chip__value">{dates.bs}</span>
            </span>
            <span className="date-chip date-chip--ad">
              <span className="date-chip__label">A.D.</span>
              <span className="date-chip__value">{dates.ad}</span>
            </span>
          </div>
        </div>
        <div className="masthead__ads" aria-label="विज्ञापन">
          <img
            src={ADS.ime.src}
            alt={ADS.ime.alt}
            width={ADS.ime.width}
            height={ADS.ime.height}
            decoding="async"
            loading="lazy"
          />
          <img
            src={ADS.classicTech.src}
            alt={ADS.classicTech.alt}
            width={ADS.classicTech.width}
            height={ADS.classicTech.height}
            decoding="async"
            loading="lazy"
          />
          <img
            src={ADS.ime.src}
            alt={ADS.ime.alt}
            width={ADS.ime.width}
            height={ADS.ime.height}
            decoding="async"
            loading="lazy"
          />
        </div>
      </div>
    </header>
  );
}
