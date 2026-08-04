"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { Post } from "@/types/content";
import { NAV_LINKS } from "@/lib/nav";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useUi } from "@/components/providers/UiProvider";

type SiteNavProps = {
  flashNews: Post[];
  trending: Post[];
};

type NotifyTab = "taja" | "trending";

export function SiteNav({ flashNews, trending }: SiteNavProps) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { menuOpen, notifyOpen, toggleMenu, toggleNotify, toggleSearch } =
    useUi();
  const [scrolled, setScrolled] = useState(false);
  const [notifyTab, setNotifyTab] = useState<NotifyTab>("taja");
  const [panelTop, setPanelTop] = useState(72);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (notifyOpen) setNotifyTab("taja");
  }, [notifyOpen]);

  useEffect(() => {
    if (!notifyOpen) return;

    const placePanel = () => {
      const nav = document.getElementById("site-nav");
      if (!nav) return;
      const bottom = nav.getBoundingClientRect().bottom;
      setPanelTop(Math.round(bottom + 8));
    };

    placePanel();
    window.addEventListener("scroll", placePanel, { passive: true });
    window.addEventListener("resize", placePanel);
    return () => {
      window.removeEventListener("scroll", placePanel);
      window.removeEventListener("resize", placePanel);
    };
  }, [notifyOpen]);

  return (
    <div className={`nav-bar${scrolled ? " is-scrolled" : ""}`} id="site-nav">
      <div className="container">
        <div className="nav-bar__shell">
          <div className="nav-bar__start">
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

          <a className="nav-logo" href="/" aria-label="रोजगार मञ्च">
            <img
              src="/images/logo.png"
              alt="रोजगार मञ्च"
              width={120}
              height={36}
            />
          </a>

          <nav className="nav" aria-label="मुख्य मेनु">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);
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
            <div className="notify">
              <button
                className="icon-btn notify__btn"
                type="button"
                aria-label="सूचना"
                aria-expanded={notifyOpen}
                aria-controls="notify-panel"
                onClick={toggleNotify}
              >
                <i className="fa-regular fa-bell" aria-hidden="true" />
                <span className="notify__dot" aria-hidden="true" />
              </button>

              {notifyOpen ? (
                <div
                  className="notify__panel"
                  id="notify-panel"
                  role="region"
                  aria-label="सूचना केन्द्र"
                  style={{ ["--notify-panel-top" as string]: `${panelTop}px` }}
                >
                  <div
                    className="notify__tabs"
                    role="tablist"
                    aria-label="सूचना ट्याब"
                  >
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
                                <span className="notify-flash__title">
                                  {item.title}
                                </span>
                                {item.dateLabel ? (
                                  <span className="notify-flash__meta">
                                    · {item.dateLabel}
                                  </span>
                                ) : null}
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
                              <span
                                className="notify-trend__rank"
                                aria-hidden="true"
                              >
                                {index + 1}
                              </span>
                              <span className="notify-trend__title">
                                {item.title}
                              </span>
                            </a>
                          </li>
                        ))}
                      </ol>
                    </section>
                  </div>
                </div>
              ) : null}
            </div>

            <button
              className="icon-btn"
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
          </div>
        </div>
      </div>
    </div>
  );
}
