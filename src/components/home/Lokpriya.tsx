/** लोकप्रिय — Popular */
import type { Post } from "@/types/content";
import { ADS } from "@/lib/ads";
import { Reveal } from "@/components/motion/Reveal";
import { AdUnit } from "@/components/ui/AdUnit";
import { SectionTitle } from "@/components/ui/SectionTitle";

type LokpriyaProps = {
  items: Post[];
};

export function Lokpriya({ items }: LokpriyaProps) {
  return (
    <Reveal className="ranked reveal-delay-2">
      <SectionTitle more={false}>लोकप्रिय</SectionTitle>
      <ol className="ranked__list">
        {items.map((item, index) => (
          <li className="ranked__item" key={item.id}>
            <span className="ranked__num" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="ranked__title line-2">
                <a href={item.href}>{item.title}</a>
              </h3>
              {item.excerpt ? (
                <p className="ranked__excerpt line-2">{item.excerpt}</p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
      <AdUnit ad={ADS.hbl} variant="aside" />
    </Reveal>
  );
}
