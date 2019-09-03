import { ERR_OK, NET_WORK } from './config';
import * as http from 'common/js/http';

// todo 参数_为事件戳，时间戳过期后返回的内容不是最新的——_=new Date().getTime()
const hotkeyUrl = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?_=1567490967655&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1';
export function _getHotkey() {
  let url = NET_WORK ? hotkeyUrl : '/mockData/hotkey.json';
  return http.get(url)
    .then(res => {
      if (res.code === ERR_OK) {
        return res.data;
      }
    });
};

const searchUrl = '/search?_=1567490616599&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=hello&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=1&remoteplace=txt.mqq.all';
// const searchUrl = 'https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg?is_xml=0&key=h&g_tk=727719371&loginUin=1293830737&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0';
export function _search() {
  let url = NET_WORK ? searchUrl : '/mockData/search.json';
  return http.get(url)
    .then(res => {
      if (res.code === ERR_OK) {
        return res.data;
      }
    });
};