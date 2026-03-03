import { Helmet } from "react-helmet-async";

const SEO = ({
  title,
  description,
  canonical,
  ogType = "website",
  ogImage = "/anilayroor.jpg",
  twitterHandle = "@anilayroor",
  schemaData,
}) => {
  const siteName = "Anil Ayroor";
  const fullTitle =
    title && !title.includes(siteName)
      ? `${title} | ${siteName}`
      : title || siteName;
  const defaultDescription =
    "Official website of Anil Ayroor - Journalist, Media Professional, and Content Creator. Explore the latest insights, awards, and events.";

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph tags */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta
        property="og:description"
        content={description || defaultDescription}
      />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta
        name="twitter:description"
        content={description || defaultDescription}
      />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data */}
      {schemaData && (
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
