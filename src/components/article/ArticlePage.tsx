import type { Article, ArticleBlock } from "@/data/articles";
import {
  ArticleFontControls,
  ArticleFontProvider,
} from "./ArticleFontSize";

type ArticlePageProps = {
  article: Article;
};

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "h2":
      return <h2 id={block.id}>{block.text}</h2>;
    case "figure":
      return (
        <figure className="article-figure">
          <img
            src={block.src}
            alt={block.alt}
            width={1100}
            height={620}
            loading="lazy"
          />
          {block.caption ? (
            <figcaption>{block.caption}</figcaption>
          ) : null}
        </figure>
      );
    case "ol":
      return (
        <ol className="article-steps">
          {block.items.map((item, index) => (
            <li key={item.title}>
              <h3>
                <span className="article-steps__num" aria-hidden="true">
                  {index + 1}.
                </span>{" "}
                {item.title}
              </h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote className="article-quote">
          <span className="article-quote__mark" aria-hidden="true">
            “
          </span>
          <p>{block.text}</p>
          {block.cite ? <cite>— {block.cite}</cite> : null}
        </blockquote>
      );
    default:
      return null;
  }
}

export function ArticlePage({ article }: ArticlePageProps) {
  const shareUrl = `https://rojgarmanch.com${article.href}`;
  const shareText = article.title;

  return (
    <main id="main" className="article-page">
      <ArticleFontProvider>
      <div className="container">
        <header className="article-hero">
          <div className="article-hero__copy">
            <div className="article-hero__meta">
              {article.category ? (
                <span className="article-hero__tag">
                  <i aria-hidden="true" />
                  {article.category}
                </span>
              ) : null}
              <span className="article-hero__stat">
                <i className="fa-solid fa-bolt" aria-hidden="true" />
                {article.views ?? 168} हेराइ
              </span>
              <span className="article-hero__stat">
                <i className="fa-regular fa-comment" aria-hidden="true" />
                {article.comments ?? 3} टिप्पणी
              </span>
            </div>

            <h1 id="article-title">{article.title}</h1>

            {article.deck ? (
              <p className="article-hero__deck">{article.deck}</p>
            ) : null}

            <div className="article-hero__author">
              {article.authorAvatar ? (
                <img
                  src={article.authorAvatar}
                  alt=""
                  width={40}
                  height={40}
                />
              ) : null}
              {article.author ? (
                <span className="article-hero__by">{article.author}</span>
              ) : null}
              {article.dateLabel ? (
                <>
                  <span aria-hidden="true">·</span>
                  <time dateTime={article.dateIso}>{article.dateLabel}</time>
                </>
              ) : null}
              <span aria-hidden="true">·</span>
              <span>{article.readMinutes} मिनेट पढाइ</span>
              <ArticleFontControls compact />
            </div>
          </div>

          {article.imageUrl ? (
            <div className="article-hero__media">
              <img
                src={article.imageUrl}
                alt={article.imageAlt || article.title}
                width={900}
                height={720}
                fetchPriority="high"
              />
            </div>
          ) : null}
        </header>

        <div className="article-layout">
          <aside className="article-rail" aria-label="विषय र सेयर">
            <div className="article-rail__block">
              <p className="article-rail__label">विषयहरू</p>
              <ul className="article-topics">
                {article.topics.map((topic, index) => (
                  <li key={`${topic.href}-${topic.label}-${index}`}>
                    <a href={topic.href}>{topic.label}</a>
                    {topic.children?.length ? (
                      <ul>
                        {topic.children.map((child, childIndex) => (
                          <li key={`${child.href}-${child.label}-${childIndex}`}>
                            <a href={child.href}>{child.label}</a>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>

            <div className="article-rail__block article-rail__block--font">
              <ArticleFontControls />
            </div>

            <div className="article-rail__block">
              <p className="article-rail__label">सेयर</p>
              <div className="article-share">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="फेसबुकमा सेयर"
                >
                  <i className="fa-brands fa-facebook-f" aria-hidden="true" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="एक्समा सेयर"
                >
                  <i className="fa-brands fa-x-twitter" aria-hidden="true" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="लिंक्डइनमा सेयर"
                >
                  <i className="fa-brands fa-linkedin-in" aria-hidden="true" />
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="व्हाट्सएपमा सेयर"
                >
                  <i className="fa-brands fa-whatsapp" aria-hidden="true" />
                </a>
              </div>
            </div>
          </aside>

          <article className="article-body" aria-labelledby="article-title">
            {article.body.map((block, index) => (
              <Block key={`${block.type}-${index}`} block={block} />
            ))}
          </article>
        </div>
      </div>
      </ArticleFontProvider>
    </main>
  );
}
