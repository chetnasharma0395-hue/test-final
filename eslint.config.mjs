import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
  ...nextCoreWebVitals,
  {
    // Marketing-content components contain dense long-form copy with apostrophes,
    // quotes, etc. that React renders safely as strings. Escaping every entity is
    // noise for zero functional benefit on this surface only.
    files: ["components/*Content.tsx"],
    rules: {
      "react/no-unescaped-entities": "off",
    },
  },
];

export default config;
