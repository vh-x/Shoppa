import React, { useEffect, useState } from "react";
import { client, urlFor } from "../../../lib/client";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { Product } from "../../../components";
import { useStateContext } from "../../../context/StateContext";
import { priceFormat } from "../../../lib/priceFormat";
import getStripe from "../../../lib/getStripe";
import { toast } from "../../../node_modules/react-hot-toast/dist/index";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const ProductDetails = ({ products, product }) => {
  const { t } = useTranslation("common");
  const { image, name, details, price, rating, source, numReviews } = product;
  const [index, setIndex] = useState(0);
  const { moreQty, lessQty, qty, onAdd, setQty } = useStateContext();
  const locale = useRouter().locale;

  const handleBuyNow = async () => {
    const stripe = await getStripe();
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          ...product,
          qty: qty,
          name: name[locale],
        },
      ]),
    });
    if (response.statusCode === 500) return;
    const data = await response.json();
    toast.loading(t("redirecting"));
    stripe.redirectToCheckout({ sessionId: data.id });
  };
  useEffect(() => setQty(1), [product]);
  return (
    <div>
      <div className="product-detail-container">
        <div className="image-container">
          <img
            src={urlFor(image && image[index])}
            className="product-detail-image"
          />
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={`small-image ${i === index && "selected-image"}`}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
          <p className="source">{source}</p>
        </div>
        <div className="product-detail-desc">
          <h1>{name[locale]}</h1>
          <div className="reviews">
            <div>
              {rating > 0 ? <AiFillStar /> : <AiOutlineStar />}
              {rating > 1 ? <AiFillStar /> : <AiOutlineStar />}
              {rating > 2 ? <AiFillStar /> : <AiOutlineStar />}
              {rating > 3 ? <AiFillStar /> : <AiOutlineStar />}
              {rating > 4 ? <AiFillStar /> : <AiOutlineStar />}
            </div>
            <p>({numReviews})</p>
          </div>
          <h4>{t("details")}</h4>
          <p>{details[locale]}</p>
          <p className="price">{priceFormat(price)}</p>
          <div className="quantity">
            <h3>{t("qty")}</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={lessQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={moreQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, qty)}
            >
              {t("add-to-cart")}
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              {t("buy-now")}
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>{t("you-may-also-like")}</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = '*[_tyle == "product"] {slug {surrent}}';
  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));
  return { paths, fallback: "blocking" };
};

export const getStaticProps = async ({ locale, params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == "${slug}"][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      products,
      product,
    },
  };
};

export default ProductDetails;
