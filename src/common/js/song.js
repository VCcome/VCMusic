import { getVKey, getLyric } from 'api/song';

export default class Song {
  constructor({ id, mid, singer, name, album, duration, image, url }) {
    this.id = id;
    this.mid = mid;
    this.singer = singer;
    this.name = name;
    this.album = album;
    this.duration = duration;
    this.image = image;
    this.url = url;
  };

  getVKey() {
    if (this.vkey) {
      return Promise.resolve(this.vkey);
    }
    return new Promise((resolve, reject) => {
      getVKey(this.mid).then(vkey => {
        this.vkey = vkey;
        console.log('vkey-Song:', vkey);
        resolve(this.vkey);
      });
    });
  };

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric);
    }
    return new Promise((resolve, reject) => {
      getLyric(this.id).then(lyric => {
        // console.log('lyric:', lyric);
        let div = document.createElement('div'); // 对歌词进行解析
        div.innerHTML = lyric;
        this.lyric = div.firstChild.nodeValue;
        resolve(this.lyric);
        // console.log('divlyric', div.firstChild.nodeValue);
      });
    });
  };
};

export function createSong(musicData) {
  return new Song({
    id: musicData.id,
    mid: musicData.mid,
    singer: filterSinger(musicData.singer),
    name: musicData.name,
    album: musicData.album.name,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.album.mid}.jpg?max_age=2592000`,
    url: `http://211.97.73.156/amobile.music.tc.qq.com/C400${musicData.mid}.m4a?guid=5527834659&fromtag=66&vkey=`
    // url: `http://211.97.73.156/amobile.music.tc.qq.com/C400002qpjAV2lYx81.m4a?guid=5527834659&fromtag=66&vkey=061CA4B8712FE7A373099964157D78782D83475EDB91A9A2E8CE51EEDD61520D597FFC3A075EFE10F8F5E2C72CEB8D25E4E46D0EEB03AF8E`
  });
}

function filterSinger(singer) {
  if (!singer) {
    return '';
  }
  let ret = [];
  singer.forEach(element => {
    ret.push(element.name);
  });
  return ret.join('/');
};
