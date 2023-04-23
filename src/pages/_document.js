import { Html, Head, Main, NextScript } from "next/document";

export default function Document({ locale }) {
  return (
    <Html lang={locale}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
