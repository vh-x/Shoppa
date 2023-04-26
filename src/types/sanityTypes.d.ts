declare module "sanityTypes" {
  interface SanityBanner {
    _id: string;
    _type: "banner";
    image: {
      _type: "image";
      asset: {
        _ref: string;
      };
      hotspot: {
        _type: "object";
        x: number;
        y: number;
        height: number;
        width: number;
      };
    };
    midText: {
      en: string;
      ja: string;
      zh: string;
    };
    largeText: {
      en: string;
      ja: string;
      zh: string;
    };
  }

  interface SanityProduct {
    _id: string;
    _type: "product";
    name: {
      en: string;
      ja: string;
      zh: string;
    };
    price: number;
    slug: {
      _type: "slug";
      current: string;
    };
    image: {
      _type: "array";
      _key: string;
      _upload?: boolean;
      asset: {
        _ref: string;
      };
      hotspot: {
        _type: "object";
        x: number;
        y: number;
        height: number;
        width: number;
      };
    }[];
    details: {
      en: string;
      ja: string;
      zh: string;
    };
    numReviews: number;
    rating: number;
    source: string;
  }
}

export { SanityProduct, SanityBanner };
