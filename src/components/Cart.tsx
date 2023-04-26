import Link from "next/link";
import React, { useRef } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShopping,
  AiOutlineLeft,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import { priceFormat } from "../lib/priceFormat";
import getStripe from "../lib/getStripe";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQty,
    cartItems,
    setShowCart,
    toggleCartItemQtyBy,
    removeCartItem,
  }: any = useStateContext();
  const locale: string = useRouter().locale || "en";
  const { t } = useTranslation("common");
  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        cartItems.map((item: any) => {
          return { ...item, name: item.name[locale] };
        })
      ),
    });
    if (response.status === 500) return;
    const data = await response.json();
    toast.loading("Redirecting...");
    stripe && stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div
      className="cart-wrapper"
      onClick={(e: any) =>
        e.target.classList[0] == "cart-wrapper" && setShowCart(false)
      }
    >
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">{t("your-cart")}</span>
          <span className="cart-num-items">
            ({totalQty} {t("items")})
          </span>
        </button>
        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>{t("your-shopping-cart-is-empty")}</h3>
            <Link href="/">
              <button
                type="button"
                className="btn"
                onClick={() => setShowCart(false)}
              >
                {t("continue-shopping")}
              </button>
            </Link>
          </div>
        )}
        <div className="product-container">
          {cartItems.length > 0 &&
            cartItems.map((item: any) => (
              <div className="product" key={item._id}>
                <img
                  src={urlFor(item?.image[0]).toString()}
                  className="cart-product-image"
                  alt="cart product image"
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name[locale]}</h5>
                    <h4>{priceFormat(item.price)}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() => toggleCartItemQtyBy(item, -1)}
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{item.qty}</span>
                        <span
                          className="plus"
                          onClick={() => toggleCartItemQtyBy(item, 1)}
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      title="remove-item"
                      type="button"
                      className="remove-item"
                      onClick={() => removeCartItem(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length > 0 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>{t("subtotal")}</h3>
              <h3>{priceFormat(totalPrice)}</h3>
            </div>
            <div className="btn-container">
              <button className="btn" type="button" onClick={handleCheckout}>
                {t("pay-with-stripe")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
