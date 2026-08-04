import type { Post } from "@/types/content";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

type SamacharProps = {
  items: Post[];
};

/** समाचार — News */
export function Samachar({ items }: SamacharProps) {
  return (
    <section
      className="stories container"
      id="stories"
      aria-labelledby="stories-title"
    >
      <SectionTitle href="/category/samachar">
        <span id="stories-title">समाचार</span>
      </SectionTitle>
      <div className="stories__grid">
        {items.map((item, index) => (
          <Reveal
            key={item.id}
            className={`story${index ? ` reveal-delay-${index}` : ""}`}
          >
            <a
              className="story__media"
              href={item.href}
              tabIndex={-1}
              aria-hidden="true"
            >
              {item.imageUrl ? (
                <img
                  className="img-cover"
                  src={item.imageUrl}
                  alt={item.imageAlt || item.title}
                  width={480}
                  height={330}
                  loading="lazy"
                />
              ) : null}
            </a>
            <div className="meta">
              {item.author ? (
                <span className="meta__author">{item.author}</span>
              ) : null}
              <span className="meta__dot" aria-hidden="true" />
              {item.dateLabel ? (
                <time dateTime={item.dateIso}>{item.dateLabel}</time>
              ) : null}
            </div>
            <h3 className="story__title line-2">
              <a href={item.href}>{item.title}</a>
            </h3>
            {item.excerpt ? (
              <p className="story__excerpt line-2">{item.excerpt}</p>
            ) : null}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
