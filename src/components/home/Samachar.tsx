import type { Post } from "@/types/content";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CareerPlaybook } from "./CareerPlaybook";

type SamacharProps = {
  items: Post[];
};

/** समाचार col-8 board + करियर प्लेबुक col-4 */
export function Samachar({ items }: SamacharProps) {
  const featured = items[0];
  const side = items.slice(1, 3);
  const row = items.slice(3, 6);

  return (
    <section className="samachar" id="samachar" aria-labelledby="samachar-title">
      <div className="container">
        <div className="samachar__grid">
          <div className="samachar__main">
            <SectionTitle href="/category/samachar">
              <span id="samachar-title">समाचार</span>
            </SectionTitle>

            <div className="samachar-board">
              <div className="samachar-board__top">
                {featured ? (
                  <Reveal className="samachar-feature">
                    <a className="samachar-feature__link" href={featured.href}>
                      <span className="samachar-feature__media">
                        {featured.imageUrl ? (
                          <img
                            className="img-cover"
                            src={featured.imageUrl}
                            alt={featured.imageAlt || featured.title}
                            width={960}
                            height={540}
                          />
                        ) : null}
                      </span>
                      <span className="samachar-feature__body">
                        <span className="samachar-feature__title">
                          {featured.title}
                        </span>
                        {featured.excerpt ? (
                          <span className="samachar-feature__excerpt">
                            {featured.excerpt}
                          </span>
                        ) : null}
                      </span>
                    </a>
                  </Reveal>
                ) : null}

                <div className="samachar-side">
                  {side.map((item, index) => (
                    <Reveal
                      key={item.id}
                      className={`samachar-side__item${index ? ` reveal-delay-${index}` : ""}`}
                    >
                      <a className="samachar-side__media" href={item.href}>
                        {item.imageUrl ? (
                          <img
                            className="img-cover"
                            src={item.imageUrl}
                            alt={item.imageAlt || item.title}
                            width={400}
                            height={240}
                            loading="lazy"
                          />
                        ) : null}
                      </a>
                      <h3 className="samachar-side__title line-2">
                        <a href={item.href}>{item.title}</a>
                      </h3>
                    </Reveal>
                  ))}
                </div>
              </div>

              {row.length ? (
                <div className="samachar-board__row">
                  {row.map((item, index) => (
                    <Reveal
                      key={item.id}
                      className={`samachar-card${index ? ` reveal-delay-${Math.min(index, 3)}` : ""}`}
                    >
                      <a
                        className="samachar-card__media"
                        href={item.href}
                        tabIndex={-1}
                        aria-hidden="true"
                      >
                        {item.imageUrl ? (
                          <img
                            className="img-cover"
                            src={item.imageUrl}
                            alt={item.imageAlt || item.title}
                            width={400}
                            height={240}
                            loading="lazy"
                          />
                        ) : null}
                      </a>
                      <h3 className="samachar-card__title line-2">
                        <a href={item.href}>{item.title}</a>
                      </h3>
                    </Reveal>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <CareerPlaybook />
        </div>
      </div>
    </section>
  );
}
