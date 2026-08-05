/** ब्लग / विचार */
import type { Post } from "@/types/content";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

type BlogBicharProps = {
  items: Post[];
};

export function BlogBichar({ items }: BlogBicharProps) {
  return (
    <section className="teasers" id="vichar" aria-label="ब्लग / विचार">
      <div className="container">
        <SectionTitle href="/category/vichar">ब्लग / विचार</SectionTitle>
        <div className="teasers__grid">
          {items.map((item, index) => (
            <Reveal
              key={item.id}
              className={`teaser${index ? ` reveal-delay-${Math.min(index, 3)}` : ""}`}
            >
              <a
                className="teaser__thumb"
                href={item.href}
                tabIndex={-1}
                aria-hidden="true"
              >
                {item.imageUrl ? (
                  <img
                    className="img-cover"
                    src={item.imageUrl}
                    alt={item.imageAlt || item.title}
                    width={84}
                    height={64}
                  />
                ) : null}
              </a>
              <h2 className="teaser__title line-2">
                <a href={item.href}>{item.title}</a>
              </h2>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
