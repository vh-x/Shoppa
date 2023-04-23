import "../styles/globals.css";
import { Layout } from "../../components";
import { StateContext } from "../../context/StateContext";
import { Toaster } from "react-hot-toast";
import { appWithTranslation } from "next-i18next";

function App({ Component, pageProps }) {
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
