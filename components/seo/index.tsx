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
      {/* <meta
        property="og:url"
        content="http://bits.blogs.nytimes.com/2011/12/08/a-twitter-for-my-sister/"
      /> */}
      <meta property="og:title" content="Ask Me A Question" />
      <meta
        property="og:description"
        content="In case you want to ask me something to me, just ask here. It's anonymously tho"
      />
    </Head>
  );
};

export default Seo;
