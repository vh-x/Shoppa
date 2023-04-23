import Link from "next/link";
import { urlFor } from "../lib/client";
import { useTranslation } from "next-i18next";
import { useRouter } from "../node_modules/next/router";

const FooterBanner = ({ footerBanner: { image, largeText, midText } }) => {
  const { t } = useTranslation("common");
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
