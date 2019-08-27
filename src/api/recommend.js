import axios from 'axios';
import { commonParams } from './config';

export function getRecommend() {
  const url = 'www.baidu.com';
  const data = Object.assign({}, commonParams, {
    formData: '此处为自定义数据'
  });
  axios.post(url, data).then((res) => {
    console.log(res);
  }).catch((err) => {
    console.log(err);
  });
};