import { urlFor } from "../lib/client";
import { useRouter } from "../node_modules/next/router";
const HeroBanner = ({ heroBanner }) => {
  const locale = useRouter().locale;
  return (
    <div
      className="hero-banner-container"
      style={{
        background: `url(${urlFor(heroBanner.image)}) no-repeat center`,
      }}
    >
      <div>
        <h1>{heroBanner.largeText[locale]}</h1>
      </div>
    </div>
  );
};

export default HeroBanner;
