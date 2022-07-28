import "../styles/globals.css";
import { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        openGraph={{
          type: "website",
          locale: "en_IE",
          url: "https://devrelsocial.com",
          site_name: "DevRel Social",
          description: "Making your social media experience easier.",
        }}
        twitter={{
          handle: "@codercatdev",
          site: "@codingcatdev",
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
