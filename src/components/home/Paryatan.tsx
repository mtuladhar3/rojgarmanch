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
        "उद्योगले छोड्नुपर्ने नराम्रा बानी",
        "कामका लागि यात्रा गर्दा हुने सामान्य गल्ती",
        "केन्द्रित अपरेटरहरूलाई पुरस्कार दिने वर्ष",
      ]}
      delay={1}
    />
  );
}
