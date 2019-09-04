import { ERR_OK } from './config';
import * as http from 'common/js/http';

/**
 * @title 获取歌曲资源动态的vKey
 *
 * @export
 * @param {*} mid
 * @returns vkey
 */
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

/**
 * @title 获取歌词
 *
 * @export
 * @param {string} [musicId='237243943']
 * @returns lyric
 */
export function getLyric(musicId = '237243943') {
  let url = `/getLyric?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&nobase64=1&musicid=${musicId}&songtype=0&_=1567566961929&jsonpCallback=getLyric`;
  return http.get(url).then(res => {
    // console.log(res);
    if (typeof res === 'string') {
      let num1 = res.indexOf('(');
      let num2 = res.indexOf(')');
      let resultData = JSON.parse(res.substring(num1 + 1, num2));
      // console.log(resultData);
      if (resultData.code === ERR_OK) {
        return resultData.lyric;
      }
    } else {
      if (res.code === ERR_OK) {
        return res.data;
      }
    }
  });
};