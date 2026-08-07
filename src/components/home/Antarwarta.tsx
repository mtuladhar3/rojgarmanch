import { LeadListColumn } from "./LeadListColumn";

/** अन्तर्वार्ता — lead + image + text list */
export function Antarwarta() {
  return (
    <LeadListColumn
      id="antarwarta"
      title="अन्तर्वार्ता"
      href="/category/antarwarta"
      metaByline="लिना थापासँग"
      leadTitle="स्पष्ट संवाद गर्ने टोलीसँग ग्राहक बस्ने पन्ध्र कारण"
      image="1573496359142-b8d87734a5a2"
      items={[
        ["नयाँ अपरेटिङ मोडेल चाहिने दस संकेत", "स्यामुएल राव"],
        ["सार्वजनिक रूपमा डेलिभर गर्ने अपरेटरहरूको वर्ष", "लोरी वेस्ट"],
        ["आधुनिक उत्पादन शिल्प सिक्ने उत्कृष्ट स्रोत", "जोआन वालेस"],
      ]}
      delay={1}
    />
  );
}
