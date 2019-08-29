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
    url: `http://211.97.73.156/amobile.music.tc.qq.com/C400${musicData.file.media_mid}.m4a?guid=5527834659&vkey=F84F84F7101642CE3D3BBAEF00967A243C89E80C5FDF1F1CA1E845C8D223EB2EA95FE7A5C0D900343AAB2F938BDBC07287335E3C5BC815F6&uin=2641&fromtag=66`

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
