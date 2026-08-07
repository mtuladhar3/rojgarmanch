import { LeadListColumn } from "./LeadListColumn";

/** देश/समाज */
export function DeshSamaj() {
  return (
    <LeadListColumn
      id="desh-samaj"
      title="देश/समाज"
      href="/category/desh-samaj"
      metaByline="हेमन्त राज गौतम"
      leadTitle="गाउँ फर्केर उद्यम थालेका युवा — केले टिक्छ, केले टुट्छ"
      image="1517245386807-bb43f82c33c4"
      items={[
        ["स्थानीय तहमा सेवा प्रवाह सुधार्ने पाँच अभ्यास", "मीरा जोशी"],
        ["शहर बसाइँसराइले परिवारमा पारेको प्रभाव", "उत्तम भट्टराई"],
        ["सामुदायिक वनले सिकाएको साझा जिम्मेवारी", "सुमन गिरी"],
      ]}
    />
  );
}
