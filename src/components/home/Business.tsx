import { unsplash as u } from "@/lib/media";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
const posts = [["नयाँ अपरेटिङ मोडेल चाहिने दस संकेत","स्यामुएल राव","माघ ९, २०८२"],["सार्वजनिक रूपमा डेलिभर गर्ने अपरेटरहरूको वर्ष","लोरी वेस्ट","माघ २८, २०८२"],["आधुनिक उत्पादन शिल्प सिक्ने उत्कृष्ट स्रोत","जोआन वालेस","फाल्गुन १६, २०८२"],["अन्धाधुन्ध पत्याउन नहुने करियर सल्लाहहरू","ब्रायन कोल","बैशाख ९, २०८३"]];
/** बिजनेस — Business */
export function Business() {
 return <Reveal className="business-panel reveal reveal-delay-1"><aside id="business"><SectionTitle href="/category/business">बिजनेस</SectionTitle><p className="meta"><span>५६:३६</span><span className="meta__dot" aria-hidden="true" /><span>लिना थापासँग</span></p><h3 className="business-panel__lead line-2"><a href="#article">स्पष्ट संवाद गर्ने टोलीसँग ग्राहक बस्ने पन्ध्र कारण</a></h3><a className="business-panel__media" href="#article" tabIndex={-1} aria-hidden="true"><img className="img-cover" src={u("1573496359142-b8d87734a5a2",800,500)} alt="नयाँ अपरेटिङ मोडेल चाहिने दस संकेत" width="640" height="400" loading="lazy" /></a><ul>{posts.map(([title,author,date]) => <li className="business-panel__item" key={title}><h4 className="business-panel__item-title line-2"><a href="#article">{title}</a></h4><div className="meta"><span>{author}</span><span className="meta__dot" aria-hidden="true" /><time>{date}</time></div></li>)}</ul></aside></Reveal>;
}
