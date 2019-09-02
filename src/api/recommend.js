// import axios from 'axios';
import { ERR_OK, NET_WORK } from './config';
import * as http from 'common/js/http';

// @title 获取推荐轮播图数据
export function _getRecommend() {
  let url = NET_WORK ? 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg' : '/mockData/recommend.json';
  // let url = '/mockData/recommend.json';
  // const data = Object.assign({}, commonParams, {
  //   formData: '此处为自定义数据'
  // });
  // // 测试axios
  // axios.post(url, data).then((res) => {
  //   console.log(res);
  // }).catch((err) => {
  //   console.log(err);
  // });
  // 封装好的axios比原生少写了.catch, 但是怎么处理异常提醒呢？
  // 返回的是一个Promise，而不是数据res.data
  return http.get(url).then(res => {
    if (res.code === ERR_OK) {
      return res.data;
    }
  });
};

// @title 获取推荐歌曲列表
export function _getDiscList() {
  return http.get('/getDiscList?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&platform=yqq&hostUin=0&sin=0&ein=29&sortId=5&needNewCode=0&categoryId=10000000&rnd=0.5369668837061188')
    .then(res => {
      if (res.code === ERR_OK) {
        return res.data;
      }
    });
};