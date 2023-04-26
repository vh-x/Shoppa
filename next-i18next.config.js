const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "zh",
    locales: ["en", "ja", "zh"],
    fallbackLng: {
      default: ["en"],
    },
  },
  localePath: path.resolve("./public/locales"),
};
