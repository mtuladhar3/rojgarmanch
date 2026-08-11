import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

/** करियर प्लेबुक — tip column */
export function CareerPlaybook() {
  const tips = [
    "करियर यात्रामा एकपटकमा एउटा स्पष्ट कदम मात्र लिनुहोस्।",
    "सिकाइ र विश्राम दुवै राख्नुहोस् — थकानले निर्णय बिगार्छ।",
    "साना लक्ष्य राख्नुहोस्, तर नियमित समीक्षा नछोड्नुहोस्।",
    "रातमा भारी काम घटाउनुहोस्; दिनको मुख्य घण्टामा गहिरो काम गर्नुहोस्।",
  ];

  return (
    <Reveal className="career-playbook reveal reveal-delay-2">
      <aside>
        <SectionTitle href="#article" more={false}>करियर प्लेबुक</SectionTitle>
        <ul className="career-playbook__list">
          {tips.map((tip) => (
            <li key={tip} className="career-playbook__item">
              <p>{tip}</p>
            </li>
          ))}
        </ul>
      </aside>
    </Reveal>
  );
}
