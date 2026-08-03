import type { AdCreative } from "@/lib/ads";

type AdUnitProps = {
  ad: AdCreative;
  variant?: "banner" | "aside";
  className?: string;
};

export function AdUnit({ ad, variant = "banner", className = "" }: AdUnitProps) {
  const classes = ["site-ad", `site-ad--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <aside className={classes} aria-label="विज्ञापन">
      <span className="site-ad__label">विज्ञापन</span>
      <a className="site-ad__frame" href={ad.href}>
        <img
          src={ad.src}
          alt={ad.alt}
          width={ad.width}
          height={ad.height}
          loading="lazy"
          decoding="async"
        />
      </a>
    </aside>
  );
}
