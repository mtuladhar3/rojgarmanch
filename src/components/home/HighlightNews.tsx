/** मुख्य समाचार — Highlight news */
import type { HighlightStory } from "@/types/content";
import { Reveal } from "@/components/motion/Reveal";

type HighlightNewsProps = {
  story: HighlightStory;
};

export function HighlightNews({ story }: HighlightNewsProps) {
  return (
    <section
      className="highlight"
      id="highlight"
      aria-labelledby="highlight-title"
    >
      <div className="container">
        <div className="highlight__inner">
          <Reveal className="highlight__content">
            {story.category ? (
              <span className="highlight__badge">{story.category}</span>
            ) : null}

            <h2 className="highlight__title" id="highlight-title">
              <a href={story.href}>{story.title}</a>
            </h2>

            <div className="highlight__meta">
              {story.authorAvatar ? (
                <img
                  className="highlight__avatar"
                  src={story.authorAvatar}
                  alt=""
                  width={28}
                  height={28}
                />
              ) : null}
              {story.author ? (
                <span className="highlight__author">{story.author}</span>
              ) : null}
              {story.dateLabel ? (
                <time className="highlight__date" dateTime={story.dateIso}>
                  <i className="fa-regular fa-calendar" aria-hidden="true" />
                  {story.dateLabel}
                </time>
              ) : null}
            </div>

            {story.imageUrl ? (
              <a className="highlight__media" href={story.href}>
                <img
                  className="img-cover"
                  src={story.imageUrl}
                  alt={story.imageAlt || story.title}
                  width={1200}
                  height={675}
                  loading="lazy"
                />
              </a>
            ) : null}

            {story.excerpt ? (
              <p className="highlight__excerpt">{story.excerpt}</p>
            ) : null}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
