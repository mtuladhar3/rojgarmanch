/** खेल / पर्यटन / रमाइलो संसार — shared column block */
import { unsplash as u } from "@/lib/media";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

type ColumnItem = {
  title: string;
  imageUrl?: string;
};

type ColumnBlockProps = {
  id: string;
  title: string;
  href: string;
  leadImage: string;
  leadTitle: string;
  items: (string | ColumnItem)[];
  delay?: number;
};

export function CategoryColumn({
  id,
  title,
  href,
  leadImage,
  leadTitle,
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
        </div>
      </article>
      <ul>
        {items.map((item) => {
          const itemObj = typeof item === "string" ? { title: item } : item;
          return (
            <li className="col-block__item" key={itemObj.title}>
              {itemObj.imageUrl ? (
                <a className="col-block__item-media" href="#article" tabIndex={-1} aria-hidden="true">
                  <img
                    className="img-cover"
                    src={u(itemObj.imageUrl, 92, 80)}
                    alt={itemObj.title}
                    width={92}
                    height={80}
                    loading="lazy"
                  />
                </a>
              ) : null}
              <h4 className="col-block__item-title line-2">
                <a href="#article">{itemObj.title}</a>
              </h4>
            </li>
          );
        })}
      </ul>
    </Reveal>
  );
}
