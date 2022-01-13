// theme.config.js
export default {
    projectLink: 'https://github.com/straightupjac/legacy_xyz', // GitHub link in the navbar
    docsRepositoryBase: 'https://github.com/straightupjac/legacy_xyz/blob/master', // base URL for the docs repository
    titleSuffix: ' - legacy_xyz',
    nextLinks: true,
    prevLinks: true,
    search: true,
    customSearch: null, // customizable, you can use algolia for example
    darkMode: true,
    footer: true,
    footerText: `${new Date().getFullYear()} © Legacy XYZ.`,
    footerEditLink: `Edit this page on GitHub`,
    unstable_faviconGlyph: '🌱',
    logo: (
      <>
        <span className="mr-2 font-extrabold hidden md:inline">🌱 Legacy</span>
        <span className="text-gray-600 font-normal hidden md:inline">
          Documentation
        </span>
      </>
    ),
    head: (
      <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Legacy XYZ: Leave your digital legacy" />
        <meta name="og:title" content="Legacy XYZ" />
      </>
    ),
  }
