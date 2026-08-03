"use client";

import { NAV_LINKS } from "@/lib/nav";
import { useUi } from "@/components/providers/UiProvider";

export function FullscreenMenu() {
  const { menuOpen, closeMenu } = useUi();
  if (!menuOpen) return null;

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
        <div className="fs-menu__top">
          <a className="fs-menu__brand" href="/">
            <img
              src="/images/logo.png"
              alt="रोजगार मञ्च"
              width={150}
              height={44}
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
        <nav className="fs-menu__nav" aria-label="पूर्ण मेनु">
          {NAV_LINKS.map((link, index) => (
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
        </nav>
      </div>
    </div>
  );
}
