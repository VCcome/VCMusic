const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('api', resolve('src/api'))
      .set('assets', resolve('src/assets'))
      .set('common', resolve('src/common'))
      .set('components', resolve('src/components'))
    // .set('', resolve(''))
  },
  devServer: {
    port: '8080',
    proxy: {
      '/recommend': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/recommend': '/mockData/recommend.json'
        },
        onProxyRes(proxyRes, req, res) {
          // proxyRes.headers['x-added'] = 'foobar'; // add new header to response
          proxyRes.headers['Host'] = 'www.baidu.com';
          proxyRes.headers['Referer'] = 'https://www.baidu.com';
        },
        onProxyReq(proxyReq, req, res) {
          // add custom header to request
          // proxyReq.setHeader('Host', 'www.baidu.com');
          // proxyReq.setHeader('Referer', 'https://www.baidu.com');
          // or log the req
        }
      },
      '/baidu': {
        target: 'https://www.baidu.com',
        changeOrigin: true,
        pathRewrite: {
          '^/baidu': '/'
        },
        onProxyRes(proxyRes, req, res) {
          // proxyRes.headers['x-added'] = 'foobar'; // add new header to response
          // proxyRes.headers['Host'] = 'www.baidu.com';
          // proxyRes.headers['Referer'] = 'https://www.baidu.com';
        },
        onProxyReq(proxyReq, req, res) {
          // add custom header to request
          proxyReq.setHeader('Host', 'www.baidu.com');
          proxyReq.setHeader('Referer', 'https://www.baidu.com');
          // or log the req
        }
      },
      '/getDiscList': {
        target: 'http://ustbhuangyi.com',
        changeOrigin: true,
        pathRewrite: {
          '^/getDiscList': '/music/api/getDiscList'
        },
        onProxyReq(proxyReq, req, res) {
          // add custom header to request
          proxyReq.setHeader('Host', 'ustbhuangyi.com');
        }
      }
    }
  }
};