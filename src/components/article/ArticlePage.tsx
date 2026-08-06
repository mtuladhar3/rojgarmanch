import type { Article, ArticleBlock } from "@/data/articles";
import { getRelatedArticles } from "@/data/articles";
import {
  ArticleFontControls,
  ArticleFontProvider,
} from "./ArticleFontSize";
import {
  ArticleAiSummary,
  type AiSummaryItem,
} from "./ArticleAiSummary";
import { ArticleHeroImage } from "./ArticleHeroImage";
import { ArticleStickyTitle } from "./ArticleStickyTitle";
import { ArticleAuthorShare } from "./ArticleAuthorShare";
import { SectionTitle } from "@/components/ui/SectionTitle";

type ArticlePageProps = {
  article: Article;
};

function buildAiSummary(article: Article): AiSummaryItem[] {
  const items: AiSummaryItem[] = [];

  if (article.deck || article.excerpt) {
    items.push({
      title: "मुख्य सारांश",
      text: article.deck || article.excerpt || article.title,
    });
  }

  for (let i = 0; i < article.body.length; i += 1) {
    const block = article.body[i];
    if (block.type === "h2") {
      const next = article.body[i + 1];
      if (next?.type === "p") {
        items.push({ title: block.text, text: next.text });
      } else if (next?.type === "steps") {
        for (const step of next.items) {
          items.push({
            title: step.title,
            text: `${step.title} — ${step.text}`,
          });
        }
      } else if (next?.type === "ul" || next?.type === "ol") {
        items.push({
          title: block.text,
          text: next.items.join(" · "),
        });
      } else {
        items.push({
          title: block.text,
          text: `${block.text} सम्बन्धी विश्लेषण यस लेखमा समेटिएको छ।`,
        });
      }
    }
  }

  if (items.length < 2) {
    items.push(
      {
        title: "के भयो?",
        text:
          article.excerpt ||
          "यो समाचारले रोजगार र नीतिसँग जोडिएका ताजा विकासलाई समेटेको छ।",
      },
      {
        title: "किन महत्वपूर्ण?",
        text: "यसले युवा, कामदार र नीति निर्माताको दैनिक निर्णयलाई असर पार्न सक्छ।",
      },
      {
        title: "अर्को कदम",
        text: "पूर्ण लेख पढेर सन्दर्भ, सुझाव र विश्लेषण बुझ्नुहोस्।",
      },
    );
  }

  return items.slice(0, 5);
}

function slugifyHeading(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6": {
      const Tag = block.type;
      const id = block.id || slugifyHeading(block.text);
      return <Tag id={id}>{block.text}</Tag>;
    }
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
    case "ul":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );
    case "steps":
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
    case "blockquote":
      return (
        <blockquote className="article-quote">
          <span className="article-quote__mark" aria-hidden="true">
            “
          </span>
          <p>{block.text}</p>
          {block.cite ? <cite>— {block.cite}</cite> : null}
        </blockquote>
      );
    case "hr":
      return <hr className="article-hr" />;
    default:
      return null;
  }
}

export function ArticlePage({ article }: ArticlePageProps) {
  const related = getRelatedArticles(article.slug, 6);
  const relatedRail = related.slice(0, 3);
  const relatedMore = related.slice(0, 4);
  const aiSummary = buildAiSummary(article);

  return (
    <main id="main" className="article-page">
      <ArticleFontProvider>
      <div className="container">
        <header className="article-hero">
          

          {article.imageUrl ? (
            <ArticleHeroImage
              src={article.imageUrl}
              alt={article.imageAlt || article.title}
            />
          ) : null}

          <div className="article-hero__copy">
            <div className="article-title-sentinel" aria-hidden="true" />
            <div className="article-hero__sticky">
              <h1 id="article-title">{article.title}</h1>

              {article.deck ? (
                <p className="article-hero__deck">{article.deck}</p>
              ) : (
                <p className="article-hero__deck">{article.excerpt}</p>
              )}

              <div className="article-hero__author">
                {article.authorAvatar ? (
                  <img
                    className="article-hero__avatar"
                    src={article.authorAvatar}
                    alt=""
                    width={40}
                    height={40}
                  />
                ) : null}

                <div className="article-hero__byline">
                  {article.author ? (
                    <span className="article-hero__by">{article.author}</span>
                  ) : null}
                  {article.dateLabel ? (
                    <>
                      <span className="article-hero__dot" aria-hidden="true">
                        ·
                      </span>
                      <time dateTime={article.dateIso}>{article.dateLabel}</time>
                    </>
                  ) : null}
                  <span className="article-hero__dot" aria-hidden="true">
                    ·
                  </span>
                  <span>{article.readMinutes} मिनेट पढाइ</span>
                </div>
                <ArticleFontControls compact />
              </div>
            </div>

            
          </div>
        </header>

        <div className="article-layout">
          <aside className="article-rail" aria-label="सम्बन्धित र सेयर">
            {relatedRail.length ? (
              <div className="article-rail__block">
                <SectionTitle more={false}>यो पनि हेर्नुहोस्</SectionTitle>
                <ul className="article-related">
                  {relatedRail.map((item) => (
                    <li key={item.href}>
                      <a className="article-related__item" href={item.href}>
                        <span className="article-related__thumb">
                          <img
                            src={item.imageUrl}
                            alt=""
                            width={72}
                            height={72}
                            loading="lazy"
                          />
                        </span>
                        <span className="article-related__title">{item.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

          </aside>

          <article className="article-body" aria-labelledby="article-title">
            <ArticleStickyTitle title={article.title} />
            <ArticleAiSummary items={aiSummary} />
            {article.body.map((block, index) => (
              <Block key={`${block.type}-${index}`} block={block} />
            ))}
            <ArticleAuthorShare
              author={article.author}
              authorAvatar={article.authorAvatar}
              title={article.title}
              href={article.href}
            />
          </article>
        </div>

        {relatedMore.length ? (
          <section
            className="article-more"
            aria-labelledby="article-more-title"
          >
            <SectionTitle href="/category/samachar" moreLabel="सबै हेर्नुहोस्">
              <span id="article-more-title">सम्बन्धित समाचार</span>
            </SectionTitle>

            <div className="article-more__grid">
              {relatedMore.map((item) => (
                <article key={item.href} className="article-more__card">
                  <a className="article-more__media" href={item.href}>
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.imageAlt || item.title}
                        width={640}
                        height={400}
                        loading="lazy"
                      />
                    ) : null}
                  </a>
                  <h3 className="article-more__title">
                    <a href={item.href}>{item.title}</a>
                  </h3>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </div>
      </ArticleFontProvider>
    </main>
  );
}
