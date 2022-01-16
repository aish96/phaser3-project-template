const presets = [
  [
    "@babel/env",
    {
      targets: {
        browsers: ["last 2 Chrome versions"],
        node: "current"
      },
      modules: false
    }
  ],
  "@babel/preset-react"
];
const plugins = [
  "@babel/plugin-proposal-class-properties",
  "@babel/plugin-transform-modules-commonjs",
  "@babel/plugin-transform-runtime"
];

module.exports = { presets, plugins };
