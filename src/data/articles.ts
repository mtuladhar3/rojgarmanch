import type { Post } from "@/types/content";
import { unsplash as u } from "@/lib/media";
import { getAllCategorySlugs, getCategoryPosts } from "@/data/categories";
import { getHomePageData } from "@/data/home";

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "figure"; src: string; alt: string; caption?: string }
  | { type: "ol"; items: { title: string; text: string }[] }
  | { type: "quote"; text: string; cite?: string };

export type ArticleTopic = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export type Article = Post & {
  readMinutes: number;
  authorAvatar?: string;
  deck?: string;
  views?: number;
  comments?: number;
  topics: ArticleTopic[];
  body: ArticleBlock[];
};

const defaultTopics: ArticleTopic[] = [
  {
    label: "रोजगार नीति",
    href: "/category/rojgar",
    children: [
      { label: "युवा रोजगार", href: "/category/rojgar" },
      { label: "तालिम", href: "/category/rojgar" },
    ],
  },
  { label: "समाचार", href: "/category/samachar" },
  { label: "अर्थतन्त्र", href: "/category/business" },
  { label: "प्रवास", href: "/category/pravas" },
];

const articles: Record<string, Omit<Article, "href">> = {
  "naya-rojgar-niti": {
    id: 101,
    slug: "naya-rojgar-niti",
    title: "सरकारले ल्यायो नयाँ रोजगार नीति — युवामा प्राथमिकता",
    excerpt:
      "तालिम, उद्यमशीलता र वैदेशिक रोजगार सुरक्षा समेटिएको मार्गचित्र सार्वजनिक। स्थानीय तह र निजी क्षेत्रको भूमिकामा छलफल तीव्र।",
    deck: "नयाँ मार्गचित्रले तालिम, उद्यम र वैदेशिक रोजगारको सुरक्षालाई एकै धागोमा बाँध्ने प्रयास गरेको छ — तर कार्यान्वयनमा स्थानीय तह र निजी क्षेत्रको भूमिका अझै स्पष्ट छैन।",
    category: "समाचार",
    author: "फणीन्द्र नेपाल",
    authorAvatar: u("1472099645785-5658abf4ff4e", 96, 96),
    dateLabel: "साउन १६, २०८३",
    dateIso: "2026-08-01",
    imageUrl: u("1521737711867-e3b97375f902", 1200, 900),
    imageAlt: "कार्यस्थल छलफल",
    readMinutes: 8,
    views: 168,
    comments: 3,
    topics: defaultTopics,
    body: [
      {
        type: "p",
        text: "सरकारले सार्वजनिक गरेको नयाँ रोजगार नीतिले युवाको रोजगारी, सीप विकास र वैदेशिक रोजगारको सुरक्षालाई प्राथमिकतामा राखेको छ। नीति दस्तावेजमा तालिम प्रणालीको पुनःसंरचना, उद्यमशीलता प्रोत्साहन र स्थानीय तहसँगको समन्वयलाई मुख्य स्तम्भका रूपमा राखिएको छ।",
      },
      {
        type: "p",
        text: "नीति निर्माताहरू भन्छन् — समस्या रोजगारको अभाव मात्र होइन, सीप र अवसरबीचको दूरी हो। त्यसैले नयाँ मार्गचित्रले विद्यालयदेखि रोजगार बजारसम्मको पुल बनाउने लक्ष्य राखेको छ। तर कार्यान्वयनको जिम्मेवारी कुन निकायले लिने भन्नेमा अझै मतभेद देखिएको छ।",
      },
      {
        type: "h2",
        id: "silence",
        text: "नीतिले छोएको मौनता",
      },
      {
        type: "p",
        text: "कागजी रूपमा नीति व्यापक देखिन्छ। व्यावहारिक रूपमा भने धेरै युवा अझै पनि ‘कुन तालिम रोज्ने’ र ‘कुन निकायमा जाने’ भन्ने अन्योलमै छन्। जिल्ला तहका रोजगार सेवा केन्द्रहरूको क्षमता, बजेट र कर्मचारी अभावले नीतिलाई मैदानमा ढिलो बनाउन सक्छ।",
      },
      {
        type: "figure",
        src: u("1522071820081-009f0129c71c", 1100, 620),
        alt: "तालिम र सहकार्यमा युवाहरू",
        caption: "स्थानीय तालिम केन्द्रमा अभ्यास गर्दै युवाहरू — नीति कार्यान्वयनको वास्तविक परीक्षा यहीँ हुन्छ।",
      },
      {
        type: "h2",
        id: "presence",
        text: "उपस्थिति मात्र पर्याप्त छैन",
      },
      {
        type: "ol",
        items: [
          {
            title: "वास्तविक पहुँच",
            text: "नीति घोषणा हुनु र युवाको गाउँसम्म तालिम पुग्नु फरक कुरा हुन्। पहुँचविनाको नीति कागजमै सीमित रहन्छ।",
          },
          {
            title: "निजी क्षेत्रको भूमिका",
            text: "रोजगारदाताले सीप मापदण्ड स्पष्ट नगरेसम्म तालिम बजारको मागसँग जोडिँदैन। सहकार्य बिना वृद्धि असम्भव छ।",
          },
          {
            title: "अनुगमन र जवाफदेही",
            text: "कुन कार्यक्रमले कति रोजगार सिर्जना गर्‍यो भन्ने मापन नभएसम्म बजेट दोहोरिने तर परिणाम नदेखिने जोखिम रहन्छ।",
          },
        ],
      },
      {
        type: "quote",
        text: "नीतिले बाटो देखाउन सक्छ, तर बाटो हिँड्ने काम स्थानीय संयन्त्र र रोजगारदाताबिना पूरा हुँदैन।",
        cite: "फणीन्द्र नेपाल",
      },
      {
        type: "h2",
        id: "next",
        text: "अर्को कदम के हुनुपर्छ",
      },
      {
        type: "p",
        text: "विशेषज्ञहरू सुझाउँछन् — पहिलो चरणमा जिल्ला स्तरीय रोजगार सेवा केन्द्रलाई डिजिटल दर्ता, तालिम सूचीकरण र रोजगारदातासँगको मेल मिलाउने प्लेटफर्म बनाइनुपर्छ। दोस्रो, वैदेशिक रोजगारमा जाने युवाका लागि अभिमुखीकरण र उजुरी संयन्त्र अनिवार्य हुनुपर्छ।",
      },
      {
        type: "p",
        text: "नयाँ नीति आशा जगाउने दस्तावेज हो। तर आशालाई रोजगारमा बदल्न समयमै बजेट, संयन्त्र र स्पष्ट जिम्मेवारी चाहिन्छ — अन्यथा यो पनि थप एक घोषणा मात्र बन्ने जोखिम छ।",
      },
    ],
  },
};

function buildFallback(post: Post): Article {
  const minutes = Math.max(
    4,
    Math.min(10, Math.round(((post.excerpt ?? "").split(/\s+/).length || 40) / 8)),
  );
  const topics = [
    ...(post.category
      ? [{ label: post.category, href: "/category/samachar" }]
      : []),
    ...defaultTopics,
  ].filter(
    (topic, index, list) =>
      list.findIndex((item) => item.label === topic.label) === index,
  );

  return {
    ...post,
    readMinutes: minutes,
    views: 80 + (Number(post.id) % 200 || 40),
    comments: 1 + (Number(post.id) % 12 || 2),
    authorAvatar: u("1472099645785-5658abf4ff4e", 96, 96),
    deck: post.excerpt,
    topics,
    body: [
      {
        type: "p",
        text:
          post.excerpt ??
          "यो सामग्रीको विस्तृत पाठ चाँडै उपलब्ध हुनेछ। रोजगार मञ्चमा ताजा विश्लेषण र कथाहरू नियमित अद्यावधिक हुन्छन्।",
      },
      {
        type: "h2",
        id: "context",
        text: "सन्दर्भ र महत्व",
      },
      {
        type: "p",
        text: "रोजगार बजारमा आएका परिवर्तन, नीतिगत निर्णय र व्यावसायिक अभ्यासहरूले युवा तथा पेशेवरहरूको दैनिक निर्णयलाई प्रत्यक्ष असर पार्छन्। यस विषयलाई बुझ्दा मात्र सही कदम चाल्न सकिन्छ।",
      },
      ...(post.imageUrl
        ? ([
            {
              type: "figure" as const,
              src: post.imageUrl,
              alt: post.imageAlt || post.title,
              caption: post.title,
            },
          ] as ArticleBlock[])
        : []),
      {
        type: "ol",
        items: [
          {
            title: "मुख्य बुँदा",
            text: "नीति, बजार र व्यक्तिगत तयारी तीनै पक्ष सँगै हिँड्नुपर्छ।",
          },
          {
            title: "व्यावहारिक सुझाव",
            text: "सीप अद्यावधिक राख्नुहोस्, नेटवर्क बनाउनुहोस् र अवसरको समयमै फलोअप गर्नुहोस्।",
          },
          {
            title: "अगाडिको बाटो",
            text: "विश्वसनीय स्रोतबाट जानकारी लिई निर्णय गर्नु दीर्घकालीन फाइदा हुन्छ।",
          },
        ],
      },
      {
        type: "quote",
        text: "सही जानकारी र सही समय — करियरको दिशा बदल्ने दुई शक्तिशाली औजार।",
        cite: post.author,
      },
      {
        type: "h2",
        id: "closing",
        text: "निष्कर्ष",
      },
      {
        type: "p",
        text: "विस्तृत रिपोर्ट र अन्तर्वार्ता क्रमशः थपिँदै जानेछन्। रोजगार मञ्चमा सम्बन्धित श्रेणीका थप सामग्री पढ्नुहोस्।",
      },
    ],
  };
}

function allPosts(): Post[] {
  const home = getHomePageData();
  const fromCategories = getAllCategorySlugs().flatMap((slug) =>
    getCategoryPosts(slug),
  );
  return [
    home.highlight,
    home.feature,
    ...home.featurePair,
    ...home.teasers,
    ...home.recent,
    ...home.stories,
    ...fromCategories,
  ];
}

export function getAllArticleSlugs(): string[] {
  const slugs = new Set<string>([
    ...Object.keys(articles),
    ...allPosts().map((p) => p.slug).filter(Boolean),
  ]);
  return [...slugs];
}

export function getArticle(slug: string): Article | null {
  const rich = articles[slug];
  if (rich) {
    return { ...rich, href: `/article/${rich.slug}` };
  }

  const match = allPosts().find((p) => p.slug === slug);
  if (!match) return null;
  return buildFallback(match);
}
