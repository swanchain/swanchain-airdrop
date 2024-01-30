module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-pxtorem": {
      rootValue: 192,
      propList: ["*"],
      minPixelValue: 2,
      selectorBlackList: ["html", "body", "lang-max", "mit", "el-sub-menu__icon-arrow", "el-menu--horizontal"]
    },
  }
}