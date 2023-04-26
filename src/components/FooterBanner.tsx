import { urlFor } from "../lib/client";
import { useRouter } from "next/router";
import { SanityBanner } from "../types/sanityTypes";

const FooterBanner = ({
  footerBanner: { image, largeText, midText },
}: {
  footerBanner: SanityBanner;
}) => {
  const locale = useRouter().locale;
  return (
    <div
      className="footer-banner-container"
      style={{ background: `url(${urlFor(image)})` }}
    >
      <div className="banner-desc">
        <div className="left">
          <h3>{largeText[locale]}</h3>
        </div>
        <div className="right">
          <h3>{midText[locale]}</h3>
        </div>
      </div>
    </div>
  );
};

export default FooterBanner;
