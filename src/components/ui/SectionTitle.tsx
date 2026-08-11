import type { ReactNode } from "react";

type SectionTitleProps = {
  children: ReactNode;
  /** Category / archive link for “सबै हेर्नुहोस्”. */
  href?: string;
  moreLabel?: string;
  /** Set false for narrow side columns. Default true. */
  more?: boolean;
};

export function SectionTitle({
  children,
  href = "#",
  moreLabel = "सबै हेर्नुहोस्",
  more = true,
}: SectionTitleProps) {
  return (
    <h2 className="section-title">
      <span className="section-title__text">{children}</span>
      {more ? (
        <a
          className="section-title__more"
          href={href}
          {...(href.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          <span>{moreLabel}</span>
          <i className="fa-solid fa-arrow-up-right-dots" aria-hidden="true" />
        </a>
      ) : null}
    </h2>
  );
}
