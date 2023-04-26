import Link from "next/link";
import { AiOutlineShopping, AiOutlineGlobal } from "react-icons/ai";
import { useStateContext } from "../context/StateContext";
import Cart from "./Cart";
import { useRouter } from "next/router";

const Navbar = () => {
  const { totalQty, showCart, setShowCart }: any = useStateContext();
  const router = useRouter();

  const onToggleLang = (locale: string) => {
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
        <button
          aria-label="show cart"
          type="button"
          onClick={() => setShowCart(true)}
        >
          <AiOutlineShopping />
          <span className="cart-item-qty">{totalQty}</span>
        </button>

        <div className="dropdown">
          <button aria-label="show language menu" className="dropbtn">
            <AiOutlineGlobal />
          </button>
          <div className="dropdown-content">
            <div onClick={() => onToggleLang("en")}>English</div>
            <div onClick={() => onToggleLang("ja")}>日本語</div>
            <div onClick={() => onToggleLang("zh-TW")}>繁體中文</div>
          </div>
        </div>
      </div>
      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
