import type { HomePageData } from "@/types/content";
import { ADS } from "@/lib/ads";
import { AdUnit } from "@/components/ui/AdUnit";
import { Griha } from "./Griha";
import { HighlightNews } from "./HighlightNews";
import { TajaSamachar } from "./TajaSamachar";
import { Antarwarta } from "./Antarwarta";
import { Lokpriya } from "./Lokpriya";
import { Samachar } from "./Samachar";
import { Feature } from "./Feature";
import { Vichar } from "./Vichar";
import { Rojgar } from "./Rojgar";
import { Pravas } from "./Pravas";
import { Business } from "./Business";
import { Kala } from "./Kala";
import { Sahitya } from "./Sahitya";
import { Samaj } from "./Samaj";
import { TV } from "./TV";

type HomePageProps = {
  data: HomePageData;
};

function BannerAd({ ad }: { ad: (typeof ADS)[keyof typeof ADS] }) {
  return (
    <div className="container">
      <AdUnit ad={ad} variant="banner" />
    </div>
  );
}

export function HomePage({ data }: HomePageProps) {
  return (
    <main id="main">
      {/* गृह */}
      <Griha items={data.teasers} />

      {/* मुख्य समाचार */}
      <HighlightNews story={data.highlight} />

      <BannerAd ad={ADS.ncell} />

      <section className="hero" aria-label="विशेष सामग्री">
        <div className="container hero__grid">
          {/* ताजा समाचार + Belaco aside */}
          <TajaSamachar items={data.recent} />

          {/* अन्तर्वार्ता */}
          <Antarwarta
            feature={data.feature}
            featurePair={data.featurePair}
          />

          {/* लोकप्रिय + HBL aside */}
          <Lokpriya items={data.ranked} />
        </div>
      </section>

      <BannerAd ad={ADS.worldlink} />

      {/* समाचार */}
      <Samachar items={data.stories} />

      <BannerAd ad={ADS.hardik} />

      {/* फिचर */}
      <Feature />

      {/* विचार / ब्लग */}
      <Vichar />

      <BannerAd ad={ADS.hbl} />

      {/* रोजगार — wraps प्रवास + बिजनेस */}
      <Rojgar>
        <Pravas />
        <Business />
      </Rojgar>

      <BannerAd ad={ADS.ncell} />

      {/* कला · साहित्य · देश/समाज */}
      <section className="container triple" aria-label="थप वर्ग">
        <Kala />
        <Sahitya />
        <Samaj />
      </section>

      <BannerAd ad={ADS.hardik} />

      {/* टि. भी. */}
      <TV />
    </main>
  );
}
