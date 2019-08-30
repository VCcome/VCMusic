import { ERR_OK } from './config';
import * as http from 'common/js/http';

// @title 获取歌曲资源动态的vKey
// return vKey
export function getVKey(mid) {
  let vKeyUrl = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg';
  return http.get(vKeyUrl, {
    params: {
      g_tk: 5381,
      jsonpCallback: '',
      loginUin: '', // 可以传空值
      hostUin: 0,
      format: 'json',
      inCharset: 'utf8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'yqq',
      needNewCode: 0,
      cid: 205361747,
      callback: '',
      uin: '', // 可以传空值
      songmid: mid,
      filename: `C400${mid}.m4a`,
      guid: 5527834659
    }
  }).then(res => {
    if (res.code === ERR_OK) {
      return res.data.items[0].vkey;
    }
  });
};