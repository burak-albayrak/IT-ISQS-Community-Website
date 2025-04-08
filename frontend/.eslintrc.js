module.exports = {
  extends: ['react-app', 'react-app/jest'],
  rules: {
    'no-undef': 'error'
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  }
}; 