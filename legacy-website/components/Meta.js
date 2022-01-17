import Head from "next/head";

const Meta = () => {
  return (
    <Head>
      <title>legacy-xyz</title>
      <meta name="title" content="legacy-xyz" />
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <meta
        name="description"
        content="Leave your web3 legacy. A new era of social proof, and discovery of content."
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.web3legacy.xyz/" />
      <meta property="og:title" content="Legacy XYZ" />
      <meta
        property="og:description"
        content="Leave your web3 legacy. A new era of social proof, and discovery of content."
      />
      <meta property="og:image" content="/social-preview.png" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://twitter.com/legacy_xyz" />
      <meta property="twitter:title" content="Leave your web3 legacy. A new era of social proof, and discovery of content." />
    </Head>
  );
};

export default Meta;
