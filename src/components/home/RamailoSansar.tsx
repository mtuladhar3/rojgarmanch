/** रमाइलो संसार */
import { CategoryColumn } from "./CategoryColumn";

export function RamailoSansar() {
  return (
    <CategoryColumn
      id="ramailo-sansar"
      title="रमाइलो संसार"
      href="/category/ramailo-sansar"
      leadImage="1485846234645-a62644f84728"
      leadTitle="किताबबाट नसिकिने करियरका दस सुझाव"
      items={[
        "सामाजिक प्रमाणको प्रभावलाई कम नआँक्नुहोस्",
        "स्टार्टअपका आठ प्रारम्भिक समस्या र समाधान",
        "अर्को भर्ना चक्रमा महत्व राख्ने विचारहरू",
      ]}
      delay={2}
    />
  );
}
