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
        { title: "सामाजिक प्रमाणको प्रभावलाई कम नआँक्नुहोस्", imageUrl: "1454165804606-c3d57bc86b40" },
        { title: "स्टार्टअपका आठ प्रारम्भिक समस्या र समाधान", imageUrl: "1556761175-5973dc0f32e7" },
        { title: "अर्को भर्ना चक्रमा महत्व राख्ने विचारहरू", imageUrl: "1519389950473-47ba0277781c" },
      ]}
      delay={2}
    />
  );
}
