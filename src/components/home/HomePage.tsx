import type { HomePageData } from "@/types/content";
import { ADS } from "@/lib/ads";
import { AdUnit } from "@/components/ui/AdUnit";
import { HighlightNews } from "./HighlightNews";
import { BlogBichar } from "./BlogBichar";
import { WebStories } from "./WebStories";
import { Antarwarta } from "./Antarwarta";
import { Samachar } from "./Samachar";
import { Pravas } from "./Pravas";
import { ArthaRojgar } from "./ArthaRojgar";
import { Publication } from "./Publication";
import { Rojgar } from "./Rojgar";
import { Business } from "./Business";
import { VinimayaDar } from "./VinimayaDar";
import { Feature } from "./Feature";
import { Kala } from "./Kala";
import { Khel } from "./Khel";
import { Paryatan } from "./Paryatan";
import { RamailoSansar } from "./RamailoSansar";
import { DeshSamaj } from "./DeshSamaj";
import { Bishwa } from "./Bishwa";
import { EnglishHeadline } from "./EnglishHeadline";
import { TV } from "./TV";
import { Youtube } from "./Youtube";

type HomePageProps = {
  data: HomePageData;
};

function BannerAd({ ad }: { ad: (typeof ADS)[keyof typeof ADS] }) {
  return (
    <div className="ad-band">
      <div className="container">
        <AdUnit ad={ad} variant="banner" />
      </div>
    </div>
  );
}

export function HomePage({ data }: HomePageProps) {
  return (
    <main id="main">
      {/* मुख्य समाचार */}
      <HighlightNews story={data.highlight} more={data.highlightMore} />
      
      <Samachar items={data.stories} />

      <BannerAd ad={ADS.hardik} />

      <div className="container artha-row">
        <ArthaRojgar />
        <Publication />
      </div>

      <BannerAd ad={ADS.hbl} />

      {/* युट्युब — २:१ भिडियो + Shorts */}
      <Youtube data={data.youtube} />


      <BannerAd ad={ADS.hbl} />

     

      {/* रोजगार — wraps बिजनेस */}
      <Rojgar>
        <Business />
        <VinimayaDar />
      </Rojgar>

      <BannerAd ad={ADS.ncell} />
      {/* एनआरएन · प्रवास */}
      <Pravas />

      <BannerAd ad={ADS.hardik} />

      {/* इन्स्टा-स्टाइल स्टोरी */}
      <WebStories items={data.igStories} />

      <BannerAd ad={ADS.hbl} />

      {/* फिचर · अन्तर्वार्ता */}
      <Rojgar>
        <Feature />
        <Antarwarta />
      </Rojgar>

      <BannerAd ad={ADS.ncell} />

      {/* खेल · पर्यटन · रमाइलो संसार */}
      <section className="container triple" aria-label="थप वर्ग">
        <Khel />
        <Paryatan />
        <RamailoSansar />
      </section>

      <BannerAd ad={ADS.hardik} />

      {/* कला · साहित्य */}
      <Kala />

      <BannerAd ad={ADS.hbl} />

      {/* ब्लग / विचार */}
      <BlogBichar items={data.teasers} />

      <BannerAd ad={ADS.ncell} />

      {/* देश/समाज · विश्व · English Headline */}
      <section className="container triple" aria-label="देश समाज विश्व">
        <DeshSamaj />
        <Bishwa />
        <EnglishHeadline />
      </section>

    </main>
  );
}
