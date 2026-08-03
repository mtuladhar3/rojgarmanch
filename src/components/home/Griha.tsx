/** गृह — Home */
import type { Post } from "@/types/content";
import { Reveal } from "@/components/motion/Reveal";

type GrihaProps = {
  items: Post[];
};

export function Griha({ items }: GrihaProps) {
  return (
    <section className="teasers" id="home" aria-label="गृह">
      <div className="container">
        <div className="teasers__grid">
          {items.map((item, index) => (
            <Reveal
              key={item.id}
              className={`teaser${index ? ` reveal-delay-${index}` : ""}`}
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
