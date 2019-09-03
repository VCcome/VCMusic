import { ERR_OK, NET_WORK } from './config';
import * as http from 'common/js/http';

// @title 获取排行列表
export function getRankList() {
  if (NET_WORK) {
    let config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    let params = {
      req_0: {
        module: 'musicToplist.ToplistInfoServer',
        method: 'GetAll',
        param: {}
      },
      comm: { g_tk: 5381, uin: 0, format: 'json', ct: 23, cv: 0 }
    };
    let url = NET_WORK ? '/getRankList?_=1567472160054' : '/mockData/rank.json';
    return http.post(url, params, config)
      .then(res => {
        if (res.code === ERR_OK) {
          if (res.req_0.code === ERR_OK) {
            return res.req_0.data;
          }
        }
      });
  } else {
    let url = '/mockData/rank.json';
    return http.get(url)
      .then(res => {
        if (res.code === ERR_OK) {
          if (res.req_0.code === ERR_OK) {
            return res.req_0.data;
          }
        }
      });
  }
};

// // @title 获取排行列表详情？
// @params topId
// @params period
// export function getRankList () {
//   return http.get('getRankList?-=getUCGI7808212081466872&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22detail%22%3A%7B%22module%22%3A%22musicToplist.ToplistInfoServer%22%2C%22method%22%3A%22GetDetail%22%2C%22param%22%3A%7B%22topId%22%3A4%2C%22offset%22%3A0%2C%22num%22%3A20%2C%22period%22%3A%222019-08-27%22%7D%7D%2C%22comm%22%3A%7B%22ct%22%3A24%2C%22cv%22%3A0%7D%7D')
//     .then(res => {
//       if (res.code === ERR_OK) {
//         return res.data;
//       }
//     });
// };