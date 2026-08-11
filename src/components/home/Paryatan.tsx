/** पर्यटन — Tourism */
import { CategoryColumn } from "./CategoryColumn";

export function Paryatan() {
  return (
    <CategoryColumn
      id="paryatan"
      title="पर्यटन"
      href="/category/paryatan"
      leadImage="1434030216411-0b793f4b4173"
      leadTitle="आधुनिक कार्यस्थलबारे बीस आकर्षक चार्ट"
      items={[
        { title: "उद्योगले छोड्नुपर्ने नराम्रा बानी", imageUrl: "1552664730-d307ca884978" },
        { title: "कामका लागि यात्रा गर्दा हुने सामान्य गल्ती", imageUrl: "1486312338219-ce68d2c6f44d" },
        { title: "केन्द्रित अपरेटरहरूलाई पुरस्कार दिने वर्ष", imageUrl: "1521737711867-e3b97375f902" },
      ]}
      delay={1}
    />
  );
}
