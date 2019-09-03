<template>
  <div class="singer" ref="singer">
    <list-view :data="singerList" @select="selectSinger" ref="list"></list-view>
    <!-- 歌手详情的路由入口 -->
    <router-view></router-view>
  </div>
</template>

<script>
import { _getSingerList } from 'api/singer';
import Singer from 'common/js/singer';
import { mapMutations } from 'vuex';
import { SET_SINGER } from '@/store/mutation-types';
import { playlistMixin } from 'common/js/mixin';

import ListView from '@/base/list-view/list-view';

const HOT_TITLE = '热门';
const HOT_SINGER_LEN = 10;

export default {
  mixins: [playlistMixin],
  // name: '歌手',
  components: {
    ListView
  },
  data() {
    return {
      singerList: []
    };
  },
  created() {
    this.getSingerList();
  },
  methods: {
    selectSinger(singer) {
      console.log(singer);
      this.setSinger(singer);
      this.$router.push({
        path: `/singer/${singer.id}`
      });
    },
    getSingerList() {
      _getSingerList().then((res) => {
        this.singerList = this.normalizeSingerList(res.list);
      });
    },
    normalizeSingerList(list) {
      let map = {
        hot: {
          title: HOT_TITLE,
          items: []
        }
      };
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }));
        }
        const key = item.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }));
      });
      // return map; // 为了得到有序数组列表，我们需要处理map对象
      let hot = [];
      let ret = [];
      for (let key in map) {
        let val = map[key];
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val);
        } else if (val.title === HOT_TITLE) {
          hot.push(val);
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      return hot.concat(ret);
    },
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : '';
      this.$refs.singer.style.bottom = bottom;
      this.$refs.list.refresh();
    },
    ...mapMutations({
      setSinger: SET_SINGER
    })
  }
};
</script>

<style scoped lang="scss">
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>