const path = require("path")
const { version } = require("./package")

module.exports = {
  version,
  title: "forward head posture react",
  require: ["regenerator-runtime/runtime"],
  components: ["src/components/ForwardHeadPosture.js"],
  moduleAliases: {
    "react-forward-head-posture": path.resolve(__dirname, "src")
  },
  styleguideDir: "dist-docs",
  pagePerSection: true,
  sections: [
    {
      name: "ForwardHeadPosture",
      content: "./src/components/ForwardHeadPosture.md",
      sectionDepth: 0
    },
    {
      name: "Examples",
      sections: [
        {
          name: "Browser notification",
          content: "./docs/BrowserNotification.md"
        }
      ],
      sectionDepth: 0
    }
  ],
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        }
      ]
    }
  },
  template: {
    head: {
      links: [
        {
          rel: "stylesheet",
          href:
            "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        }
      ]
    }
  }
}
