import Head from "next/head";

const Seo = () => {
  return (
    <Head>
      <title>Ask Me</title>

      <meta
        name="description"
        content="In case you want to ask me something to me, just ask here. It's anonymously tho"
      />

      <meta name="twitter:card" content="Ask Me A Question" />
      <meta name="twitter:site" content="@bellezzasky" />
      <meta name="twitter:creator" content="@bellezzasky" />
      <meta property="og:url" content="https://ask.dityath.dev/" />
      <meta property="og:title" content="Ask Me A Question" />
      <meta
        property="og:description"
        content="In case you want to ask me something to me, just ask here. It's anonymously tho"
      />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
    </Head>
  );
};

export default Seo;
