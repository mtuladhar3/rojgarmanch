/** कला — Arts */
import { CategoryColumn } from "./CategoryColumn";

export function Kala() {
  return (
    <CategoryColumn
      id="arts"
      title="कला"
      href="/category/kala"
      leadImage="1517649763962-0c623066027e"
      leadTitle="दस प्रसिद्ध टोली असफलता कसरी रोक्न सकिन्थ्यो"
      leadDate="माघ ७, २०८२"
      items={[
        "नयाँ प्लेबुक चाहिने संकेतहरू",
        "विश्वासिलो लकर रूम र उत्कृष्ट टोलीको साझा कुरा",
        "खेलाडीले छोडेका बानी प्रबन्धकले पनि छोड्नुपर्छ",
      ]}
    />
  );
}
