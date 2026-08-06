"use client";

import { useCallback } from "react";

type ArticleAuthorShareProps = {
  author?: string;
  authorAvatar?: string;
  title: string;
  href: string;
  bio?: string;
  profileHref?: string;
};

function buildBio(author: string) {
  return `${author} काठमाडौँमा आधारित पत्रकार हुन्। उनी रोजगार, नीति, समाज र समसामयिक विषयमा लेख्छन्। थप जानकारीका लागि सम्पर्क गर्नुहोस्।`;
}

export function ArticleAuthorShare({
  author,
  authorAvatar,
  title,
  href,
  bio,
  profileHref = "#",
}: ArticleAuthorShareProps) {
  const name = author || "सम्पादकीय टोली";
  const pageUrl = `https://rojgarmanch.com${href.startsWith("/") ? href : `/${href}`}`;
  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent(title);

  const onNativeShare = useCallback(async () => {
    const url =
      typeof window !== "undefined" ? window.location.href : pageUrl;
    try {
      if (navigator.share) {
        await navigator.share({ title, text: title, url });
        return;
      }
    } catch {
      /* cancelled */
    }
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      /* ignore */
    }
  }, [pageUrl, title]);

  return (
    <div className="article-byline-box">
      <aside className="article-author-card" aria-label="लेखक">
        {authorAvatar ? (
          <img
            className="article-author-card__avatar"
            src={authorAvatar}
            alt=""
            width={72}
            height={72}
          />
        ) : (
          <span className="article-author-card__avatar article-author-card__avatar--empty" />
        )}

        <div className="article-author-card__copy">
          <p className="article-author-card__label">लेखक</p>
          <h3 className="article-author-card__name">{name}</h3>
          <p className="article-author-card__bio">{bio || buildBio(name)}</p>
        </div>

        <a className="article-author-card__profile" href={profileHref}>
          प्रोफाइल
        </a>
      </aside>

      <div className="article-share-bar" aria-label="सेयर गर्नुहोस्">
        <a
          className="article-share-bar__btn article-share-bar__btn--facebook"
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-facebook-f" aria-hidden="true" />
          <span>Share</span>
        </a>
        <a
          className="article-share-bar__btn article-share-bar__btn--x"
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-x-twitter" aria-hidden="true" />
          <span>Post</span>
        </a>
        <a
          className="article-share-bar__btn article-share-bar__btn--whatsapp"
          href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-whatsapp" aria-hidden="true" />
          <span>Share</span>
        </a>
        <a
          className="article-share-bar__btn article-share-bar__btn--linkedin"
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-linkedin-in" aria-hidden="true" />
          <span>Share</span>
        </a>
        <button
          type="button"
          className="article-share-bar__btn article-share-bar__btn--native"
          onClick={onNativeShare}
        >
          <i className="fa-solid fa-share-nodes" aria-hidden="true" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
}
