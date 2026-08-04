import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllCategorySlugs,
  getCategory,
  getCategoryPosts,
} from "@/data/categories";
import { getHomePageData, getSiteInfo } from "@/data/home";
import { CategoryPage } from "@/components/category/CategoryPage";
import { SiteChrome } from "@/components/layout/SiteChrome";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "श्रेणी फेला परेन" };

  return {
    title: `${category.labelNe} — रोजगार मञ्च`,
    description: category.description,
    alternates: { canonical: `https://rojgarmanch.com/category/${category.slug}` },
  };
}

export default async function CategoryRoute({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const posts = getCategoryPosts(slug);
  const home = getHomePageData();
  const site = getSiteInfo();

  return (
    <SiteChrome
      flashNews={home.flashNews}
      trending={home.trending}
      site={site}
    >
      <CategoryPage category={category} posts={posts} />
    </SiteChrome>
  );
}
