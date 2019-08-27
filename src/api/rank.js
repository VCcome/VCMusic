import { ERR_OK } from './config';
import * as http from 'common/js/http';

// @title 获取排行列表
export function _getRankList () {
  return http.get('getRankList?-=getUCGI7808212081466872&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22detail%22%3A%7B%22module%22%3A%22musicToplist.ToplistInfoServer%22%2C%22method%22%3A%22GetDetail%22%2C%22param%22%3A%7B%22topId%22%3A4%2C%22offset%22%3A0%2C%22num%22%3A20%2C%22period%22%3A%222019-08-27%22%7D%7D%2C%22comm%22%3A%7B%22ct%22%3A24%2C%22cv%22%3A0%7D%7D')
    .then(res => {
      if (res.code === ERR_OK) {
        return res.data;
      }
    });
};