import type { CategoryInfo } from "@/data/categories";
import type { Post } from "@/types/content";
import { Reveal } from "@/components/motion/Reveal";
import { AdUnit } from "@/components/ui/AdUnit";
import { ADS } from "@/lib/ads";

type CategoryPageProps = {
  category: CategoryInfo;
  posts: Post[];
};

function readMinutes(excerpt?: string) {
  const words = (excerpt ?? "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.min(12, Math.round(words / 12) || 5));
}

function PostCard({
  item,
  categoryLabel,
  delay,
}: {
  item: Post;
  categoryLabel: string;
  delay?: number;
}) {
  return (
    <Reveal
      className={`category-card${delay ? ` reveal-delay-${delay}` : ""}`}
    >
      <a
        className="category-card__media"
        href={item.href}
        tabIndex={-1}
        aria-hidden="true"
      >
        {item.imageUrl ? (
          <img
            className="img-cover"
            src={item.imageUrl}
            alt={item.imageAlt || item.title}
            width={720}
            height={480}
            loading="lazy"
          />
        ) : null}
        <span className="category-card__tag">
          <i aria-hidden="true" />
          {item.category || categoryLabel}
        </span>
      </a>

      <div className="category-card__body">
        <p className="category-card__meta">
          <span>{readMinutes(item.excerpt)} मिनेट</span>
        </p>
        <h2 className="category-card__title">
          <a href={item.href}>{item.title}</a>
        </h2>
        {item.excerpt ? (
          <p className="category-card__excerpt line-2">{item.excerpt}</p>
        ) : null}
      </div>
    </Reveal>
  );
}

export function CategoryPage({ category, posts }: CategoryPageProps) {
  const featured = posts[0];
  const side = posts[1];
  const rest = posts.slice(2);

  return (
    <main id="main" className="category-page">
      <div className="container">
        <header className="category-head">
          <div className="category-head__top">
            <h1 id="category-title">{category.labelNe}</h1>
            <span className="category-head__count">{posts.length} सामग्री</span>
          </div>
          <p className="category-head__desc">
            <span className="category-head__en">{category.labelEn}</span>
            {category.description}
          </p>
        </header>

        {featured ? (
          <div className="category-lead">
            <Reveal className="category-feature">
              <a className="category-feature__link" href={featured.href}>
                {featured.imageUrl ? (
                  <img
                    className="category-feature__img"
                    src={featured.imageUrl}
                    alt={featured.imageAlt || featured.title}
                    width={1100}
                    height={700}
                    fetchPriority="high"
                  />
                ) : null}
                <span className="category-feature__shade" aria-hidden="true" />
                <span className="category-feature__content">
                  <span className="category-feature__badge">
                    {featured.category || category.labelNe}
                  </span>
                  <h2 className="category-feature__title">{featured.title}</h2>
                </span>
              </a>
            </Reveal>

            <div className="category-lead__aside">
              {side ? (
                <PostCard
                  item={side}
                  categoryLabel={category.labelNe}
                  delay={1}
                />
              ) : null}
              <AdUnit
                ad={ADS.belaco}
                variant="aside"
                className="category-lead__ad"
              />
            </div>
          </div>
        ) : null}

        {rest.length > 0 ? (
          <section className="category-stream" aria-label="थप सामग्री">
            <div className="category-cards">
              {rest.map((item, index) => (
                <PostCard
                  key={item.id}
                  item={item}
                  categoryLabel={category.labelNe}
                  delay={Math.min((index % 3) + 1, 3)}
                />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
