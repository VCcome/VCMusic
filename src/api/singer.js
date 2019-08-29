import { ERR_OK } from './config';
import * as http from 'common/js/http';

// const singerListUrl = '/getSingerList?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&hostUin=0&needNewCode=0&platform=yqq&jsonpCallback=jp0';
// const singerListUrl = '/getSingerList?-=getUCGI2941480161451777&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%2C%22cv%22%3A0%7D%2C%22singerList%22%3A%7B%22module%22%3A%22Music.SingerListServer%22%2C%22method%22%3A%22get_singer_list%22%2C%22param%22%3A%7B%22area%22%3A-100%2C%22sex%22%3A-100%2C%22genre%22%3A-100%2C%22index%22%3A-100%2C%22sin%22%3A0%2C%22cur_page%22%3A1%7D%7D%7D';
const singerListUrl = '/mockData/singer.json';

// @title 获取歌手列表
export function _getSingerList () {
  return http.get(singerListUrl)
    .then(res => {
      if (res.code === ERR_OK) {
        return res.data;
      }
    });
};

// 参数：singermid=002J4UUk29y8BY
// const singerDetailUrl = 'https://u.y.qq.com/cgi-bin/musicu.fcg?-=getUCGI8970247672194587&g_tk=727719371&loginUin=1293830737&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%2C%22cv%22%3A0%7D%2C%22singer%22%3A%7B%22method%22%3A%22get_singer_detail_info%22%2C%22param%22%3A%7B%22sort%22%3A5%2C%22singermid%22%3A%22002J4UUk29y8BY%22%2C%22sin%22%3A0%2C%22num%22%3A10%7D%2C%22module%22%3A%22music.web_singer_info_svr%22%7D%7D';
const singerDetailUrl = '/mockData/singer-detail.json';

// @title 获取歌手详情
export function getSingerDetail () {
  return http.get(singerDetailUrl)
    .then(res => {
      if (res.code === ERR_OK) {
        return res.singer.data;
      }
    });
};