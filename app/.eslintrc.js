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
      },
    ],
    "import/extensions": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/label-has-for": "off",
    "react/forbid-prop-types": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "jsx-a11y/anchor-is-valid": "off",
    "react/jsx-props-no-spreading": 'off',
  },
  "settings": {
    "import/resolver": {
      alias: {
        map: [
          ['@', './src'],
        ],
        "extensions": ['.js', '.jsx', '.ts', '.tsx'],
      }
    }
  }
}
