import React, { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const locale = useRouter().locale;
  const { t } = useTranslation("common");

  // Starts with one and stays >= 1 on product page
  const [qty, setQty] = useState(1);
  const moreQty = () => setQty(qty + 1);
  const lessQty = () => setQty(qty > 1 ? qty - 1 : 1);

  const onAdd = (product, qty) => {
    const { _id, price, name } = product;
    if (cartItems.find((item) => item._id === _id)) {
      setCartItems((prev) =>
        prev.map((cartItem) =>
          cartItem._id === _id
            ? { ...cartItem, qty: cartItem.qty + qty }
            : cartItem
        )
      );
    } else {
      product.qty = qty;
      setCartItems([...cartItems, { ...product }]);
    }
    setTotalPrice((prev) => prev + price * qty);
    setTotalQty((prev) => prev + qty);
    toast.success(`${qty} × ${name[locale]} ${t("added-to-the-cart")}`);
  };

  const toggleCartItemQtyBy = ({ qty, price, _id }, val) => {
    if (qty + val > 0) {
      setCartItems((prev) =>
        prev.map((item) =>
          item._id === _id ? { ...item, qty: item.qty + val } : item
        )
      );
      setTotalPrice((prev) => prev + price * val);
      setTotalQty((prev) => prev + val);
    } else if (qty + val === 0) {
      setCartItems((prev) => prev.filter((item) => item._id !== _id));
      setTotalPrice((prev) => prev + price * val);
      setTotalQty((prev) => prev + val);
    }
  };

  const removeCartItem = ({ qty, price, _id }) => {
    setCartItems((prev) => prev.filter((item) => item._id !== _id));
    setTotalPrice((prev) => prev - price * qty);
    setTotalQty((prev) => prev - qty);
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        toggleCartItemQtyBy,
        removeCartItem,
        totalPrice,
        setTotalPrice,
        totalQty,
        setTotalQty,
        qty,
        moreQty,
        lessQty,
        onAdd,
        setQty,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
