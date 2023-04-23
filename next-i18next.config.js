const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ja", "zh"],
  },
  fallbackLng: {
    default: ["en"],
  },
  localePath: path.resolve("./public/locales"),
};
