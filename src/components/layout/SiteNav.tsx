"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Post } from "@/types/content";
import { getNavBarLinks } from "@/lib/nav";
import { formatAdBadge, formatBsBadge } from "@/lib/dates";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useUi } from "@/components/providers/UiProvider";

type SiteNavProps = {
  flashNews: Post[];
  trending: Post[];
};

type NotifyTab = "taja" | "trending";

export function SiteNav({ flashNews, trending }: SiteNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const {
    menuOpen,
    notifyOpen,
    toggleMenu,
    toggleNotify,
    toggleSearch,
    openNotify,
    closeNotify,
    openShorts,
  } = useUi();
  const [scrolled, setScrolled] = useState(false);
  const [notifyTab, setNotifyTab] = useState<NotifyTab>("taja");
  const [dates, setDates] = useState({ ad: "—", bs: "—" });
  const [showBs, setShowBs] = useState(true);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const dateRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const masthead = document.querySelector(".masthead");
      if (masthead) {
        setScrolled(masthead.getBoundingClientRect().bottom <= 0);
        return;
      }
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    setDates({ ad: formatAdBadge(), bs: formatBsBadge() });
    const id = window.setInterval(() => {
      setShowBs((current) => !current);
    }, 3500);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const placeDate = () => {
      const logo = logoRef.current;
      const row = dateRowRef.current;
      const track = row?.querySelector<HTMLElement>(".sticky-date__track");
      if (!logo || !track || !scrolled) return;
      if (window.matchMedia("(max-width: 991.98px)").matches) {
        track.style.removeProperty("--date-left");
        return;
      }
      const left =
        logo.getBoundingClientRect().left - track.getBoundingClientRect().left;
      track.style.setProperty("--date-left", `${Math.max(0, Math.round(left))}px`);
    };

    placeDate();
    const raf = window.requestAnimationFrame(placeDate);
    window.addEventListener("resize", placeDate);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", placeDate);
    };
  }, [scrolled]);

  useEffect(() => {
    const root = document.documentElement;
    const syncStickyH = () => {
      const nav = document.getElementById("site-nav");
      if (!nav) return;
      root.style.setProperty("--site-sticky-h", `${nav.offsetHeight}px`);
    };

    const raf = window.requestAnimationFrame(syncStickyH);
    window.addEventListener("resize", syncStickyH);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", syncStickyH);
    };
  }, [scrolled, pathname]);

  const openNotifyTab = (tab: NotifyTab) => {
    setNotifyTab(tab);
    if (notifyOpen && notifyTab === tab) {
      toggleNotify();
      return;
    }
    openNotify();
  };

  const notifyOverlay = notifyOpen ? (
    <div
      className="notify-overlay is-open"
      id="notify-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="notify-dialog-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) closeNotify();
      }}
    >
      <div className="notify__panel">
        <button
          className="notify__close"
          type="button"
          aria-label="बन्द गर्नुहोस्"
          onClick={closeNotify}
        >
          <i className="fa-solid fa-xmark" aria-hidden="true" />
        </button>

        <h2 className="sr-only" id="notify-dialog-title">
          सूचना केन्द्र
        </h2>

        <div className="notify__tabs" role="tablist" aria-label="सूचना ट्याब">
          <button
            type="button"
            role="tab"
            className={`notify__tab${notifyTab === "taja" ? " is-active" : ""}`}
            aria-selected={notifyTab === "taja"}
            onClick={() => setNotifyTab("taja")}
          >
            ताजा
          </button>
          <button
            type="button"
            role="tab"
            className={`notify__tab${notifyTab === "trending" ? " is-active" : ""}`}
            aria-selected={notifyTab === "trending"}
            onClick={() => setNotifyTab("trending")}
          >
            ट्रेन्डिङ
          </button>
        </div>

        <div className="notify__grid">
          <section
            className={`notify__col notify__col--flash${notifyTab === "taja" ? " is-active" : ""}`}
            role="tabpanel"
          >
            <h3 className="notify__heading">ताजा समाचार</h3>
            <ul className="notify__flash">
              {flashNews.map((item) => (
                <li key={item.id}>
                  <a className="notify-flash" href={item.href}>
                    <span className="notify-flash__body">
                      <span className="notify-flash__title">{item.title}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section
            className={`notify__col notify__col--trend${notifyTab === "trending" ? " is-active" : ""}`}
            role="tabpanel"
          >
            <h3 className="notify__heading">ट्रेन्डिङ</h3>
            <ol className="notify__trend">
              {trending.map((item, index) => (
                <li key={item.id}>
                  <a className="notify-trend" href={item.href}>
                    <span className="notify-trend__rank" aria-hidden="true">
                      {index + 1}
                    </span>
                    <span className="notify-trend__title">{item.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </div>
  ) : null;

  const renderDateBadge = () => (
    <div className="sticky-date__badge">
      <span className="sticky-date__sizer" aria-hidden="true">
        {dates.bs.length >= dates.ad.length ? dates.bs : dates.ad}
      </span>
      <span
        className={`sticky-date__slide${showBs ? " is-active" : ""}`}
        aria-hidden={!showBs}
      >
        {dates.bs}
      </span>
      <span
        className={`sticky-date__slide${!showBs ? " is-active" : ""}`}
        aria-hidden={showBs}
      >
        {dates.ad}
      </span>
    </div>
  );

  return (
    <>
      <div className={`site-sticky${scrolled ? " is-scrolled" : ""}`} id="site-nav">
        <div className="nav-bar">
          <div className="container">
            <div className="nav-bar__shell">
              <div className="nav-brand">
                <a
                  className="nav-logo"
                  href="/"
                  aria-label="रोजगार मञ्च"
                  ref={logoRef}
                >
                  <img
                    src="/images/logo.png"
                    alt="रोजगार मञ्च"
                    width={120}
                    height={28}
                  />
                </a>

                <div
                  className="sticky-date sticky-date--nav"
                  aria-label="मिति"
                >
                  <div className="sticky-date__track">{renderDateBadge()}</div>
                </div>
              </div>

              <nav className="nav" aria-label="मुख्य मेनु">
                {getNavBarLinks().map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname === link.href ||
                        pathname.startsWith(`${link.href}/`);
                  return (
                    <a
                      className={`nav__link${isActive ? " is-active" : ""}`}
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      key={link.href}
                    >
                      {link.labelNe}
                    </a>
                  );
                })}
              </nav>

              <div className="nav-actions">
                <div className="notify nav-actions__desk">
                  <button
                    className="icon-btn notify__btn"
                    type="button"
                    aria-label="सूचना"
                    aria-expanded={notifyOpen}
                    aria-controls="notify-panel"
                    onClick={() => {
                      setNotifyTab("taja");
                      toggleNotify();
                    }}
                  >
                    <i className="fa-regular fa-bell" aria-hidden="true" />
                    <span className="notify__dot" aria-hidden="true" />
                  </button>
                </div>

                <button
                  className="icon-btn nav-actions__desk"
                  type="button"
                  aria-label="खोज्नुहोस्"
                  onClick={toggleSearch}
                >
                  <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
                </button>

                <button
                  className={`icon-btn theme-toggle${theme === "dark" ? " is-dark" : ""}`}
                  type="button"
                  aria-label={theme === "dark" ? "लाइट मोड" : "डार्क मोड"}
                  onClick={toggleTheme}
                >
                  <i
                    className={`fa-solid ${theme === "dark" ? "fa-sun" : "fa-moon"}`}
                    aria-hidden="true"
                  />
                </button>

                <button
                  className="icon-btn menu-toggle hamburger"
                  type="button"
                  aria-label={menuOpen ? "मेनु बन्द गर्नुहोस्" : "मेनु खोल्नुहोस्"}
                  aria-expanded={menuOpen}
                  aria-controls="fullscreen-menu"
                  onClick={toggleMenu}
                >
                  <svg viewBox="0 0 32 32" aria-hidden="true">
                    <path
                      className="line line-top-bottom"
                      d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                    />
                    <path className="line" d="M7 16 27 16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="sticky-date sticky-date--desk"
          ref={dateRowRef}
          aria-label="मिति"
        >
          <div className="container">
            <div className="sticky-date__track">{renderDateBadge()}</div>
          </div>
        </div>
      </div>

      <nav className="mobile-dock" aria-label="मोबाइल नेभिगेसन">
        <div className="mobile-dock__shell">
          <div className="mobile-dock__surface" aria-hidden="true" />

          <div className="mobile-dock__rail">
            <button
              type="button"
              className={`mobile-dock__item${notifyOpen ? " is-active" : ""}`}
              aria-label="सूचना"
              aria-expanded={notifyOpen}
              aria-controls="notify-panel"
              onClick={() => openNotifyTab("taja")}
            >
              <span className="mobile-dock__icon">
                <i className="fa-regular fa-bell" aria-hidden="true" />
                {flashNews.length > 0 ? (
                  <em className="mobile-dock__badge" aria-hidden="true">
                    {flashNews.length > 9
                      ? "९+"
                      : ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"][
                          flashNews.length
                        ]}
                  </em>
                ) : null}
              </span>
              <span className="mobile-dock__label">सूचना</span>
            </button>

            <button
              type="button"
              className="mobile-dock__item"
              aria-label="रिल्स"
              onClick={() => {
                openShorts();
                if (pathname !== "/") {
                  router.push("/");
                }
              }}
            >
              <span className="mobile-dock__icon">
                <i className="fa-solid fa-clapperboard" aria-hidden="true" />
              </span>
              <span className="mobile-dock__label">रिल्स</span>
            </button>

            <span className="mobile-dock__slot" aria-hidden="true" />

            <a
              className={`mobile-dock__item${pathname.startsWith("/category/rojgar") ? " is-active" : ""}`}
              href="/category/rojgar"
            >
              <span className="mobile-dock__icon">
                <i className="fa-solid fa-briefcase" aria-hidden="true" />
              </span>
              <span className="mobile-dock__label">अवसर</span>
            </a>

            <button
              type="button"
              className="mobile-dock__item"
              aria-label="सर्च"
              onClick={toggleSearch}
            >
              <span className="mobile-dock__icon">
                <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
              </span>
              <span className="mobile-dock__label">सर्च</span>
            </button>
          </div>

          <a
            className={`mobile-dock__brand${pathname === "/" ? " is-active" : ""}`}
            href="/"
            aria-label="गृहपृष्ठ"
          >
            <i className="fa-solid fa-house" aria-hidden="true" />
          </a>
        </div>
      </nav>

      {notifyOverlay}
    </>
  );
}
