/** अन्तर्वार्ता — Interview (center feature column) */
import type { Post } from "@/types/content";
import { Reveal } from "@/components/motion/Reveal";

type AntarwartaProps = {
  feature: Post;
  featurePair: Post[];
};

export function Antarwarta({ feature, featurePair }: AntarwartaProps) {
  return (
    <div className="feature-col" id="interview">
      <Reveal className="feature reveal-delay-1">
        <a className="feature__media" href={feature.href}>
          {feature.imageUrl ? (
            <img
              className="img-cover"
              src={feature.imageUrl}
              alt={feature.imageAlt || feature.title}
              width={1000}
              height={700}
              fetchPriority="high"
            />
          ) : null}
          {feature.category ? (
            <span className="badge feature__badge">{feature.category}</span>
          ) : null}
        </a>
        <h1 className="feature__title">
          <a href={feature.href}>{feature.title}</a>
        </h1>
        {feature.excerpt ? (
          <p className="feature__excerpt">{feature.excerpt}</p>
        ) : null}
        <div className="meta">
          {feature.author ? (
            <span className="meta__author">{feature.author}</span>
          ) : null}
          <span className="meta__dot" aria-hidden="true" />
          {feature.dateLabel ? (
            <time dateTime={feature.dateIso}>{feature.dateLabel}</time>
          ) : null}
        </div>
      </Reveal>

      <div className="feature-pair">
        {featurePair.map((item, index) => (
          <Reveal
            key={item.id}
            className={`feature-sm${index ? " reveal-delay-1" : ""}`}
          >
            <a className="feature-sm__media" href={item.href}>
              {item.imageUrl ? (
                <img
                  className="img-cover"
                  src={item.imageUrl}
                  alt={item.imageAlt || item.title}
                  width={640}
                  height={420}
                  loading="lazy"
                />
              ) : null}
              {item.category ? (
                <span className="badge feature-sm__badge">{item.category}</span>
              ) : null}
            </a>
            <h3 className="feature-sm__title line-2">
              <a href={item.href}>{item.title}</a>
            </h3>
            {item.excerpt ? (
              <p className="feature-sm__excerpt line-2">{item.excerpt}</p>
            ) : null}
            <div className="meta">
              {item.author ? (
                <span className="meta__author">{item.author}</span>
              ) : null}
              <span className="meta__dot" aria-hidden="true" />
              {item.dateLabel ? <time>{item.dateLabel}</time> : null}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
