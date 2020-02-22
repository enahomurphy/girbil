module.exports = {
  "extends": [
    "react-app",
    "airbnb"
  ],
  "plugins": [
    "react-hooks"
  ],
  "rules": {
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [
          ".jsx"
        ]
      }
    ],
    "no-bitwise": [
      "error",
      {
        "allow": [
          ">>",
          "&"
        ]
      }
    ],
    "no-console": [
      "error",
      {
        "allow": [
          "error",
          "info"
        ]
      }
    ],
    "jsx-a11y/label-has-associated-control": false,
    "jsx-a11y/label-has-for": false,
    "react/forbid-prop-types": false,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "jsx-a11y/anchor-is-valid": "off",
  },
  "settings": {
    "import/resolver": {
      alias: {
        map: [
          ['components', './components'],
          ['globals', './global'],
          ['lib', './lib'],
          ['modules', './modules']
        ],
        "extensions": ['.js', '.jsx', '.ts', '.tsx'],
      }
    }
  }
}
