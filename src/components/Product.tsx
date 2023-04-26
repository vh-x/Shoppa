import Link from "next/link";
import { urlFor } from "../lib/client";
import { priceFormat } from "../lib/priceFormat";
import { useRouter } from "next/router";
import { SanityProduct } from "../types/sanityTypes";

const Product = ({
  product: { name, image, slug, price },
}: {
  product: SanityProduct;
}) => {
  const locale = useRouter().locale || "en";
  return (
    <Link href={`/product/${slug.current}`}>
      <div className="product-card">
        <img
          className="product-image"
          src={urlFor(image && image[0]).toString()}
          alt={name}
        />
        <p className="product-name">{name[locale]}</p>
        <p className="product-price">{priceFormat(price)}</p>
      </div>
    </Link>
  );
};

export default Product;
