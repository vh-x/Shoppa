import { urlFor } from "../lib/client";
import { useRouter } from "next/router";
import { SanityBanner } from "../types/sanityTypes";

const HeroBanner = ({
  heroBanner: { image, largeText },
}: {
  heroBanner: SanityBanner;
}) => {
  const locale = useRouter().locale || "en";
  return (
    <div
      className="hero-banner-container"
      style={{
        background: `url(${urlFor(image)}) no-repeat center`,
      }}
    >
      <div>
        <h1>{largeText[locale]}</h1>
      </div>
    </div>
  );
};

export default HeroBanner;
