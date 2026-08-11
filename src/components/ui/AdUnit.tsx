import type { AdCreative } from "@/lib/ads";

const MOBILE_STATIC_AD_SRC = "/images/Mob-Banner_710x125_img.jpg.jpeg";

type AdUnitProps = {
  ad: AdCreative;
  variant?: "banner" | "aside";
  className?: string;
};

export function AdUnit({ ad, variant = "banner", className = "" }: AdUnitProps) {
  const classes = ["site-ad", `site-ad--${variant}`, className]
    .filter(Boolean)
    .join(" ");
  const mobileSrc = variant === "aside" ? MOBILE_STATIC_AD_SRC : MOBILE_STATIC_AD_SRC;

  return (
    <aside className={classes} aria-label="विज्ञापन">
      <a className="site-ad__frame" href={ad.href}>
        <picture>
          <source media="(max-width: 767px)" srcSet={mobileSrc} />
          <img
            src={ad.src}
            alt={ad.alt}
            width={ad.width}
            height={ad.height}
            loading="lazy"
            decoding="async"
          />
        </picture>
      </a>
    </aside>
  );
}
