/** Static ad creatives — swap src/href when CMS or ad server is wired. */
export const ADS = {
  ncell: {
    src: "/images/1100x110px_NCELL.gif",
    alt: "Ncell विज्ञापन",
    width: 1100,
    height: 110,
    href: "#",
  },
  worldlink: {
    src: "/images/WorldLink-1100-x-100.gif",
    alt: "WorldLink विज्ञापन",
    width: 1100,
    height: 100,
    href: "#",
  },
  hardik: {
    src: "/images/Hardik-850.100-e1724679881539.jpg",
    alt: "Hardik विज्ञापन",
    width: 1200,
    height: 146,
    href: "#",
  },
  hbl: {
    src: "/images/HBL-1.gif",
    alt: "HBL विज्ञापन",
    width: 810,
    height: 100,
    href: "#",
  },
  belaco: {
    src: "/images/Belaco-2080.jpg",
    alt: "Belaco विज्ञापन",
    width: 1080,
    height: 1080,
    href: "#",
  },
} as const;

export type AdCreative = (typeof ADS)[keyof typeof ADS];
