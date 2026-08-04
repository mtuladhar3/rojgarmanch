/** कला / साहित्य / देश-समाज — shared column block */
import { unsplash as u } from "@/lib/media";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

type ColumnBlockProps = {
  id: string;
  title: string;
  href: string;
  leadImage: string;
  leadTitle: string;
  leadDate: string;
  items: string[];
  delay?: number;
};

export function CategoryColumn({
  id,
  title,
  href,
  leadImage,
  leadTitle,
  leadDate,
  items,
  delay = 0,
}: ColumnBlockProps) {
  return (
    <Reveal
      className={`col-block${delay ? ` reveal-delay-${delay}` : ""}`}
      id={id}
    >
      <SectionTitle href={href}>{title}</SectionTitle>
      <article className="col-block__lead">
        <a
          className="col-block__lead-media"
          href="#article"
          tabIndex={-1}
          aria-hidden="true"
        >
          <img
            className="img-cover"
            src={u(leadImage, 200, 160)}
            alt={leadTitle}
            width={100}
            height={80}
            loading="lazy"
          />
        </a>
        <div>
          <h3 className="col-block__lead-title line-2">
            <a href="#article">{leadTitle}</a>
          </h3>
          <time className="recent__date">{leadDate}</time>
        </div>
      </article>
      <ul>
        {items.map((item) => (
          <li className="col-block__item" key={item}>
            <h4 className="col-block__item-title line-2">
              <a href="#article">{item}</a>
            </h4>
            <time className="recent__date">चैत १०, २०८२</time>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
