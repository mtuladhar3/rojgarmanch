import { Reveal } from "@/components/motion/Reveal";

/** करियर प्लेबुक — tip card */
export function CareerPlaybook() {
  return (
    <Reveal className="spotlight__tips reveal reveal-delay-2">
      <div className="spotlight__fold" aria-hidden="true" />
      <a className="spotlight__tips-head" href="#article">
        <span className="spotlight__tips-icon" aria-hidden="true">
          ☞
        </span>
        करियर प्लेबुक{" "}
        <i className="fa-solid fa-chevron-right" aria-hidden="true" />
      </a>
      <div className="spotlight__tips-body">
        <p>करियर यात्रामा एकपटकमा एउटा स्पष्ट कदम मात्र लिनुहोस्।</p>
        <p>सिकाइ र विश्राम दुवै राख्नुहोस् — थकानले निर्णय बिगार्छ।</p>
        <p>साना लक्ष्य राख्नुहोस्, तर नियमित समीक्षा नछोड्नुहोस्।</p>
        <p>रातमा भारी काम घटाउनुहोस्; दिनको मुख्य घण्टामा गहिरो काम गर्नुहोस्।</p>
      </div>
    </Reveal>
  );
}
