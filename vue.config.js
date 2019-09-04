const path = require('path');

// const proxyConfig = require('./');

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
      },
      '/getSingerList': {
        target: 'https://c.y.qq.com',
        changeOrigin: true,
        pathRewrite: {
          '^/getSingerList': '/v8/fcg-bin/v8.fcg'
        },
        onProxyReq(proxyReq, req, res) {
          // add custom header to request
          proxyReq.setHeader('Origin', 'https://y.qq.com');
          proxyReq.setHeader('Referer', 'https://y.qq.com/portal/singer_list.html');
        }
      },
      '/getVKey': {
        target: 'https://c.y.qq.com',
        changeOrigin: true,
        pathRewrite: {
          '^/getVKey': '/base/fcgi-bin/fcg_music_express_mobile3.fcg'
        },
        onProxyReq(proxyReq, req, res) {
          // add custom header to request
          proxyReq.setHeader('Origin', 'https://c.y.qq.com');
          // proxyReq.setHeader('Referer', 'https://y.qq.com/portal/singer_list.html');
        }
      },
      '/getRankList': {
        target: 'https://u.y.qq.com',
        changeOrigin: true,
        pathRewrite: {
          '^/getRankList': '/cgi-bin/musicu.fcg'
        },
        onProxyReq(proxyReq, req, res) {
          // add custom header to request
          proxyReq.setHeader('Origin', 'https://y.qq.com');
          proxyReq.setHeader('Referer', 'https://y.qq.com/m/index.html');
        }
      },
      '/search': {
        target: 'https://c.y.qq.com',
        changeOrigin: true,
        pathRewrite: {
          '^/search': '/soso/fcgi-bin/search_for_qq_cp'
        },
        onProxyReq(proxyReq, req, res) {
          // add custom header to request
          proxyReq.setHeader('Origin', 'https://y.qq.com');
          proxyReq.setHeader('Referer', 'https://y.qq.com/m/index.html');
        }
      },
      'https://c.y.qq.com': {
        target: 'https://c.y.qq.com',
        changeOrigin: true,
        onProxyReq(proxyReq, req, res) {
          // add custom header to request
          proxyReq.setHeader('Origin', 'https://y.qq.com');
          proxyReq.setHeader('Referer', 'https://y.qq.com/m/index.html');
        }
      },
      '/getLyric': {
        target: 'https://c.y.qq.com',
        changeOrigin: true,
        pathRewrite: {
          '^/getLyric': '/lyric/fcgi-bin/fcg_query_lyric.fcg'
        },
        onProxyReq(proxyReq, req, res) {
          // add custom header to request
          proxyReq.setHeader('Origin', 'http://evil.com/');
          proxyReq.setHeader('Referer', 'https://i.y.qq.com/v8/playsong.html?songmid=002tD7MA2eB1IL,003VaeQu4E4QmT,003JCOaR4dktYn,000tH1uC1aUokl,001FGQba3i10mw,001PitNy0e03u2,0007H7ZR3ufHw3,004WTlYT2kL99w,000Rhqpg3dBQKr,001xwUwW32VflK');
        }
      }
    }
  }
};