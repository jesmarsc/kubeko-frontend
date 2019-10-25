const { override, fixBabelImports, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  }),
  addWebpackAlias({
    ['@assets']: path.resolve(__dirname, 'src', 'assets'),
    ['@constants']: path.resolve(__dirname, 'src', 'constants'),
    ['@components']: path.resolve(__dirname, 'src', 'components'),
    ['@firebase-api']: path.resolve(__dirname, 'src', 'components', 'Firebase'),
    ['@session']: path.resolve(__dirname, 'src', 'components', 'Session'),
    ['@styles']: path.resolve(__dirname, 'src', 'styles')
  })
);
