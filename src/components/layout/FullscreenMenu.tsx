"use client";

import { useRef, useState } from "react";
import { getNavBarLinks, getNavMoreLinks } from "@/lib/nav";
import { useUi } from "@/components/providers/UiProvider";

const searchDefaults = ["रोजगार", "सीप", "लोक सेवा", "वैदेशिक रोजगार", "आईटी", "तालिम"];

export function FullscreenMenu() {
  const { menuOpen, closeMenu } = useUi();
  const [searchTerms, setSearchTerms] = useState(searchDefaults);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (!searchQuery.trim()) return inputRef.current?.focus();
    setSearchTerms((items) =>
      [searchQuery, ...items.filter((item) => item !== searchQuery)].slice(0, 8)
    );
    closeMenu();
    document.getElementById("stories")?.scrollIntoView({ behavior: "smooth" });
  };
  
  if (!menuOpen) return null;

  const barLinks = getNavBarLinks();
  const moreLinks = getNavMoreLinks();

  return (
    <div
      className="fs-menu is-open"
      id="fullscreen-menu"
      aria-hidden={!menuOpen}
    >
      <div className="fs-menu__backdrop" onClick={closeMenu} />
      <div
        className="fs-menu__panel"
        role="dialog"
        aria-modal="true"
        aria-label="मुख्य मेनु"
      >
        <div className="fs-menu__inner container">
          <div className="fs-menu__top">
            <a className="fs-menu__brand" href="/">
              <img
                className="logo logo--color"
                src="/images/rojgar-manch-logo.svg"
                alt="रोजगार मञ्च"
                width={283}
                height={87}
              />
              <img
                className="logo logo--white"
                src="/images/rojgar-manch-whitelogo.svg"
                alt="रोजगार मञ्च"
                width={283}
                height={87}
              />
            </a>
            <button
              className="fs-menu__close"
              type="button"
              aria-label="मेनु बन्द गर्नुहोस्"
              onClick={closeMenu}
            >
              <i className="fa-solid fa-xmark" aria-hidden="true" />
            </button>
          </div>
          
          <form className="fs-menu__search search-box" role="search" onSubmit={handleSearch}>
            <label className="sr-only" htmlFor="fs-search">किवर्ड खोज्नुहोस्</label>
            <span className="search-box__icon" aria-hidden="true">
              <i className="fa-solid fa-magnifying-glass" />
            </span>
            <input
              ref={inputRef}
              id="fs-search"
              type="search"
              name="q"
              placeholder="किवर्ड लेख्नुहोस्…"
              autoComplete="off"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
            <button className="search-box__submit" type="submit">
              खोज्नुहोस् <i className="fa-solid fa-arrow-right" aria-hidden="true" />
            </button>
          </form>
          
          <nav className="fs-menu__nav" aria-label="पूर्ण मेनु">
            {barLinks.map((link, index) => (
              <a
                className="fs-menu__link"
                href={link.href}
                style={{ ["--i" as string]: index }}
                onClick={closeMenu}
                key={link.href}
              >
                <span>{link.labelNe}</span>
                <small>{link.labelEn}</small>
              </a>
            ))}
            {moreLinks.length ? (
              <>
                <p className="fs-menu__group">थप</p>
                {moreLinks.map((link, index) => (
                  <a
                    className="fs-menu__link"
                    href={link.href}
                    style={{ ["--i" as string]: barLinks.length + index }}
                    onClick={closeMenu}
                    key={link.href}
                  >
                    <span>{link.labelNe}</span>
                    <small>{link.labelEn}</small>
                  </a>
                ))}
              </>
            ) : null}
          </nav>
        </div>
      </div>
    </div>
  );
}
