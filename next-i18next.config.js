const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ja", "zh"],
  },
  fallbackLng: {
    default: ["en"],
    "zh-TW": ["zh"],
  },
  localePath: path.resolve("./public/locales"),
};
