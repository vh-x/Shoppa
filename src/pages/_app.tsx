import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components";
import { StateContext } from "../context/StateContext";
import { Toaster } from "react-hot-toast";
import { appWithTranslation } from "next-i18next";

function App({ Component, pageProps }: AppProps) {
  return (
    <StateContext>
      <Layout>
        <Toaster position="bottom-center" />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}

export default appWithTranslation(App);
