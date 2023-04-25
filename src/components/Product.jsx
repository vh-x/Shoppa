import Link from "next/link";
import { urlFor } from "../lib/client";
import { priceFormat } from "../lib/priceFormat";
import { useRouter } from "next/router";

const Product = ({ product: { name, image, slug, price } }) => {
  const locale = useRouter().locale;
  return (
    <Link href={`/product/${slug.current}`}>
      <div className="product-card">
        <img
          className="product-image"
          src={urlFor(image && image[0])}
          alt={name}
        />
        <p className="product-name">{name[locale]}</p>
        <p className="product-price">{priceFormat(price)}</p>
      </div>
    </Link>
  );
};

export default Product;
