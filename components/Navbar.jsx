import Link from "next/link";
import { AiOutlineShopping, AiOutlineGlobal } from "react-icons/ai";
import { useStateContext } from "../context/StateContext";
import Cart from "./Cart";
import { useRouter } from "next/router";

const Navbar = () => {
  const { totalQty, showCart, setShowCart } = useStateContext();
  const router = useRouter();

  const onToggleLang = (locale) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale });
  };
  return (
    <div className="navbar-container">
      <Link className="logo" href="/">
        <img src="/logo.svg" alt="Logo" />
        <span>SHOPPA</span>
      </Link>
      <div className="nav-icons">
        <button type="button" onClick={() => setShowCart(true)}>
          <AiOutlineShopping />
          <span className="cart-item-qty">{totalQty}</span>
        </button>

        <div className="dropdown">
          <button className="dropbtn">
            <AiOutlineGlobal />
          </button>
          <div className="dropdown-content">
            <div onClick={() => onToggleLang("en")}>English</div>
            <div onClick={() => onToggleLang("ja")}>日本語</div>
            <div onClick={() => onToggleLang("zh")}>中文</div>
          </div>
        </div>
      </div>
      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
