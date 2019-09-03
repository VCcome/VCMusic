<template>
  <transition name="slide">
    <music-list :songs="songs"
    :title="title" :bg-image="bgImage"
    ></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import MusicList from 'components/music-list/music-list';

import { getSingerDetail } from 'api/singer.js';
import { mapGetters } from 'vuex';
import { createSong } from 'common/js/song.js';

export default {
  components: {
    MusicList
  },
  data() {
    return {
      songs: []
    };
  },
  computed: {
    title() {
      return this.singer.name;
    },
    bgImage() {
      return this.singer.avatar;
    },
    ...mapGetters([
      'singer'
    ])
  },
  created() {
    this._getSingerDetail();
  },
  methods: {
    _getSingerDetail() {
      if (!this.singer.id) { // 刷新返回
        this.$router.push({
          path: '/singer'
        });
        return;
      }
      let singerId = this.singer.id;
      getSingerDetail(singerId).then(res => {
        // console.log(res.songlist);
        this.songs = this._normalizeSongs(res.songlist);
        // console.log(this.songs); // Song类型
      });
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach(item => {
        let musicData = item;
        if (musicData.id && musicData.album.mid) {
          ret.push(createSong(musicData));
        }
      });
      return ret;
    }
  }
};

</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>