const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ja", "zh"],
    fallbackLng: {
      "zh-TW": ["zh"],
      "zh-Hant": ["zh"],
      default: ["en"],
    },
  },
  localePath: path.resolve("./public/locales"),
};
