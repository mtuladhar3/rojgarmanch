import { unsplash as u } from "@/lib/media";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Nrn } from "./Nrn";

/** प्रवास — Diaspora */
const stack = [
  ["1556761175-b413da4baf72", "एजेन्सीबाट इन-हाउस जाँदा फाइदा–बेफाइदा", "भदौ ३०, २०८३"],
  ["1600880292203-757bb62b4baf", "स्टार्टअप भूमिका वर्ष दिनमै किन अड्किन्छ", "जेठ १८, २०८३"],
  ["1542744173-8e2bd294f1e5", "नयाँ टोलीमा जोडिने अघि सोध्नुपर्ने दस प्रश्न", "असार २३, २०८३"],
] as const;

export function Pravas() {
  return (
    <Reveal className="reveal">
      <div id="pravas">
        <SectionTitle href="#pravas">प्रवास</SectionTitle>
        <div className="workplace-top">
          <article className="overlay-card">
            <div className="overlay-card__media">
              <img
                src={u("1507003211169-0a1dd7228f2d", 800, 1000)}
                alt="कार्यस्थलमा काम गर्दै पेशेवर"
                width={400}
                height={500}
                loading="lazy"
              />
            </div>
            <div className="overlay-card__body">
              <span className="badge badge--light">संस्कृति</span>
              <h3 className="overlay-card__title line-2">
                <a href="#article">प्रबन्धक परिवर्तन गर्दा हुने सात सामान्य गल्ती</a>
              </h3>
              <div className="meta meta--on-dark">
                <span className="meta__author">ब्रायन कोल</span>
                <span className="meta__dot" aria-hidden="true" />
                <time>जेठ १२, २०८३</time>
              </div>
            </div>
          </article>
          <ul className="stack-list">
            {stack.map(([image, title, date]) => (
              <li className="stack-item" key={title}>
                <a
                  className="stack-item__thumb"
                  href="#article"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <img
                    className="img-cover"
                    src={u(image, 200, 160)}
                    alt={title}
                    width={84}
                    height={68}
                    loading="lazy"
                  />
                </a>
                <div>
                  <h3 className="stack-item__title line-2">
                    <a href="#article">{title}</a>
                  </h3>
                  <time className="recent__date">{date}</time>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <Nrn />
      </div>
    </Reveal>
  );
}
