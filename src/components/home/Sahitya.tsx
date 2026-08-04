/** साहित्य — Literature */
import { CategoryColumn } from "./CategoryColumn";

export function Sahitya() {
  return (
    <CategoryColumn
      id="literature"
      title="साहित्य"
      href="/category/sahitya"
      leadImage="1434030216411-0b793f4b4173"
      leadTitle="आधुनिक कार्यस्थलबारे बीस आकर्षक चार्ट"
      leadDate="मंसिर २७, २०८३"
      items={[
        "उद्योगले छोड्नुपर्ने नराम्रा बानी",
        "कामका लागि यात्रा गर्दा हुने सामान्य गल्ती",
        "केन्द्रित अपरेटरहरूलाई पुरस्कार दिने वर्ष",
      ]}
      delay={1}
    />
  );
}
