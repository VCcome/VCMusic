import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'

export function jsonpTest () {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq.json',
    hostUin: 0,
    needNewCode: 0
  })

  return jsonp(url, data, options)
}

export function getRecommend () {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    hostUin: 0,
    needNewCode: 1,
    _: 1566911075338,
    uin: 0
  })

  return jsonp(url, data, options)
}
