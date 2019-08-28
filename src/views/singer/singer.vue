<template>
  <div class="singer" ref="singer">
    <list-view :data="singerList"></list-view>
  </div>
</template>

<script>
import { _getSingerList } from 'api/singer';
import Singer from 'common/js/singer';

import ListView from '@/base/list-view/list-view';

const HOT_TITLE = '热门';
const HOT_SINGER_LEN = 10;

export default {
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
    }
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