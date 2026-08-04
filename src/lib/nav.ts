/** Site navigation — each item (except गृह) is a category archive. */
export const NAV_LINKS = [
  { href: "/", slug: "home", labelNe: "गृह", labelEn: "Home" },
  {
    href: "/category/samachar",
    slug: "samachar",
    labelNe: "समाचार",
    labelEn: "News",
  },
  {
    href: "/category/rojgar",
    slug: "rojgar",
    labelNe: "रोजगार",
    labelEn: "Jobs",
  },
  {
    href: "/category/antarwarta",
    slug: "antarwarta",
    labelNe: "अन्तर्वार्ता",
    labelEn: "Interview",
  },
  {
    href: "/category/business",
    slug: "business",
    labelNe: "बिजनेस",
    labelEn: "Business",
  },
  { href: "/category/nrn", slug: "nrn", labelNe: "एनआरएन", labelEn: "NRN" },
  {
    href: "/category/pravas",
    slug: "pravas",
    labelNe: "प्रवास",
    labelEn: "Diaspora",
  },
  {
    href: "/category/vichar",
    slug: "vichar",
    labelNe: "विचार / ब्लग",
    labelEn: "Opinion",
  },
  {
    href: "/category/feature",
    slug: "feature",
    labelNe: "फिचर",
    labelEn: "Feature",
  },
  { href: "/category/kala", slug: "kala", labelNe: "कला", labelEn: "Arts" },
  {
    href: "/category/sahitya",
    slug: "sahitya",
    labelNe: "साहित्य",
    labelEn: "Literature",
  },
  {
    href: "/category/samaj",
    slug: "samaj",
    labelNe: "देश/समाज",
    labelEn: "Society",
  },
  { href: "/category/tv", slug: "tv", labelNe: "टि. भी.", labelEn: "TV" },
] as const;

export type NavLink = (typeof NAV_LINKS)[number];
export type CategorySlug = Exclude<NavLink["slug"], "home">;

export function getNavCategories() {
  return NAV_LINKS.filter((link) => link.slug !== "home");
}
