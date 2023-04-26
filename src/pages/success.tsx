import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useStateContext } from "../context/StateContext";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQty } = useStateContext();
  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQty(0);
  }, []);
  const { t } = useTranslation("common");

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>{t("thank-you")}</h2>
        <p className="email-msg">{t("check-email-for-receipt")}</p>
        <p className="description">{t("if-any-questions-please-email")}</p>
        <a href="mailto:order@example.com" className="email">
          order@example.com
        </a>
        <Link href="/">
          <button type="button" className="btn">
            {t("continue-shopping")}
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Success;
export const getServerSideProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
