/** Shared content shapes — keep field names stable for a future CMS. */

export type Post = {
  id: number | string;
  slug: string;
  title: string;
  excerpt?: string;
  href: string;
  imageUrl?: string;
  imageAlt?: string;
  category?: string;
  author?: string;
  dateLabel?: string;
  dateIso?: string;
};

export type SiteInfo = {
  name: string;
  domain: string;
  registrationNo: string;
  address: string;
  phone: string;
  email: string;
  social: { label: string; href: string; icon: string }[];
  team: { role: string; name: string }[];
  quickLinks: { href: string; label: string }[];
};

export type HighlightStory = Post & {
  authorAvatar?: string;
};

export type HomePageData = {
  teasers: Post[];
  recent: Post[];
  highlight: HighlightStory;
  feature: Post;
  featurePair: Post[];
  ranked: Post[];
  stories: Post[];
  flashNews: Post[];
  trending: Post[];
};
