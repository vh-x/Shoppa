import Link from "next/link";
import { urlFor } from "../lib/client";
import { useTranslation } from "next-i18next";
import { useRouter } from "../node_modules/next/router";
const HeroBanner = ({ heroBanner }) => {
  const { t } = useTranslation("common");
  const locale = useRouter().locale;
  return (
    <div
      className="hero-banner-container"
      style={{
        background: `url(${urlFor(heroBanner.image)}) no-repeat center`,
      }}
    >
      <div>
        {/* <h3>{heroBanner.midText[locale]}</h3> */}
        <h1>{heroBanner.largeText[locale]}</h1>
      </div>
    </div>
  );
};

export default HeroBanner;
